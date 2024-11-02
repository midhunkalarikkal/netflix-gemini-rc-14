import { auth } from "../utils/firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGO, USER_LOGO } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unSubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="absolute flex px-10 py-2 w-full z-50 h-18">
      <div className="w-1/2">
        <img
          className="w-24 md:w-28 lg:w-36 cursor-pointer ml-18 md:ml-16 lg:ml-36 py-4"
          src={LOGO}
          alt="Netflix_logo"
        />
      </div>
      {user && (
        <div className="ml-auto items-center justify-between w-auto space-x-4 p-5 hidden md:flex">
          <h4 className="font-semiBold text-white">Hi, {user.displayName}</h4>
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
      {user && (
        <>
          <div
            className="flex ml-auto items-center justify-between w-auto space-x-4 p-5 md:hidden"
            onClick={handleOpenMenu}
          >
            <img src="/more.png" alt="" />
          </div>
          {openMenu && (
            <div className="md:hidden flex justify-center bg-black py-4 absolute top-16 right-10">
              <ul className="text-white space-y-2 w-full px-4">
                <li className="text-center border-b border-gray-500 py-2 font-medium">
                  Hi, <span className="font-semibold">Username</span>
                </li>
                <li
                  className="text-center py-2 font-medium cursor-pointer hover:bg-[#b20710] rounded"
                  onClick={handleSignOut}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
