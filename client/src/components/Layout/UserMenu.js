import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <ul className="list-group">
          <h4>User Menu</h4>

          <NavLink to="/dashboard/user/dashboard" className="list-group-item">
            Dashboard
          </NavLink>
          <NavLink to="/dashboard/user/Profile" className="list-group-item">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item">
            Orders
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default UserMenu;
