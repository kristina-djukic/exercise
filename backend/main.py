from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from users import get_users as get_users_data

app = FastAPI()

users = [
    {
        "id": 1,
        "firstName": "John Doe",
        "lastName": "Doe",
        "age": 30,
        "gender": "male",
        "email": "john@doe.com",
        "phone": "123-456-7890",
    },
    {
        "id": 2,
        "firstName": "Jane Doe",
        "lastName": "Doe",
        "age": 30,
        "gender": "female",
        "email": "jan@doe.com",
        "phone": "123-456-7890",
    },
    # Add other users as needed
]



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
    user = next((u for u in users if u["id"] == user_id), None)
    
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in user_update.dict(exclude_unset=True).items():
        if value is not None:
            user[key] = value  


    return user