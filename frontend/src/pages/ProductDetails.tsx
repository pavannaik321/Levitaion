import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user && data === null) {
      console.log(user.id);
      axios
        .get(`/invoice/${user.id}`)
        .then(({ data }) => {
          setData(data);
          console.log(data);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  }, [data, user]);

  return (
    <>
      <div>{!!user && <h2>Hi {user.id}</h2>}</div>
    </>
  );
};

export default ProductDetails;
