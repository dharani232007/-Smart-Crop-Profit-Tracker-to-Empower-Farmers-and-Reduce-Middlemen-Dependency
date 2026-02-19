from pydantic import BaseModel

class Crop(BaseModel):
    crop_name: str
    investment: float
    income: float
