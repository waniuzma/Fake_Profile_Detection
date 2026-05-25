from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pickle
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# model = joblib.load("random_forest_model.pkl")
model = pickle.load(open("random_forest_model.pkl","rb"))

print("Backend Started Successfully")


class UserInput(BaseModel):
    username: str
    fullname: str
    description: str
    external_url: bool
    private: bool
    posts: int
    followers: int
    follows: int


@app.post("/predict")
def predict(data: UserInput):

    username = data.username
    fullname = data.fullname
    description = data.description

    nums_length_username = (
        sum(c.isdigit() for c in username) / len(username)
        if len(username) > 0 else 0
    )

    fullname_words = len(fullname.split())

    nums_length_fullname = (
        sum(c.isdigit() for c in fullname) / len(fullname)
        if len(fullname) > 0 else 0
    )

    name_equals_username = int(
        username.lower() == fullname.replace(" ", "").lower()
    )

    description_length = len(description)

    features = np.array([
        nums_length_username,
        fullname_words,
        nums_length_fullname,
        name_equals_username,
        description_length,
        int(data.external_url),
        int(data.private),
        data.posts,
        data.followers,
        data.follows,
    ]).reshape(1, -1)

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0]

    confidence = round(max(probability) * 100, 2)

    result = "Fake" if prediction == 1 else "Real"

    return {
        "prediction": result,
        "confidence": confidence
    }