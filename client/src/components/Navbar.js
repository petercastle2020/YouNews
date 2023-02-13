import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>You News</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>Log out</button>
          </div>
          <div>
            <Link to="/signup">SignUp</Link>
            <Link to="/login">Login</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
