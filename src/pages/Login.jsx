// LoginPage.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProviders';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Swal from "sweetalert2";

function LoginPage() {
    const navigate = useNavigate()
    const { signInUser, signInWithGoogle, setUser } = useContext(AuthContext);
   
    const provider = new GoogleAuthProvider();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

   
// 
    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = formData;
        signInUser(email, password)
            .then(result => {
                const user = result?.user;
                const lastSignInTime = user?.metadata?.lastSignInTime;
                const loginInfo = { email, lastSignInTime };
                setUser(user);
                toast.success("Login successfully");
                navigate("/");

            })
            .catch(error => {
                toast.error(error.message);
            });
    };


    // handling gogle login
    const handleGoogleLogin = () => {

        signInWithGoogle()
          
    }

    return (
        <div className="w-full max-w-md mx-auto mt-16 p-8 bg-transparent   md:border  shadow-md rounded-lg"
        
           
        >
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-[20px] focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-mn text-white py-2 rounded-[20px] hover:border transition duration-200"
                >
                    Login
                </button>
            </form>
            <button
                onClick={handleGoogleLogin}
                
                className="w-full my-4 text-red-500 bg-white border-red-500 border-[1px] py-2 rounded-[20px]  hover:border hover:bg-blue transition duration-200"
            >
                Singin with google
            </button>
            <p>Don't have any account ? <NavLink to="/register" className="text-blue">Register</NavLink></p>
        </div>
    );
}

export default LoginPage;
