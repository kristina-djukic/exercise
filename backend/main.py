from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from users import get_users as get_users_data
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class userUpdate(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users(skip: int = 0, limit: int = 20):      #limiting to 20 as required in the frontend assignment 
    users = get_users_data()
    total = len(users)

    formated_users = users[skip:skip + limit]

    return {
        "users": formated_users,
        "total": total,              #doing this to match the output of list of DummyJSON
        "skip": skip,
        "limit": limit
    }


@app.put("/users/{user_id}")
def edit_user(user_id: int, user_update: userUpdate):
    users = get_users_data()  
    user = next((i for i in users if i["id"] == user_id), None)
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in user_update.model_dump(exclude_unset=True).items():
        if value is not None:
            user[key] = value  


    return user