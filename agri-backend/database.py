from pymongo import MongoClient

# Replace with your MongoDB connection string
MONGO_URL = "mongodb://localhost:27017"

client = MongoClient(MONGO_URL)

db = client["smart_crop_db"]

crop_collection = db["crops"]
