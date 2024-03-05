import { useEffect, useState } from "react";
import { paymentData, reviewData, usersData } from "./userData";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import ReviewCard from "./reviewCard";
import PaymentCard from "./paymentCard";

export default function AdminPayments({ setSettings }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await paymentData();

      if (response) {
        setData(response.data);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px]">
      <div className="w-full h-[40px]  flex flex-row">
        <div className="h-full w-[5%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Num</h1>
        </div>
        <div className="h-full w-[25%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>ID Pago</h1>
        </div>
        <div className="h-full w-[12%]  bg-[#151139] flex items-center justify-center text-white ">
          <h1>Fecha Pago</h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Monto</h1>
        </div>
        <div className="h-full w-[20%] bg-[#151139]  flex items-center justify-center text-white">
          <h1>ID Usuario</h1>
        </div>
        <div className="h-full w-[20%] bg-[#151139] flex items-center justify-center text-white">
        <h1>ID Producto</h1>
        </div>
        <div className="h-full w-[13%]  bg-[#3b3194]  flex items-center justify-center text-white">
          <h1>Estado</h1>
        </div>
      </div>
      <div className="bg-[#282a54] w-full h-[96%] max-h-[637px] overflow-y-scroll ">
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <PaymentCard
              key={element._id}
              index={index + 1}
              id={element._id}
              date={element.date}
              amount={element.Amount}
              user={element.student_payment}
              course={element.course_payment}
              status={element.status}
            />
          ))}
      </div>
    </div>
  );
}
