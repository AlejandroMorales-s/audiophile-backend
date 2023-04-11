CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    order_date DATE NOT NULL,
    status VARCHAR(255) NOT NULL,
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
);

-- CREATE TABLE products (
--     id SERIAL PRIMARY KEY,
--     slug VARCHAR(255) NOT NULL,
--     name VARCHAR(255) NOT NULL,
--     new BOOLEAN NOT NULL,
--     description VARCHAR(255) NOT NULL,
--     price INTEGER NOT NULL,
-- );

-- address VARCHAR(255) NOT NULL,
-- city VARCHAR(255) NOT NULL,
-- state VARCHAR(255) NOT NULL,
-- zip VARCHAR(255) NOT NULL,



CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  new BOOLEAN NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT NOT NULL,
);

CREATE TABLE product_features (
  product_id INTEGER NOT NULL REFERENCES products(id),
  feature TEXT NOT NULL,
  PRIMARY KEY (product_id, feature)
);

CREATE TABLE product_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  image_mobile TEXT NOT NULL,
  image_tablet TEXT NOT NULL,
  image_desktop TEXT NOT NULL
);

CREATE TABLE product_includes (
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  item VARCHAR NOT NULL,
  PRIMARY KEY (product_id, item)
);

CREATE TABLE product_category_images (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  category_image_mobile TEXT NOT NULL,
  category_image_tablet TEXT NOT NULL,
  category_image_desktop TEXT NOT NULL
);

CREATE TABLE product_gallery (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  image_mobile TEXT NOT NULL,
  image_tablet TEXT NOT NULL,
  image_desktop TEXT NOT NULL,
  position INTEGER NOT NULL
);

CREATE TABLE related_products (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  related_product_id INTEGER NOT NULL REFERENCES products(id)
);