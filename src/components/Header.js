import React from 'react';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/');
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  }

  return (
    <div className='absolute flex px-10 py-2 bg-gradient-to-b from-black w-full z-50'>
      <div className='w-3/12'>
      <img className='w-44 cursor-pointer' src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt='Netflix_logo' />
      </div>
      <div className='flex ml-auto items-center justify-between w-1/12'>
        <img className='w-8 object-cover rounded-lg' src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp" alt='User Icon' />
        <button className='font-semibold text-md text-white px-2 py-1 rounded-lg' style={{ backgroundColor : "#E50914"}} onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  )
}

export default Header