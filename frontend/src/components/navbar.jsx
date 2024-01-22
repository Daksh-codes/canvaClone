import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../slices/userSlice";

function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(user);
  return (
    <nav className="flex items-center  justify-between p-4 mx-12 text-[24px] font-light border-b-2 border-neutral-600">
      <Link to={"/"}> Artsy</Link>
      {user ? (
        <div className="flex gap-8">
          <button onClick={() => dispatch(removeUser())}>Logout</button>
          <h3 className="flex items-center">
            <span class="material-symbols-outlined">account_circle</span>
            {user.firstName}
          </h3>
        </div>
      ) : (
        <div className="flex gap-8 items-center">
          <Link to={"/login"}>Login</Link>
          <Link className="bg-orange-300 px-4 py-2 rounded-lg" to={"/register"}>
            Signup
          </Link>

        </div>
      )}
    </nav>
  );
}

export default Navbar;
