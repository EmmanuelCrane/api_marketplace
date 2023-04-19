CREATE TABLE IF NOT EXISTS products(
	id INTEGER NOT NULL PRIMARY KEY,
  category VARCHAR(50) NOT NULL,
  images TEXT NOT NULL,
  brand VARCHAR(50) NOT NULL,
  description VARCHAR NOT NULL,
  offer INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  status VARCHAR(50) NOT NULL,
  about TEXT NOT NULL,
  specification TEXT NOT NULL,
  info_Additional TEXT NOT NULL,
  other_models TEXT NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM products;

INSERT INTO products(id, category, images, brand, description, offer, price, status, about, specification, infoAdditional, otherColors ) VALUES (1, "tecnologia","['https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview4_a2vsca.png',]", "rolex", "reloj de lujo para hombre", 10, 757.20, "disponible","[
      'Smartphone HONOR Pantalla Súper Curva OLED, con tasa de actualización de hasta 120 Hz',
    ]",     "{
      'Marca': 'Honor',
      'Fabricante': 'HONOR',
    }", "{
      'Dimensiones del paquete': '18.5 x 10 x 6.5 cm; 440 g',
    }", "[{images: ['https://res.cloudinary.com/drebk8qrx/image/upload/v1677047064/aztlan/preview1_r2akr9.png',],price: 1112.70, offer: 0, status: 'Disponible', }]" 
);

CREATE TABLE IF NOT EXISTS users(
  id INTEGER NOT NULL PRIMARY KEY,
  name VARCHAR(50),
  nameuser VARCHAR(50) NOT NULL,
  email VARCHAR(50),
  phone VARCHAR(50),
  password VARCHAR(50) NOT NULL,
  gender VARCHAR(10),
  image TEXT,
  addresses TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS coupons(
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  price DECIMAL NOT NULL,
  expiration_date VARCHAR(15) NOT NULL,

  FOREIGN KEY fk_user_id(user_id)
  REFERENCES users(id);

);

CREATE TABLE IF NOT EXISTS cart_shop(
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,

  FOREIGN KEY fk_user_id(user_id)
  REFERENCES users(id),

  FOREIGN KEY fk_buy_id(product_id)
  REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS favorites(
  id INTEGER NOT NULL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,

  FOREIGN KEY fk_user_id(user_id)
  REFERENCES users(id),

  FOREIGN KEY fk_buy_id(product_id)
  REFERENCES products(id)
);

SELECT * FROM favorites INNER JOIN users ON favorites.user_id = users.id;