import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>You News</h1>
        </Link>
        <Link className="add-article-button" to="/new-article">
          Write article
        </Link>
        <nav>
          {user && (
            <div>
              <Link className="nav-link" to="/my">
                {user.email}
              </Link>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}

          {!user && (
            <div>
              <Link to="/signup">SignUp</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
