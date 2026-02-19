from fastapi import APIRouter
from database import crop_collection
from models import Crop
from bson import ObjectId

router = APIRouter()

# 1️⃣ ADD CROP
@router.post("/add_crop")
def add_crop(crop: Crop):
    crop_dict = crop.dict()
    result = crop_collection.insert_one(crop_dict)
    return {"message": "Crop added successfully", "id": str(result.inserted_id)}


# 2️⃣ GET ALL CROPS
@router.get("/get_crops")
def get_crops():
    crops = []
    for crop in crop_collection.find():
        crop["_id"] = str(crop["_id"])
        crops.append(crop)
    return crops


# 3️⃣ UPDATE CROP
@router.put("/update_crop/{crop_id}")
def update_crop(crop_id: str, crop: Crop):
    crop_collection.update_one(
        {"_id": ObjectId(crop_id)},
        {"$set": crop.dict()}
    )
    return {"message": "Crop updated successfully"}


# 4️⃣ DELETE CROP
@router.delete("/delete_crop/{crop_id}")
def delete_crop(crop_id: str):
    crop_collection.delete_one({"_id": ObjectId(crop_id)})
    return {"message": "Crop deleted successfully"}
