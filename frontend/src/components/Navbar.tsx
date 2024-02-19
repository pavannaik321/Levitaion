import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userContext";

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

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white flex flex-wrap justify-between items-center py-2 px-4 mb-8">
      <div className="flex items-center">
        <img
          className="h-10 w-auto filter invert mr-4"
          src="https://levitation.in/wp-content/uploads/2023/04/levitation-Infotech.png"
          alt="no image"
        />
        <div className="relative cursor-pointer mr-4">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItem > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItem}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => {
            navigate(buttonPath);
          }}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg mr-4"
        >
          {buttonText}
        </button>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg mr-4"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/register");
          }}
          className="bg-white text-gray-800 px-4 py-2 rounded-lg"
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
