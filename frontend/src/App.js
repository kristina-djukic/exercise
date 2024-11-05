import axios from "axios";
import React from 'react';
import { useEffect, useState } from "react";


function App() {
  const [selectedUser, selectedUserSet] = React.useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      /*.get("https://dummyjson.com/users?limit=20") for connecting to dummyjson*/
      .get('http://127.0.0.1:8000/users') //Bonus - connected to the python endpoints
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const editButton = () => {
    setFormData(selectedUser);
    setEditMode(true);
  };

  const cancelButton = () => {
    setEditMode(false);
    setFormData({});
  };

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const formSubmit = (e) => {
    e.preventDefault();

    if (!selectedUser) return;
    console.log("FormData being sent:", formData);
    axios
      /*.patch(`https://dummyjson.com/users/${selectedUser.id}`, formData)*/
      .put(`http://127.0.0.1:8000/users/${selectedUser.id}`, formData) // connetced to python endpoints
      .then((response) => {
        const updatedUser = response.data;
        selectedUserSet(updatedUser);
        setFormData(updatedUser);
        setEditMode(false);

        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      })

      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

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
            {editMode ? (
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <form className="space-y-4" onSubmit={formSubmit}>
                  <div>
                    <label className="block font-semibold">ID</label>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      readOnly
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Gender</label>
                    <input
                      type="text"
                      name="gender"
                      value={formData.gender || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={inputChange}
                      className="w-full border px-4 py-2"
                    />
                  </div>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      type="button"
                      onClick={cancelButton}
                      className="font-wixText bg-white border-2 border-syyclopsButton text-syyclopsButton flex-1 px-8 py-2 rounded-lg  hover:bg-syyclopsHoverButton hover:text-white">

                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="font-wixText bg-syyclopsButton text-white flex-1 px-8 py-2 rounded-lg  hover:bg-syyclopsHoverButton"
                    >
                      Save
                    </button>
                  </div>

                </form>
              </div>
            ) : (
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
            )}
            {!editMode && (
              <button onClick={editButton} className="font-wixText mt-4 float-right bg-syyclopsButton text-white px-16 py-2.5 text-lg rounded-xl transition duration-300 ease-in-out transform hover:bg-syyclopsHoverButton hover:scale-105">
                Edit
              </button>
            )}
          </>


        ) : (<p className="font-wixText text-syyclopsBlue">Select a user from the sidebar to view details</p>)}

      </div>
    </div>
  );
}

export default App;
