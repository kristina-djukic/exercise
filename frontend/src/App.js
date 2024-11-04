import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";


function App() {
  const [selectedUser, selectedUserSet] = React.useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users?limit=20")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (

    <div className="flex h-screen w-full">

      <div className="w-1/4 h-full bg-syyclopsBlue text-white p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 border-b text-syyclopsOrange font-wixDisplay">Users</h2>
        <ul className="font-wixText">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => selectedUserSet(user)}
              className="mb-2 cursor-pointer p-2 hover:text-syyclopsOrange"
            >
              {[user.firstName, user.lastName].join(" ")}
            </li>
          ))}
        </ul>
      </div>


      <div className="w-3/4 h-full bg-white p-8">
        <h1 className="text-3xl font-wizDisplay font-bold mb-4 text-syyclopsBlue">User Details</h1>
        {selectedUser ? (
          <>
            <table class="min-w-full bg-white shadow-md rounded-lg">
              <tbody className="font-wixText">
                <tr>
                  <td className="border px-4 py-2 font-semibold">ID</td>
                  <td className="border px-4 py-2">{selectedUser.id}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">First Name</td>
                  <td className="border px-4 py-2">{selectedUser.firstName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Last Name</td>
                  <td className="border px-4 py-2">{selectedUser.lastName}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Age</td>
                  <td className="border px-4 py-2">{selectedUser.age}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Gender</td>
                  <td className="border px-4 py-2">{selectedUser.gender}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Email</td>
                  <td className="border px-4 py-2">{selectedUser.email}</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2 font-semibold">Phone</td>
                  <td className="border px-4 py-2">{selectedUser.phone}</td>
                </tr>
              </tbody>
            </table>
            <button className="font-wixText mt-4 float-right bg-syyclopsButton text-white px-16 py-2.5 text-lg rounded-xl transition duration-300 ease-in-out transform hover:bg-syyclopsHoverButton hover:scale-105">
              Edit
            </button>

          </>


        ) : (<p className="font-wixText text-syyclopsBlue">Select a user from the sidebar to view details</p>)}

      </div>
    </div>
  );
}

export default App;
