import { auth } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGO, USER_LOGO } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.emailVerified) {
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
            })
          );
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unSubscribe();
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out successfully!");
      })
      .catch((error) => {
        toast.error("Logged out error!");
        navigate("/error");
      });
  };

  const handleOpenMenu = () => {
    setOpenMenu((prev) => !prev);
  };

  return (
    <div className="absolute flex px-6 md:px-10 py-2 w-full z-50 h-10 md:h-18 ">
      <div className="w-1/2">
        <img
          className="w-20 md:w-28 lg:w-36 cursor-pointer ml-18 md:ml-16 lg:ml-36"
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
          <div className="flex w-1/2 md:hidden" onClick={handleOpenMenu}>
            <img
              className="w-6 h-6 cursor-pointer ml-auto"
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/e50914/menu--v1.png"
              alt="menu--v1"
            />
          </div>
          {openMenu && (
            <div className="md:hidden flex justify-center bg-black py-2 md:py-4 absolute top-8 right-6 lg:top-16 lg:right-10">
              <ul className="text-white space-y-2 w-full px-4">
                <li className="text-center border-b border-gray-500 py-2 font-medium text-xs sm:text-sm">
                  Hi, <span className="font-semibold">{user.displayName}</span>
                </li>
                <li
                  className="text-center py-2 font-medium cursor-pointer hover:bg-[#b20710] rounded text-xs sm:text-sm"
                  onClick={handleSignOut}
                >
                  Sign Out
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
