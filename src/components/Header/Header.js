import { auth } from "../../utils/firebase";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGO, supportedLanguages, USER_LOGO } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { toggleGptSearchView } from "../../utils/gptSlice";
import { changeLanguage } from "../../utils/configSlice";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt?.showGptSearch);

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

  const handleGptSearch = () => {
    dispatch(toggleGptSearchView());
  };

  const handleSelect = (value) => {
    dispatch(changeLanguage(value));
  }

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
          <h4 className="font-semiBold text-white cursor-pointer">
            Hi, {user.displayName}
          </h4>
          <img
            className="w-8 object-cover rounded-lg cursor-pointer"
            src={USER_LOGO}
            alt="User Icon"
          />
            {showGptSearch && (
              <select
                onChange={(e) => handleSelect(e.target.value)}
                className="md:block h-8 px-1 md:px-2 bg-black text-white rounded-md shadow border border-red-600 focus:outline-none"
              >
                {supportedLanguages.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier} className="text-white">
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
          <button
            className="relative inline-flex h-8 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none md:block"
            onClick={handleGptSearch}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,#ffffff_0%,#000000_50%,#E50914_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-black px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined hover:text-red-600">
              {!showGptSearch ? "GPT Search" : "Home"}
            </span>
          </button>
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
                  onClick={handleGptSearch}
                >
                  {!showGptSearch ? "GPT Search" : "Home"}
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
