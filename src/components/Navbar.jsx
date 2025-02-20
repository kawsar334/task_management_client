import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProviders';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState(true)
  const { user, signInWithGoogle, signOutUser } = useContext(AuthContext);

  return (
    <nav className="bg-teal text-white py-3 md:py-1 px-4 flex justify-between items-center sticky top-0 left-0 ">
      <Link to="/"  className="text-2xl font-bold">Task</Link>

   { menu &&<div className='relative md:static w-[100%] md:w-max'>
        <div className="flex   md:items-center gap-4 flex-col md:flex-row absolute md:static w-full left-[-0px] top-[50px] bg-teal  p-4  ">
          {user ? (
            <>
              <Link className='border px-2 py-1 rounded  ' to="/mytask">My Task</Link>
              <Link className='border px-2 py-1 rounded  ' to="/addtask">Add task</Link>


              <p className="text-sm "><span className="font-semibold">{user.displayName}</span></p>

              <Link to="/profile" className=''>
                <img className='w-10 h-10 rounded-full border' src={user?.photoURL} alt="" />
              </Link>
              <button
                onClick={signOutUser}
                className="bg-tc text-white px-4 py-1 rounded-md hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <div className='flex justify-center items-center gap-4'>
              <Link to="/login" className=' px-2 py-1 border rounded  '>Login</Link>
              <Link to="/register" className=' px-2 py-1 border rounded  '>register</Link>
            </div>
          )}
        </div>
   </div>}

   <span className='cursor-pointer text-3xl md:hidden ' onClick={()=>setMenu(!menu)}>
       {!menu? <i className="fa-solid fa-bars"></i>:   
        <i className="fa-solid fa-xmark"></i>}
   </span>


    </nav>
  );
};

export default Navbar;
