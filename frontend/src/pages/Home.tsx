import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

type Profile = {
  id: string;
  name: string;
  email: string;
};
type Product = {
  _id: string;
  product_name: string;
  product_rate: number;
};

const Home = () => {
  const { cartItem, setCartItem } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<Profile | null>(null);
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    if (!user) {
      axios
        .get<Profile>("/profile")
        .then(({ data }) => {
          setUser(data);
          console.log(data);
        })
        .catch((err) => {
          toast.error("no user found" + err);
          navigate("/login");
        });
    }
    axios
      .get<Product[]>("/product")
      .then(({ data }) => {
        setProduct(data);
        console.log(data);
      })
      .catch(() => {
        toast.error("Unable to fetch products");
      });
  }, []);

  const AddItem = async (id: string, name: string) => {
    console.log(id);
    try {
      const { data } = await axios.put("product/addproduct", {
        productId: id,
        userId: user?.id,
      });
      toast.success(name + " Added");
      console.log(data);
      setCartItem(data.products.length);
    } catch (error) {
      toast.error(name + " Not added");
      console.log(error);
    }
  };

  return (
    <div className="cards">
      {product.map((ele) => (
        <div key={ele._id} className="card">
          <h3 className="Product_name">{ele.product_name}</h3>
          <span>
            <p>{ele.product_rate}</p>Rs
          </span>
          <button
            onClick={() => {
              AddItem(ele._id, ele.product_name);
            }}
            className="button"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
