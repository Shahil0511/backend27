import mongoose from "mongoose";
import { Category } from "../model/category.model.js";
import { SubCategory } from "../model/subCategory.model.js";

const MONGO_URI = "mongodb://shahilkumar0511_db_user:62Ssn4oCv2Govere@ac-kren2ue-shard-00-00.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-01.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-02.x5d6dtl.mongodb.net:27017/test?ssl=true&replicaSet=atlas-xgttq3-shard-0&authSource=admin&retryWrites=true&w=majority";

const subCategoryMap: Record<string, string[]> = {
  Kurtas: [
    "A-Line",
    "Straight",
    "Anarkali",
    "Printed",
    "Embroidered",
    "Shirt Style"
  ],
  "Kurta Sets": [
    "Cotton Sets",
    "Festive Sets",
    "Printed Sets",
    "Embroidered Sets"
  ],
  Suits: [
    "Pakistani Suits",
    "Sharara Suits",
    "Wedding Suits",
    "Daily Wear Suits"
  ],
  Sarees: [
    "Silk Sarees",
    "Cotton Sarees",
    "Party Wear Sarees"
  ],
  Bottomwear: [
    "Palazzos",
    "Salwars",
    "Sharara Pants",
    "Trousers"
  ],
  Dresses: [
    "Casual Dresses",
    "Ethnic Dresses",
    "Indo-Western Dresses"
  ],
  "Co-ord Sets": [
    "Printed Co-ord",
    "Cotton Co-ord",
    "Festive Co-ord"
  ],
  Lehengas: [
    "Wedding Lehengas",
    "Festive Lehengas",
    "Party Lehengas"
  ],
  Loungewear: [
    "Casual Loungewear",
    "Cotton Loungewear"
  ],
  "Plus Size": [
    "Plus Size Kurtas",
    "Plus Size Suits",
    "Plus Size Dresses"
  ],
  "Kids Wear": [
    "Girls Kurtas",
    "Girls Lehengas"
  ],
  "Libas Art": [
    "Premium Kurtas",
    "Designer Suits"
  ],
  "Fusion Wear": [
    "Indo-Western Kurtas",
    "Fusion Dresses"
  ]
};

async function seedSubCategories() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await SubCategory.deleteMany({});
    console.log("Old subcategories cleared");

    const categories = await Category.find().lean();

    const subCategories: any[] = [];

    for (const category of categories) {
      const subList = subCategoryMap[category.name];

      if (!subList) continue;

      for (const subName of subList) {
        subCategories.push({
          name: subName,
          slug: subName.toLowerCase().replace(/\s+/g, "-"),
          category: category._id,
          isActive: true,
          isDeleted: false,
        });
      }
    }

    await SubCategory.insertMany(subCategories);

    console.log("Libas SubCategories Seeded ✅");
    process.exit(0);

  } catch (err) {
    console.error("SubCategory seeding failed ❌", err);
    process.exit(1);
  }
}

seedSubCategories();