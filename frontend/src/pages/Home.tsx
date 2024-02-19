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
  const {  setCartItem } = useContext(UserContext);
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
    <div className="flex flex-wrap justify-center">
      {product.map((ele) => (
        <div
          key={ele._id}
          className="bg-gray-100 rounded-lg shadow-md m-2 p-4 text-center w-52"
        >
          <h3 className="text-gray-800 text-lg font-semibold">
            {ele.product_name}
          </h3>
          <div className="flex items-center justify-center">
            <p className="mr-1">{ele.product_rate}</p>
            <span>Rs</span>
          </div>
          <button
            onClick={() => {
              AddItem(ele._id, ele.product_name);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2 transition-colors"
          >
            Add
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
