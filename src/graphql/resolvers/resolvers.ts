import { pool } from '../../config/database';
interface Product {
    input: {
        id: Number,
        category: String,
        images: String,
        brand: String,
        description: String,
        offer: Number,
        price: Number,
        status: String,
        about: String,
        specification: String,
        info_additional: String,
        other_models: String,
    }
}
interface Props {
    id: number,
    email: string,
    phone: string
}

const resolvers = {
    Query: {
        // productos
        products: async () => {
            const [result] = await pool.query("SELECT * FROM products;");
            // const [result] = await pool.query("SELECT * FROM favorites;");
            return result;
        },
        product_id: async (root: any, { id }: Props) => {
            const [results] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
            return results
        },

        // usuarios
        users: async () => {
            const [result] = await pool.query("SELECT * FROM users;");
            return result;
        },
        user_id: async (root: any, { id }: Props) => {
            const [result] = await pool.query("SELECT * FROM users WHERE id = ?;", [id]);
            return result;
        },
        user_email: async (root: any, { email }: Props) => {
            const [result] = await pool.query("SELECT * FROM users WHERE email = ?;", [email]);
            return result
        },
        user_phone: async (root: any, { phone }: Props) => {
            const [result] = await pool.query("SELECT * FROM users WHERE phone = ?;", [phone]);
            return result;
        },

        // extras
        favorites: async () => {
            const [result] = await pool.query("SELECT * FROM favorites INNER JOIN products ON favorites.product_id = products.id;");
            return result;
        },
        shopping_cart: async () => {
            const [result] = await pool.query("SELECT * FROM shopping_cart INNER JOIN products ON shopping_cart.product_id = products.id;");
            return result;
        },
        
    },

    Mutation: {
        createProduct: async (root: any, { input }: Product) => {
            const set = Object.values(input);
            const result = await pool.execute("INSERT INTO products SET ?", [...set]);
            console.log(result)
            return input;
        }
    }
}

export default resolvers;