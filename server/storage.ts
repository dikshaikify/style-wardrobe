import { db } from "./db";
import {
  products,
  orders,
  orderItems,
  contactMessages,
  type InsertProduct,
  type InsertOrder,
  type InsertOrderItem,
  type InsertContactMessage,
  type Product,
  type Order,
  type ContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  createOrder(orderData: InsertOrder, itemsData: {productId: number, quantity: number, price: string}[]): Promise<Order>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  
  seedProducts(productsToSeed: InsertProduct[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createOrder(orderData: InsertOrder, itemsData: {productId: number, quantity: number, price: string}[]): Promise<Order> {
    const [order] = await db.insert(orders).values(orderData).returning();
    
    if (itemsData.length > 0) {
      const itemsToInsert = itemsData.map(item => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));
      await db.insert(orderItems).values(itemsToInsert);
    }
    
    return order;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [msg] = await db.insert(contactMessages).values(message).returning();
    return msg;
  }

  async seedProducts(productsToSeed: InsertProduct[]): Promise<void> {
    for (const product of productsToSeed) {
      await db.insert(products).values(product);
    }
  }
}

export const storage = new DatabaseStorage();
