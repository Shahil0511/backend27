import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product } from "../model/product.model.js";
import { SubCategory } from "../model/subCategory.model.js";

const MONGO_URI = "YOUR_URI";

const TOTAL_PRODUCTS = 100000; // Adjust as needed
const BATCH_SIZE = 2000;

async function seedProducts() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    const subCategories = await SubCategory.find().lean();

    if (!subCategories.length) {
      console.log("No subcategories found. Seed categories first.");
      process.exit(0);
    }

    let inserted = 0;

    while (inserted < TOTAL_PRODUCTS) {
      const products = [];

      for (let i = 0; i < BATCH_SIZE; i++) {
        const randomSub =
          subCategories[Math.floor(Math.random() * subCategories.length)];

        const name = faker.commerce.productName();

        products.push({
          name,
          slug: faker.helpers.slugify(name).toLowerCase(),
          category: randomSub.category, // Direct reference
          subCategory: randomSub._id,
          brand: faker.company.name(),
          sku: faker.string.alphanumeric(10).toUpperCase(),
          price: Number(faker.commerce.price({ min: 500, max: 5000 })),
          stock: faker.number.int({ min: 10, max: 200 }),
          isActive: true,
          isDeleted: false,
        });
      }

      await Product.insertMany(products, { ordered: false });

      inserted += BATCH_SIZE;
      console.log(`Inserted Products: ${inserted}`);
    }

    console.log("Product seeding completed 🚀");
    process.exit(0);

  } catch (err) {
    console.error("Product seeding failed ❌", err);
    process.exit(1);
  }
}

seedProducts();