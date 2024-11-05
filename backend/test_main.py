from fastapi.testclient import TestClient
from main import app  

client = TestClient(app)

def test_get_users():
    response = client.get("/users")
    assert response.status_code == 200  
    data = response.json()  

    assert "users" in data
    assert isinstance(data["users"], list)  
    assert len(data["users"]) > 0  

def test_edit_user():
    user_id = 1  
    update_data = {"firstName": "New Name"}  

   
    response = client.put(f"/users/{user_id}", json=update_data)
    assert response.status_code == 200  

    data = response.json()  

    
    assert data["id"] == user_id
    assert data["firstName"] == "New Name"
