import axios from "axios";
import React from 'react';
import {useEffect, useState} from "react";


function App() {
  const [selectedUser, selectedUserSet] = React.useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=20&select=firstName,age,email,id,lastName,gender,phone")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    
    <div className="flex h-screen w-full">

      <div className="w-1/4 h-full bg-gray-800 text-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => selectedUserSet(user)}
              className="mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
            >
              {[user.firstName, user.lastName].join(" ")}
            </li>
          ))}
        </ul>
      </div>


      <div className="w-3/4 h-full bg-gray-100 p-8">
        {selectedUser && (
          <table class= "min-w-full bg-white shadow-md rounded-lg">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{selectedUser.id}</td>
              </tr>
              <tr>
                <td>First Name</td>
                <td>{selectedUser.firstName}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{selectedUser.lastName}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{selectedUser.age}</td>
              </tr>
              <tr>
                <td>Gender</td>
                <td>{selectedUser.gender}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{selectedUser.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{selectedUser.phone}</td>
              </tr>
            </tbody>
          </table>
        ) }
      </div>
    </div>
  );
}

export default App;
