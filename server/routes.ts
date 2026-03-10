import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database
  await seedDatabase();

  app.get(api.products.list.path, async (req, res) => {
    const allProducts = await storage.getProducts();
    res.json(allProducts);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      const order = await storage.createOrder(input.order, input.items);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await storage.seedProducts([
      {
        name: "Classic White T-Shirt",
        price: "29.99",
        description: "A comfortable and stylish classic white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
        category: "Men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        featured: true
      },
      {
        name: "Denim Jacket",
        price: "89.99",
        description: "Premium quality denim jacket with a vintage wash. Features button closure and multiple pockets.",
        category: "Women",
        image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?auto=format&fit=crop&q=80&w=800",
        featured: true
      },
      {
        name: "Kids Colorful Hoodie",
        price: "45.00",
        description: "Bright and vibrant hoodie for kids. Soft fleece lining keeps them warm and comfortable.",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
        featured: false
      },
      {
        name: "Slim Fit Jeans",
        price: "59.99",
        description: "Modern slim fit jeans with a slight stretch for comfort. Classic 5-pocket styling.",
        category: "Men",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
        featured: false
      },
      {
        name: "Floral Summer Dress",
        price: "79.99",
        description: "Lightweight summer dress with a beautiful floral print. Features a wrap design and flowy skirt.",
        category: "Women",
        image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
        featured: true
      },
      {
        name: "Casual Sneakers",
        price: "110.00",
        description: "Versatile casual sneakers suitable for both men and women. Features a durable rubber sole.",
        category: "Men",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
        featured: false
      }
    ]);
  }
}
