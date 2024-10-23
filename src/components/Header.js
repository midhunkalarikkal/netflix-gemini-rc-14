import { auth } from "../utils/firebase";
import React , { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LOGO , USER_LOGO } from '../utils/constants';
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";

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
    const unSubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const {uid, email , displayName} = user
          dispatch(addUser({uid : uid, email : email, displayName : displayName}))
          navigate('/browse');
        } else {
            dispatch(removeUser())
            navigate('/');
        }
      });

      return () => unSubscribe();
},[])

  return (
    <div className="absolute flex px-10 py-2 bg-gradient-to-b from-black w-full z-50">
      <div>
        <img
          className="w-44 cursor-pointer"
          src={LOGO}
          alt="Netflix_logo"
        />
      </div>
      {user && (
        <div className="flex ml-auto items-center justify-between w-auto space-x-4 p-5">
          <h4 className='font-semiBold text-white'>Hi, {user.displayName}</h4>
          <img
            className="w-8 object-cover rounded-lg"
            src={USER_LOGO}
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
