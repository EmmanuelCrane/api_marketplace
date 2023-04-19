import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import { json } from 'body-parser';

import typeDefs from "./graphql/types";
import resolvers from './graphql/resolvers';

import { pool } from './config/database'

interface MyContext {}

const create_tables = async () => {

    const table_products = await pool.query(`CREATE TABLE IF NOT EXISTS products(
        id INTEGER NOT NULL PRIMARY KEY,
      category VARCHAR(50) NOT NULL,
      images TEXT NOT NULL,
      brand VARCHAR(50) NOT NULL,
      description VARCHAR(250) NOT NULL,
      offer INTEGER NOT NULL,
      price DECIMAL NOT NULL,
      status VARCHAR(50) NOT NULL,
      about TEXT NOT NULL,
      specification TEXT NOT NULL,
      info_additional TEXT NOT NULL,
      other_models TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    const table_users = await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER NOT NULL PRIMARY KEY,
        name VARCHAR(50),
        nameuser VARCHAR(50) NOT NULL,
        email VARCHAR(50),
        phone VARCHAR(50),
        password VARCHAR(50) NOT NULL,
        gender VARCHAR(10),
        image TEXT,
        addresses TEXT
    );`);

    const table_shopping_cart = await pool.query(`CREATE TABLE IF NOT EXISTS shopping_cart(
        id INTEGER NOT NULL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
      
        FOREIGN KEY fk_user_id(user_id)
        REFERENCES users(id),
      
        FOREIGN KEY fk_buy_id(product_id)
        REFERENCES products(id)
    );`);

    const table_favorites = await pool.query(`CREATE TABLE IF NOT EXISTS favorites(
        id INTEGER NOT NULL PRIMARY KEY,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
      
        FOREIGN KEY fk_user_id(user_id)
        REFERENCES users(id),
      
        FOREIGN KEY fk_buy_id(product_id)
        REFERENCES products(id)
    );`);
    
    const table_coupons = await pool.query(`CREATE TABLE IF NOT EXISTS coupons(
    id INTEGER NOT NULL PRIMARY KEY,
    price DECIMAL NOT NULL,
    expirationdate VARCHAR(15) NOT NULL
    );`);

    return {
        table_products,
        table_users,
        table_shopping_cart,
        table_favorites,
        table_coupons
    }

};

