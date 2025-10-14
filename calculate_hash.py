import hashlib

password = "Oscar507@12"
hash_result = hashlib.sha256(password.encode()).hexdigest()
print(f"Password: {password}")
print(f"SHA-256 Hash: {hash_result}")
