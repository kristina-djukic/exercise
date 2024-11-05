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
      /*.get("https://dummyjson.com/users?limit=20")*/ // for connecting to dummyjson
      .get('http://127.0.0.1:8000/users') // connected to the python endpoints
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
    axios
      /*.patch(`https://dummyjson.com/users/${selectedUser.id}`, formData)*/ // connection to dummyjson
      .put(`http://127.0.0.1:8000/users/${selectedUser.id}`, formData) // connected to Python endpoints
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
    <div className="h-screen w-full flex">

      <div className="w-1/4 bg-syyclopsBlue text-white h-full flex flex-col">

        <div className="sticky top-0 bg-syyclopsBlue z-10 px-5 py-3 pb-3 border-b border-white">
          <h2 className="text-xl font-semibold text-syyclopsOrange font-wixDisplay">Users</h2>
        </div>

        <div className="overflow-y-auto flex-grow bg-syyclopsBlue text-white p-4">
          <ul className="font-wixText">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => selectedUserSet(user)}
                className={`mb-2 cursor-pointer p-2 ${selectedUser?.id === user.id ? 'text-syyclopsOrange' : 'hover:text-syyclopsOrange'}`}
              >
                {[user.firstName, user.lastName].join(" ")}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col w-3/4 h-screen overflow-hidden">

        <div className="bg-syyclopsBlue text-white p-4 flex justify-end items-center">
          <img src="logoSyyclops.png" alt="Logo" className="h-5 w-auto" />
        </div>

        <div className="bg-white p-8 overflow-y-auto flex-grow">
          <h1 className="text-2xl font-wixDisplay font-semibold mb-4 text-syyclopsButton">User Details</h1>
          {selectedUser ? (
            <>
              {editMode ? (
                <div>
                  <form className="space-y-2" onSubmit={formSubmit}>
                    <table className="min-w-full bg-tableColor shadow-md rounded-xl border-separate border-spacing-0 font-wixText border border-syyclopsBlue text-syyclopsBlue">
                      <tbody className="font-wixText">
                        {[
                          { label: "ID", name: "id" },
                          { label: "First Name", name: "firstName" },
                          { label: "Last Name", name: "lastName" },
                          { label: "Age", name: "age" },
                          { label: "Gender", name: "gender" },
                          { label: "Email", name: "email" },
                          { label: "Phone", name: "phone" },
                        ].map((row, idx, arr) => (
                          <tr key={row.name}>
                            <td className={`px-4 py-2 font-semibold border-r border-syyclopsBlue ${idx !== arr.length - 1 ? 'border-b' : ''}`}>
                              {row.label}
                            </td>
                            <td className={`px-4 py-2 border-syyclopsBlue ${idx !== arr.length - 1 ? 'border-b' : ''}`}>
                              <input
                                type="text"
                                name={row.name}
                                value={formData[row.name] || ""}
                                onChange={inputChange}
                                readOnly={row.name === "id"}
                                required
                                className="w-full border-none focus:ring-0 bg-tableColor"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="flex justify-end space-x-4 mt-4 pt-1">
                      <button
                        type="button"
                        onClick={cancelButton}
                        className="font-wixText bg-white border-2 border-syyclopsButton text-syyclopsButton w-40 px-6 py-2.5 rounded-lg hover:bg-syyclopsHoverButton hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="font-wixText bg-syyclopsButton text-white w-40 px-6 py-2.5 rounded-lg hover:bg-syyclopsHoverButton"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <table className="min-w-full bg-tableColor shadow-md rounded-xl border-separate border-spacing-0 font-wixText border border-syyclopsBlue text-syyclopsBlue">
                  <tbody className="font-wixText">
                    {[
                      { label: "ID", value: selectedUser.id },
                      { label: "First Name", value: selectedUser.firstName },
                      { label: "Last Name", value: selectedUser.lastName },
                      { label: "Age", value: selectedUser.age },
                      { label: "Gender", value: selectedUser.gender },
                      { label: "Email", value: selectedUser.email },
                      { label: "Phone", value: selectedUser.phone },
                    ].map((row, idx, arr) => (
                      <tr key={idx}>
                        <td className={`px-4 py-2 font-semibold border-r border-syyclopsBlue ${idx !== arr.length - 1 ? 'border-b' : ''}`}>{row.label}</td>
                        <td className={`px-4 py-2 border-syyclopsBlue ${idx !== arr.length - 1 ? 'border-b' : ''}`}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {!editMode && (
                <button onClick={editButton} className="font-wixText mt-4 float-right bg-syyclopsButton text-white px-16 py-2.5 text-lg rounded-xl transition duration-300 ease-in-out transform hover:bg-syyclopsHoverButton hover:scale-105">
                  Edit
                </button>
              )}
            </>
          ) : (
           
  <div className="flex space-x-10  h-3/4 mt-10">
    <div className="bg-tableColor p-10 rounded-lg shadow-md flex-1 flex flex-col justify-between">
      <p className="font-wixText text-syyclopsBlue text-xl font-semibold pb-20">
        Select a user from the sidebar to view and edit details.
      </p>
      <p className="font-wixText text-syyclopsButton text-xl font-semibold self-start">
        This is Syyclops test assignment.
      </p>
    </div>
    <div className="bg-syyclopsBlue p-10 rounded-lg shadow-md flex-1 flex items-center justify-center">
    <img src="logoSyyclopsO.png" alt="LogoO" className="h-15 w-auto" />
    </div>
  </div>


          )}
        </div>
      </div>
    </div>
  );
}

export default App;