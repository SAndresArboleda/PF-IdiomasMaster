import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { userPayments } from "../Admin/userData";
import PaymentCard from "./paymentCard";
import { useTranslation } from "react-i18next";
import { MdPayments } from "react-icons/md";

const PaymentSection = () => {
  const [userData] = useLocalStorage("userData", {});
  const [userPayment, setUserPayment] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fecthPayment = async () => {
      const response = await userPayments(userData._id);

      if (response.data) {
        setUserPayment(response.data);
      }
    };

    fecthPayment();
  }, [userData._id]);

  return (
    <div className=" flex-rows w-full h-full  grid grid-cols-1 gap-[10px] grid-rows-auto overflow-hidden  justify-center p-[10px] overflow-y-scroll">
      {userPayment && userPayment.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center">
          <MdPayments className="text-[80px] text-gray-600 ml-[50px] font-semibold flex" />
            <p className="text-[60px] text-gray-600 ml-[50px] font-semibold flex">
              {t("AUN NO TIENES PAGOS REALIZADOS")}
            </p>
            
          </div>
        </>
      ) : (
        <>
          {userPayment &&
            userPayment.map((c, index) => (
              <div key={index} className="  bg-white-200 shadow-lg border-[1px] border-gray-200 flex flex-col  h-full">
                <PaymentCard
                  id={c._id}
                  amount={c.Amount}
                  date={c.date}
                  course={c.course_payment}
                  status={c.status}
                />
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PaymentSection;
