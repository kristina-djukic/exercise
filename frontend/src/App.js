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


      <div className="items-center w-3/4 h-full bg-gray-100 p-8">
        <h1 className="text-3xl font-bold mb-4">Syyclops Test Assignment</h1>
      </div>
    </div>
  );
}

export default App;
