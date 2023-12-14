import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import { auth } from "../Fireconfig";
import { onAuthStateChanged } from "firebase/auth";

function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    return user ? setIsLoggedIn(true) : setIsLoggedIn(false);
  });

  const logOut = () => {

    auth.signOut().then(() => {
      console.log('singOut');
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <nav>
      <ul>
        <li>
          <Link className="btn btn-outline-primary" to="/loginclient">Log In</Link>
        </li>
        <li>
          <Link to="/">Novels</Link>
        </li>
        <li>
          <Link to="/Add">Add Manga</Link>
        </li>
        <li className="icon">
          <Link to="/Cart">
            <FaShoppingCart size={15} />
          </Link>
        </li>
      </ul>
    </nav>

  );
}

export default Menu;
