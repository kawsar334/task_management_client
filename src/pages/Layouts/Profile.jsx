import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProviders";

const ProfilePage = () => {
    const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);
    const [newName, setNewName] = useState("");
    const [newPhotoURL, setNewPhotoURL] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const handleUpdate = async () => {
        if (newName || newPhotoURL) {
            try {
                Swal.fire("Profile Updated", "Your profile has been updated successfully!", "success");
            } catch (error) {
                console.error("Error updating profile:", error);
                Swal.fire("Error", "Failed to update profile.", "error");
            }
        } else {
            Swal.fire("Missing Fields", "Please fill in at least one field to update your profile.", "warning");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-semibold text-center mb-6">Profile</h2>

                {user ? (
                    <div className="space-y-4">
                        <div className="flex flex-col items-center">
                            <img
                            src={user?.photoURL}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                            <p className="font-semibold text-lg">{user.displayName || "No Name"}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>

                        {/* <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Update Name</label>
                            <input
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                placeholder="Enter new name"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700">Update Photo URL</label>
                            <input
                                type="text"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                                value={newPhotoURL}
                                onChange={(e) => setNewPhotoURL(e.target.value)}
                                placeholder="Enter new photo URL"
                            />
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                            >
                                Update Profile
                            </button>

                            <button
                                onClick={signOutUser}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                            >
                                Sign Out
                            </button>
                        </div> */}
                    </div>
                ) : (
                    <p className="text-center">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
