import mongoose from "mongoose"
import { faker } from "@faker-js/faker"
import { Customer } from "../model/customer.model.js"

const MONGO_URI = "mongodb://shahilkumar0511_db_user:62Ssn4oCv2Govere@ac-kren2ue-shard-00-00.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-01.x5d6dtl.mongodb.net:27017,ac-kren2ue-shard-00-02.x5d6dtl.mongodb.net:27017/test?ssl=true&replicaSet=atlas-xgttq3-shard-0&authSource=admin&retryWrites=true&w=majority"

const TOTAL_RECORDS = 5000000   // Change this
const BATCH_SIZE = 5000
      // Keep between 1000–5000

async function seedCustomers() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log("Connected to DB")

    let inserted = 0

    while (inserted < TOTAL_RECORDS) {
      const customers = []

      for (let i = 0; i < BATCH_SIZE; i++) {
        customers.push({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email({
  provider: "gmail.com"
}).toLowerCase(),
          phone: `+91${faker.helpers.arrayElement(['6','7','8','9'])}${faker.string.numeric(9)}`,
          addresses: [
            {
              street: faker.location.streetAddress(),
              city: faker.location.city(),
              state: faker.location.state(),
              country: "India",
              zipCode: faker.string.numeric(6),
              isDefault: true,
            },
          ],
          isActive: Math.random() < 0.8,
          totalOrders: 0,
          lifetimeValue: 0,
        })
      }

      await Customer.insertMany(customers)

      inserted += BATCH_SIZE
      console.log(`Inserted: ${inserted}`)
    }
   
    console.log("Seeding completed 🚀")
    process.exit(0)

  } catch (err) {
    console.error("Seeding failed ❌", err)
    process.exit(1)
  }
}

seedCustomers()