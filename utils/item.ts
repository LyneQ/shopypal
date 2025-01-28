import pool from "@/db";
import {Product} from "@/types/product";

export class ShoppingItem {
    private id: number;
    private promotionPercentage: number | undefined;
    private category: string | undefined;
    private quantity: number | undefined;
    private image: string | undefined;
    private description: string | undefined;
    private name: string | undefined;
    private price: number | undefined;

    constructor(
        id: number,
    ) {
        this.id = id;
    }

    public async setProduct() {
        const poolIsAvailable = await pool.query("SELECT 1 + 1 AS solution");
        if (!poolIsAvailable) throw new Error("Database is not available");

        const result = await pool.query("SELECT * FROM products WHERE id = ?", [this.id]) as unknown as Product[];

        this.name = result[0].name;
        this.description = result[0].description;
        this.price = result[0].price;
        this.image = result[0].image;
        this.category = result[0].category;
        this.promotionPercentage = result[0].promotionPercentage;
        this.quantity = result[0].quantity;
    }

    async getProduct() {
        const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [this.id]);
        return rows;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            image: this.image,
            category: this.category,
            promotionPercentage: this.promotionPercentage,
            quantity: this.quantity
        }
    }


}