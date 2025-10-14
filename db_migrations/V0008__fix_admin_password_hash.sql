-- Update admin password to Oscar507@12 with correct SHA-256 hash
-- SHA-256('Oscar507@12') = 8bf729f5f3e2ba07cb421f6046e008ef4958665133b14fded2c7271c4664525f
UPDATE admins 
SET password_hash = (SELECT encode(sha256('Oscar507@12'::bytea), 'hex'))
WHERE username = 'admin';