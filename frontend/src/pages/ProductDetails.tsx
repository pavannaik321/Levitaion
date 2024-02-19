import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import image from "./images/levitation-Infotech.png";

type Product = {
  product_name: string;
  product_rate: number;
  quantity: number;
  __v: number;
  _id: string;
};

type userproduct = {
  product_name: string;
  product_rate: number;
  quantity: number;
  __v: number;
  _id: string;
}[];

type UserData = {
  id: string;
  name: string;
  email: string;
  products: Product[];
};

const ProductDetails = () => {
  // downloading the pdf format
  const [loader, setLoader] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const [data, setData] = useState<userproduct | null>(null);
  const [sum, setSum] = useState<number | null>(null);
  const [gtotal, setGtotal] = useState<number | null>(null);
  const [isLoadingTotal, setILoadingTotal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const currentDate = new Date();
  const futureDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 4,
    currentDate.getDate()
  );
  const formattedDate = futureDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user) {
          const profileResponse = await axios.get<UserData>("/profile");
          setUser(profileResponse.data);
          console.log(profileResponse);
        }

        if (user && !data) {
          const invoiceResponse = await axios.get<userproduct>(
            `/invoice/${user.id}`
          );
          console.log(invoiceResponse);
          setData(invoiceResponse.data);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error("Error fetching data: " + error);
        navigate("/login");
      }
    };

    const sumandtotal = () => {
      var sum = 0;
      data?.map((item) => {
        sum += item.product_rate * item.quantity;
      });

      setSum(sum);

      var grandTotal = 1.8 * sum;
      var roundedTotal = parseFloat(grandTotal.toFixed(2));
      setGtotal(roundedTotal);
      setILoadingTotal(false);
    };
    sumandtotal();
    fetchData();
  }, [user, data, setUser, navigate]);

  const Displaydata = () => {
    const capture = document.querySelector(".actual-invoice") as HTMLElement;
    console.log(data);
    setLoader(true);
    if (capture) {
      html2canvas(capture).then((canvas) => {
        const imgData = canvas.toDataURL("img/png");
        const doc = new jsPDF("p", "mm", "a4");
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
        setLoader(false);
        doc.save("invoice.pdf");
      });
    }
  };

  return (
    <>
      <div className="pl-12">
        <button
          onClick={Displaydata}
          disabled={!(loader === false)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2 transition-colors"
        >
          {loader ? <span>Downloading</span> : <span>Download Invoice</span>}
        </button>
      </div>

      {!isLoading ? (
        // invoice generate code
        <div className="actual-invoice p-5 md:p-10">
          <div className="p-5 md:p-10">
            <div className="px-2 pb-5 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-2 md:mb-0">
                <h2 className="font-bold text-xl md:text-2xl">
                  INVOICE GENERATOR
                </h2>
                Download Invoice
                <p>Sample Output should be this</p>
              </div>
              <img className="h-10 w-auto" src={image} alt="no image" />
            </div>
            {/* price table */}
            <div className="p-3 md:p-7">
              <table className="w-full border-collapse border-b-2 border-gray-300">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 border-t-0 align-middle text-start">
                      Product
                    </th>
                    <th className="border-b-2 border-gray-300 border-t-0 align-middle text-start">
                      Qty
                    </th>
                    <th className="border-b-2 border-gray-300 border-t-0 align-middle text-start">
                      Rate
                    </th>
                    <th className="border-b-2 border-gray-300 border-t-0 align-middle text-start">
                      Total
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {/* display products selected by user */}

                  {data?.map((prod) => (
                    <tr className="p-2" key={prod._id}>
                      <td className="align-middle text-start ">
                        {prod.product_name}
                      </td>
                      <td className="align-middle text-start text-blue-600">
                        {prod.quantity}
                      </td>
                      <td className="align-middle text-start">
                        {prod.product_rate}
                      </td>
                      <td className="align-middle text-start">
                        INR {prod.quantity * prod.product_rate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* total table */}
            {sum !== null && gtotal !== null ? (
              <div className="flex flex-col md:flex-row justify-end pr-5 md:pr-10">
                <table>
                  <tbody>
                    <tr className="py-2">
                      <th className="text-start">Total</th>
                      <td className="text-end">INR {sum}</td>
                    </tr>
                    <tr className="py-2">
                      <td className="text-start border-b-2 border-gray-300 border-t-0">
                        GST
                      </td>
                      <td className="text-end border-b-2 border-gray-300 border-t-0">
                        18%
                      </td>
                    </tr>
                    <tr className="py-2">
                      <th className="pr-6 md:pr-9 text-start">Grand Total</th>
                      <td className="pl-6 md:pl-9 text-end text-blue-600">
                        INR {gtotal}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <div className="w-50 flex flex-col justify-between pl-3 mt-10">
              <p className="align-middle">Valid Until :{formattedDate} </p>
            </div>
            <div className="bg-black w-10/12  p-3 rounded-full text-white mt-20 ">
              <h3 className="text-s mb-2 pl-5">Terms and Condition</h3>
              <p className=" pl-5 text-xs font-normal font-mono">
                we are happy to supply any furthur information you may need and
                trust that you call on us to fill your order.
              </p>
              <p className="pl-5 text-xs font-normal font-mono">
                which will recive our prompt and careful attention
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default ProductDetails;
