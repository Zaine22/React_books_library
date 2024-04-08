import React, {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import lightIcon from "../assets/light.svg"
import darkIcon from "../assets/dark.svg"

export default function Navbar() {
  let [search, setSearch] = useState("");
  let navigate = useNavigate();

  let handleSearch = (e) => {
    e.preventDefault();
    navigate("/?search=" + search);
  };

  let {theme ,isDark, changeTheme}=useTheme();

  return (
    <nav className={`border border-b-1 ${isDark ? 'bg-dbg border-primary' : 'bg-white'}`}>
      <ul className="flex justify-between p-3 max-w-6xl mx-auto">
        <li className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none px-2 py-1 rounded-lg"
            type="text"
            placeholder="search books..."
            
          />
          <button
            onClick={handleSearch}
            className="text-white bg-primary px-3 py-1 rounded-2xl flex items-center gap-1"
          >
            <span className="hidden md:block">Search</span>
          </button>
        </li>
        <Link
          to="/"
          className="flex items-center gap-3 md:-ml-32 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
            />
          </svg>

          <span className="text-2xl font-bold text-primary hidden md:block">
            Book Store
          </span>
        </Link>
        <li className="flex gap-3 items-center">
          {/* create book */}
          <Link
            to="/create"
            className="text-white bg-primary px-3 py-2 rounded-2xl flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span className="hidden md:block">Create Book</span>
          </Link>
          {/* profileImage */}
          <div className="w-11 h-11">
            <img
              className="w-full h-full rounded-full"
              src="https://i.pinimg.com/474x/da/1e/92/da1e92ed90ffffef2c53461d35e700a1.jpg"
              alt=""
            />
          </div>
          <div className="cursor-pointer">
           {isDark && <img src={lightIcon} alt=""  className="w-8" onClick= {() => changeTheme('light') }/> }
           {!isDark  && <img src={darkIcon} alt="" className="w-8" onClick= {() => changeTheme('dark') }/>}
          </div>
        </li>
      </ul>
    </nav>
  );
}
