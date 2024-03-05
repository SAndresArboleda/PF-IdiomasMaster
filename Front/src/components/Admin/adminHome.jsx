import { useEffect, useState } from "react";
import DashProducts from "./dashProducts";
import { paymentData, productData, reviewData, usersData } from "./userData";
import DashUsers from "./dashUsers";
import DashPayment from "./dashPayment";
import DashReviews from "./dashReviews";
import { FaCircle } from "react-icons/fa6";

export default function AdminHome() {
  const [prodData, setProData] = useState([]);
  const [useData, setUseData] = useState([]);
  const [paysData, setPaysData] = useState([]);
  const [viewData, setviewData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await productData();

      if (response) {
        setProData(response.data);
      }
    };

    dataFetch();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await usersData();

      if (response) {
        setUseData(response.data);
      }
    };

    dataFetch();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await paymentData();

      if (response) {
        setPaysData(response.data);
      }
    };

    dataFetch();
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await reviewData();

      if (response) {
        setviewData(response.data);

        const alert = response.data.filter((element) => element.view === false);

        setNotifications(alert);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className="h-[90vh] w-full bg-[#f1f1f1] flex items-center justify-center">
      <div className="h-[85%] w-[85%] flex flex-col">
        <div className="w-full h-[8%] flex items-center pl-[40px] border-b-[2px] border-gray-300">
          <h1 className="text-gray-800 text-[30px]"> Dashboard de Administrador</h1>
        </div>
        <div className="w-full h-[90%]  grid grid-cols-2 grid-rows-2 gap-[15px] overflow-hidden">
          <div className="h-full w-full  flex items-center justify-center">
            <DashProducts data={prodData} />
          </div>
          <div className="h-full w-full  flex items-center justify-center">
            <DashUsers data={useData} />
          </div>
          <div className="h-full w-full  flex items-center justify-center">
            <DashPayment data={paysData} />
          </div>
          <div className="h-full w-full  flex items-center justify-center relative">
            <DashReviews data={viewData} />
            {notifications && notifications.length > 0 ? (
              <div className=" h-[60px] w-[60px] rounded-[100%] bg-gradient-to-r from-red-500 to-red-800 absolute flex items-center justify-center top-[-10px] right-4">
            <h1 className="text-white text-[25px]">{notifications.length}</h1>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