const start_server = async () => {
    const app = express();
    const create_tables_sql = await create_tables();
    // console.log(create_tables_sql);
   

    app.get('/', async (req: any, res:any) => {
      // const [ results ] = await pool.query("SELECT * FROM favorites INNER JOIN products ON favorites.product_id = products.id;");
      // const [ results ] = await pool.query("SELECT * FROM favorites INNER JOIN products ON favorites.product_id = products.id;");
        // const [ results ] = await pool.query("SELECT * FROM products WHERE id = 1");
        // const [ result ] = await pool.query("SELECT * FROM users")
        const [results] = await pool.query("SELECT * FROM users WHERE email = ?;", ["em.tech.mx@gmail.com"]);
// const [result] = await pool.query("SELECT * FROM users WHERE phone = ?;", [phone]);
        res.json(results);
    });
    app.get('/post', async (req, res) => {

        const ob = {
            id: 1,
            category: 'tecnologia',
            brand: 'rolex',
            description: 'Timex Expedition Scout 40 Reloj para hombreTimex Expedition Scout 40 Reloj para hombre',
            offer: 5,
            price: 987.98,
            status: 'disponible',
            images: [
                "https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview4_a2vsca.png",
                "https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png",
                "https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png"
            ],
            about: [
                'Smartphone HONOR Pantalla Súper Curva OLED, con tasa de actualización de hasta 120 Hz',
                'Celular 8GB+256GB, Procesador Qualcomm Snapdragon 778G Plus, Ocho núcleos, 6.67 inches, 161.4mm X 73.3mm X 7.91mm, 178g',
                'Cámara principal de 54MP IMX800 Super Sensing ( apertura f/1.9 )+ Cámara de 50MP Ultra gran angular & Macro (apertura f/2.2 )+ cámara de profundidad de 2MP (apertura f/2.4) *Los pixeles de foto y video pueden variar dependiendo del modo de captura. Favor de referirse a la situación de uso real',
                'HONOR 66W SuperCharge Charger, Soporte de carga rápida de hasta 11V/6A, compatible con carga rápida de hasta 10V/4A.',
                'Magic UI 6.1 (basado en Android 12, Cuenta con google serveicio.'
            ],
            specification: {
                'Marca': 'Honor',
                'Fabricante': 'HONOR',
                'Modelo': 'FNE-NX9',
                'Nombre del modelo': 	'HONOR 70',
                'Año del modelo': 2022,
                'Número de parte': 'FNE-NX9',
                'Tamaño de RAM': '8 GB',
                'Capacidad de almacenamiento de la memoria': '256 GB',
                'Tamaño de memoria flash instalada': '256 GB',
                'Capacidad de almacenamiento digital': '256 GB',
                'Sistema operativo': 'Android 12.0',
                'Marca del procesador': 'Qualcomm',
                'Características especiales': 'Celular 120 Hz, 1.07 millones de colores, OLED Pantalla 6.67 inches, SONY IMX800 Cámara, Smartphone 8 RAM 256GB ROM, 5G Celular Honor 70 Smartphone',
                'Accesorios de montaje': 'Auriculares, Funda del teléfono, Cable USB, Cargador rapida 66w',
                'Número de productos': 1,
                'Tipo de pantalla': 'OLED',
                'Resolución de captura de video': '4k',
                'Baterías incluidas': 'No',
                'Baterías necesarias': 'No',
                'Composición de celdas de batería': 'Litio Ion',
                'Clasificación de potencia de la batería': '4800 Milliamp Hours',
                'Tecnología celular': '5G',
                'Tipo de conector': 'USB',
                'Entrada de interfaz humana': 'Touch Screen',
                'Factor de forma': 'Barra' 
            },
            info_additional: {
            'Dimensiones del paquete': '18.5 x 10 x 6.5 cm; 440 g',
            'Pilas': '1 Litio Ion (Tipo de pila necesaria)',
            'Número de modelo del producto': 'FNE-NX9',
            'ASIN': 'B0BF31LH71',
            'Producto en Amazon.com.mx desde': '12 septiembre 2022',
            'Opinión media de los clientes': '4.5 de 5 estrellas 26 calificaciones',
            'Clasificación en los más vendidos de Amazon': 'nº3,922 en Electrónicos (Ver el Top 100 en Electrónicos) nº143 en Celulares y Smartphones Desbloqueados' 
            },
            other_models: [
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'Disponible',
                },
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'no disponible',
                },
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'Disponible',
                },
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'Disponible',
                },
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'Disponible',
                },
                {
                  images: [
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview2_ov4vvk.png',
                    'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview3_up2yng.png'
                  ],
                  price: 1112.70,
                  offer: 0,
                  status: 'Disponible',
                }
            ],
        }

        const [results] = await pool.query(`
        INSERT INTO products (id, category, images, brand, description, offer, price, status, about, specification, info_Additional, other_models)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            ob.id,
            ob.category,
            JSON.stringify(ob.images),
            ob.brand,
            ob.description,
            ob.offer,
            ob.price,
            ob.status,
            JSON.stringify(ob.about),
            JSON.stringify(ob.specification),
            JSON.stringify(ob.info_additional),
            JSON.stringify(ob.other_models),
        ]);

        const [result] = await pool.query(`
        INSERT INTO users (id, name, nameuser, email, phone, password, gender, image, addresses)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
            1,
            'Emmanuel Salazar Carvajal',
            'ems_tech',
            'em.tech.mx@gmail.com',
            '7775606260',
            '260598esc',
            'm',
            'https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview4_a2vsca.png',
            JSON.stringify([{
                name:" Emmanuel Salazar Carvajal",
                street_number: 'Teotihuacan, 78',
                zip_code: '62100',
                telephone_number: '777 5606260',
                additional_address: 'Tienda Tonatihu'
            }])
        ]);
        
        res.json([results, result]);
    });

    app.get('/ac', async (req, res) => {

        const ob = {
            about: "acerca de",
            brand: "marca",
            category: "sin caegoria",
            description: "description",
            id: 3,
            images: "imagenes",
            infoAdditional: "adicional",
            offer: 5,
            otherColors: "modelos",
            price: 765,
            specification: "especificacion",
            status: "agregado",
        }

        const [results] = await pool.query(`
        UPDATE products
        SET category = ?, status = ? WHERE id = ?`,[
            ob.category,
            ob.status,
            ob.id
        ]);
        res.json(results);
    });
    
    app.get('/del', async (req, res) => {

        const id = 3

        const [results] = await pool.query(`
        DELETE FROM products
        WHERE id = ?`,[
            id
        ]);
        res.json(results);
    });

    const server = new ApolloServer<MyContext>({
        typeDefs,
        resolvers
    });

    await server.start();
    app.use('/graphql', cors<cors.CorsRequest>(), json(), expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }),}))

    return app;

}

export default start_server;