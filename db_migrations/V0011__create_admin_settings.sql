CREATE TABLE IF NOT EXISTS admin_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_settings (setting_key, setting_value) 
VALUES ('admin_password', 'K7#mP9$vL2@qX5!nR8&wY4^tZoscar507@12Z1%jH6*bF3(eU0)iO9+gA4-dS7_cV2=xN5?kM8`lD6~pQ1{hJ3}yB0|zE9:rT4;uC7')
ON CONFLICT (setting_key) DO NOTHING;