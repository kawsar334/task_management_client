import React, { useEffect } from 'react'
import { useState } from 'react';

import { createContext } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import App from '../App';
import axios from 'axios';
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, []);


  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  
      setLoading(false);     

      if (currentUser) {
  
        sendUserInfoToBackend(currentUser);
      }
    });

    return () => unsubscribe(); 
  }, [auth]);
  const sendUserInfoToBackend = async (currentUser) => {
    try {
      const response = await axios.post('https://taskmanagement-snowy.vercel.app/login', {
        userId: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName,
      },{withCredentials:true});
      console.log('User info sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending user info to backend:', error);
    }
  };

  const createUser = async (email, password, name, photoURL, navigate) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      try {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoURL
        });
        Swal.fire("Registration successful");

        navigate("/");
        setTimeout(() => {
          window.location.reload();
        }, 600);

        return userCredential.user;
      } catch (profileError) {
        console.error("Error updating user profile:", profileError);
        toast.error("Failed to update profile!");
      }

    } catch (error) {
      console.error("Error during user registration:", error);
      toast.error(`Registration failed: ${error.message}`);
      navigate("/register");
    }
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
 


  const signOutUser = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out from your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign me out!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);

        Swal.fire("Signed Out!", "You have been signed out successfully.", "success");

        setTimeout(() => {
          window.location.reload();
        }, 600);
      } catch (err) {
        console.error(err);
        Swal.fire("Error!", "Failed to sign out. Please try again later.", "error");
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // const user = result?.user;
      // const response = await axios.post('https://taskmanagement-snowy.vercel.app/login', {
      //   userId: user.uid,
      //   email: user.email,
      //   displayName: user.displayName,
      // }, { withCredentials: true });
      // console.log('User info sent successfully:', response.data);
      // toast("Login successful");
      
      setTimeout(() => {
        window.location.replace("/");
      }, 600);


    } catch (error) {
      console.error("Error during Google sign-in:", error);
      Swal.fire("Google sign-in failed!", "", "error");
      
    }
  };
  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    signInUser,
    loading,
    createUser,
    user,
    signOutUser,
    signInWithGoogle,
    setUser
  }

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
   
  )
}


export default AuthProviders; 