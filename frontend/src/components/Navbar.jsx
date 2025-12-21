import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, Link, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const location = useLocation();

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, [setToken]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setOpenProfile(false);
    navigate("/login");
  };

  // close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setVisible(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // close profile popup on route change
  useEffect(() => {
    setOpenProfile(false);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 w-full flex items-center justify-between py-4 px-6 font-medium bg-white z-50 shadow-sm">
      {/* Logo */}
      <img
        src={assets.logo}
        alt=""
        className="w-36 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu (OLD UI RESTORED) */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, i) => {
          const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "text-[#4D3B4C]" : ""
                }`
              }
            >
              <p>{names[i]}</p>
              <hr
                className={`w-2/4 border-none h-[1.5px] bg-[#4D3B4C] ${
                  location.pathname === path ? "block" : "hidden"
                }`}
              />
            </NavLink>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Search only on collection */}
        {location.pathname.includes("collection") && (
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer"
            alt=""
            onClick={() => setShowSearch(true)}
          />
        )}

        {/* Profile (CLICK ONLY) */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
            onClick={(e) => {
              e.stopPropagation();
              setOpenProfile((prev) => !prev);
            }}
          />

          {openProfile && (
            <div className="absolute right-0 top-full mt-2 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p
                  className="cursor-pointer hover:text-hoverPurple"
                  onClick={() => {
                    setOpenProfile(false);
                    navigate("/orders");
                  }}
                >
                  Orders
                </p>

                <p
                  className="cursor-pointer hover:text-hoverPurple"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 bottom-0 h-screen bg-white transition-all duration-300 z-[9998] ${
          visible ? "w-full" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div
            className="flex items-center gap-4 p-6 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          {["/", "/collection", "/about", "/contact"].map((path, i) => {
            const names = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
            return (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className="py-2 pl-6 border"
              >
                {names[i]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
