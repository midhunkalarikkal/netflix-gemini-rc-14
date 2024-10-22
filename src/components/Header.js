import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // sign in / sign up
          const {uid, email , displayName} = user
          dispatch(addUser({uid : uid, email : email, displayName : displayName}))
          navigate('/browse');
        } else {
            // sign out
            dispatch(removeUser())
            navigate('/');
        }
      });
},[])

  return (
    <div className="absolute flex px-10 py-2 bg-gradient-to-b from-black w-full z-50">
      <div className="">
        <img
          className="w-44 cursor-pointer"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix_logo"
        />
      </div>
      {user && (
        <div className="flex ml-auto items-center justify-between w-auto space-x-4 p-5">
          <h4 className='font-semiBold text-white'>Hi, {user.displayName}</h4>
          <img
            className="w-8 object-cover rounded-lg"
            src="https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp"
            alt="User Icon"
          />
          <button
            className="font-semibold text-md text-white px-2 py-1 rounded-lg"
            style={{ backgroundColor: "#E50914" }}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
