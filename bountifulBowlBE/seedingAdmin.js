
import { genPassword, createUser } from './helper/helperUser.js';
import { client } from "./index.js"; // Assuming you have a DB client
import jwt from 'jsonwebtoken';

async function seedAdmin() {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

        // Check if admin already exists in DB
        const existingAdmin = await client
            .db("bountiful")
            .collection("users")
            .findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists!");
        } else {
            const hashedPassword = await genPassword(adminPassword);

            // Create the admin user
            const adminUser = {
                name: "Admin",
                email: adminEmail,
                password: hashedPassword,
                role: "admin"
            };

            // Create admin user in the database
            const result = await createUser(adminUser.name, adminUser.email, adminUser.password, adminUser.role);
            console.log("Admin created successfully!");

            // After creating the admin, generate the admin token
            const token = jwt.sign(
                { id: result.insertedId, role: adminUser.role }, 
                process.env.SECRET_KEY, 
                
            );

            console.log("Admin token generated:", token);

            // You can now use this token for further requests, or log it here
        }
    } catch (err) {
        console.error("Error creating admin:", err);
    }
}

export {seedAdmin}; // Call the seeding function
