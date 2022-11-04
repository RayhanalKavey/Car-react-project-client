import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const Header = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  //------------- redirect user
  const navigate = useNavigate();
  //------------- user location where they want to go
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  /// Handle log out
  const handleSignOut = () => {
    logout()
      .then((result) => {
        alert("User logged out!");
        navigate(from, { replace: true });
        setUser({});
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const menuItems = (
    <>
      <li className="font-semibold">
        <Link to={"/"}>Home</Link>
      </li>
      <li className="font-semibold">
        <Link to={"/orders"}>Orders</Link>
      </li>
      {user?.email ? (
        <>
          <li className="font-semibold">
            <Link onClick={handleSignOut}>Logout</Link>
          </li>
          <li className="self-center">{user?.email}</li>
        </>
      ) : (
        <>
          <li className="font-semibold">
            <Link to={"/login"}>Login</Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 mb-12 pt-12">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      <div className="navbar-end">
        <button className="btn btn-outline">Appointment</button>
      </div>
    </div>
  );
};

export default Header;

// Should be inside a ul
//  {
//    /* Item --1 starT */
//  }
//  <li>
//    <a href="/">Item 1</a>
//  </li>;
//  {
//    /* Item --1 enD */
//  }
//  {
//    /* Item --2 starT */
//  }
//  <li tabIndex={0}>
//    {/* > icon when small device */}
//    <a href="/">
//      Parent
//      <svg
//        className="fill-current"
//        xmlns="http://www.w3.org/2000/svg"
//        width="20"
//        height="20"
//        viewBox="0 0 24 24"
//      >
//        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
//      </svg>
//    </a>
//    <ul className="p-2">
//      <li>
//        <a href="/">Submenu 1</a>
//      </li>
//      <li>
//        <a href="/">Submenu 2</a>
//      </li>
//    </ul>
//  </li>;
//  {
//    /* Item --2 enD */
//  }
//  {
//    /* Item --3 starT */
//  }
//  <li>
//    <a href="/">Item 3</a>
//  </li>;
//  {
//    /* Item --3 enD */
//  }
