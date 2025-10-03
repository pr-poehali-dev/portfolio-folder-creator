-- Create calculator_prices table
CREATE TABLE IF NOT EXISTS calculator_prices (
    id SERIAL PRIMARY KEY,
    product_type VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    base_price INTEGER NOT NULL,
    a4_modifier INTEGER DEFAULT 0,
    a5_modifier INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_type, material)
);

-- Create branding_prices table
CREATE TABLE IF NOT EXISTS branding_prices (
    id SERIAL PRIMARY KEY,
    branding_type VARCHAR(50) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create logo_size_prices table
CREATE TABLE IF NOT EXISTS logo_size_prices (
    id SERIAL PRIMARY KEY,
    size_type VARCHAR(50) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default calculator prices
INSERT INTO calculator_prices (product_type, material, base_price, a4_modifier, a5_modifier) VALUES
('menu', 'eco-leather', 800, 0, -200),
('menu', 'natural-leather', 2200, 0, -300),
('menu', 'baladek', 600, 0, -150),
('folder', 'eco-leather', 700, 0, -150),
('folder', 'natural-leather', 2000, 0, -250),
('folder', 'baladek', 500, 0, -100),
('cover', 'eco-leather', 900, 0, -200),
('cover', 'natural-leather', 2500, 0, -400),
('cover', 'baladek', 700, 0, -150);

-- Insert default branding prices
INSERT INTO branding_prices (branding_type, price) VALUES
('none', 0),
('print', 150),
('foil', 400),
('embossing', 350),
('laser', 500);

-- Insert default logo size prices
INSERT INTO logo_size_prices (size_type, price) VALUES
('small', 0),
('medium', 100),
('large', 200);