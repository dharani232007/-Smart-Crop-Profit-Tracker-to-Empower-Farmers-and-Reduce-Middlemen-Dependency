from flask_cors import CORS
from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId
from flask_bcrypt import Bcrypt
import jwt
import datetime
from functools import wraps
import os

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = "your_secret_key_here"

bcrypt = Bcrypt(app)

# ------------------ DATABASE CONNECTION ------------------

client = MongoClient("mongodb://localhost:27017/")
db = client["agri_profit_db"]

users_collection = db["users"]
crops_collection = db["crops"]
expenses_collection = db["expenses"]

# ------------------ IMAGE UPLOAD FOLDER ------------------

UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ------------------ JWT DECORATOR ------------------

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        token = request.headers.get("Authorization")

        if not token:
            return jsonify({"error": "Token is missing"}), 401

        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

            current_user = users_collection.find_one(
                {"_id": ObjectId(data["id"])}
            )

        except:
            return jsonify({"error": "Token is invalid"}), 401

        return f(current_user, *args, **kwargs)

    return decorated

# ------------------ HOME ------------------

@app.route("/")
def home():
    return "Agri Profit Backend Running 🚀"

# ------------------ REGISTER ------------------

@app.route("/register", methods=["POST"])
def register():
    data = request.json

    existing_user = users_collection.find_one({"email": data["email"]})
    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = {
        "name": data["name"],
        "email": data["email"],
        "password": hashed_password,
        "role": data["role"]
    }

    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"})

# ------------------ LOGIN ------------------

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    user = users_collection.find_one({"email": data["email"]})

    if not user:
        return jsonify({"message": "User not found"}), 404

    if not bcrypt.check_password_hash(user["password"], data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode({
        "id": str(user["_id"]),
        "role": user["role"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }, app.config["SECRET_KEY"])

    return jsonify({
        "token": token,
        "role": user["role"]
    })

# ------------------ ADD CROP WITH IMAGE ------------------

@app.route("/add-crop", methods=["POST"])
@token_required
def add_crop(current_user):

    name = request.form.get("name")
    quantity = request.form.get("quantity")
    price = request.form.get("price")
    date = request.form.get("date")

    image = request.files.get("image")

    image_path = None

    if image:
        filename = image.filename
        image_path = os.path.join(UPLOAD_FOLDER, filename)
        image.save(image_path)

    crop = {
        "name": name,
        "quantity": quantity,
        "price": price,
        "date": date,
        "image": image_path,
        "farmer_id": str(current_user["_id"]),
        "farmer_name": current_user["name"]
    }

    crops_collection.insert_one(crop)

    return jsonify({"message": "Crop added successfully"})

# ------------------ GET FARMER CROPS ------------------

@app.route("/my-crops", methods=["GET"])
@token_required
def get_my_crops(current_user):

    farmer_id = str(current_user["_id"])
    crops = list(crops_collection.find({"farmer_id": farmer_id}))

    for crop in crops:
        crop["_id"] = str(crop["_id"])

    return jsonify(crops)

# ------------------ GET ALL PRODUCTS FOR CUSTOMERS ------------------

@app.route("/products", methods=["GET"])
def get_products():

    crops = list(crops_collection.find())

    for crop in crops:
        crop["_id"] = str(crop["_id"])

    return jsonify(crops)

# ------------------ DELETE CROP ------------------

@app.route("/delete-crop/<crop_id>", methods=["DELETE"])
@token_required
def delete_crop(current_user, crop_id):

    crops_collection.delete_one({
        "_id": ObjectId(crop_id),
        "farmer_id": str(current_user["_id"])
    })

    return jsonify({"message": "Crop deleted successfully"})

# ------------------ RUN SERVER ------------------

if __name__ == "__main__":
    app.run(port=8000, debug=True)
