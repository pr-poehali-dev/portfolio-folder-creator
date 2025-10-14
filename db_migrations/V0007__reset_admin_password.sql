-- Reset admin password to Oscar507@12
UPDATE admins 
SET password_hash = '8bf729f5f3e2ba07cb421f6046e008ef4958665133b14fded2c7271c4664525f'
WHERE username = 'admin';