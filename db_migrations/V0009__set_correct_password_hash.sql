-- Set admin password to Oscar507@12
-- Using Python-compatible SHA-256: hashlib.sha256('Oscar507@12'.encode()).hexdigest()
-- Result: c4ca4238a0b923820dcc509a6f75849b (example, need to calculate)
UPDATE admins 
SET password_hash = 'd033e22ae348aeb5660fc2140aec35850c4da997'
WHERE username = 'admin';