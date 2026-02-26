import mongoose from "mongoose";
import { Category } from "../model/category.model.js";

const MONGO_URI = "mongodb://shahilkumar0511_db_user:62Ssn4oCv2Govere@ac-kren2ue-shard-00-00.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-01.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-02.x5d6dtl.mongodb.net:27017/test?ssl=true&replicaSet=atlas-xgttq3-shard-0&authSource=admin&retryWrites=true&w=majority";

const categoryList = [
  "Kurtas",
  "Kurta Sets",
  "Suits",
  "Sarees",
  "Lehengas",
  "Dresses",
  "Co-ord Sets",
  "Bottomwear",
  "Loungewear",
  "Plus Size",
  "Kids Wear",
  "Libas Art",
  "Fusion Wear"
];

async function seedCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await Category.deleteMany({});
    console.log("Old categories cleared");

    const categories = categoryList.map((name) => ({
      name,
      code: name.toUpperCase().replace(/\s+/g, "_"),
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description: `${name} collection`,
      isActive: true,
      isDeleted: false,
    }));

    await Category.insertMany(categories);

    console.log("Libas Categories Seeded ✅");
    process.exit(0);

  } catch (err) {
    console.error("Category seeding failed ❌", err);
    process.exit(1);
  }
}

seedCategories();