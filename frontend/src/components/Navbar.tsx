import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

const Navbar = () => {
  const { cartItem } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  let buttonText = "Invoice";
  let buttonPath = "/invoice";
  if (location.pathname === "/invoice") {
    buttonText = "Home";
    buttonPath = "/";
  }

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img
          className="logo"
          src="https://levitation.in/wp-content/uploads/2023/04/levitation-Infotech.png"
          alt="no image"
        />
      </div>
      <div className="buttons-container">
        <div className="cart-icon">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItem > 0 && <span className="cart-count">{cartItem}</span>}
        </div>
        <button
          onClick={() => {
            navigate(buttonPath);
          }}
          className="button"
        >
          {buttonText}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
