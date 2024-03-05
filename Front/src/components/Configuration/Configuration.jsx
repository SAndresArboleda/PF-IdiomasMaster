import React, { useState } from "react";
import ProfileSection from "./ProfileSection";
import PaymentSection from "./PaymentSection";
import ReviewSection from "./ReviewSection";
import CourseSection from "./CourseSection";
import DangerZone from "./dangerZone";

import { t } from "i18next";
import { CalendarSection } from "./CalendarSection";

export const Configuration = () => {
  const [selectedSection, setSelectedSection] = useState("perfil");

  const [options, setOptions] = useState({
    perfil: true,
    pago: false,
    review: false,
    danger: false,
    cursos: false,
    calendar: false,
  });

  const handleClick = (element) => {
    const updatedOptions = {
      perfil: false,
      pago: false,
      review: false,
      danger: false,
      cursos: false,
      calendar: false,
      [element]: true,
    };
    setOptions(updatedOptions);
  };

  // funcion para renderizar la sección seleccionada

  return (
    <div className=" w-full h-[80vh] mt-[80px] flex flex-col items-center">
      <div className="flex items-center w-[80%] h-[10%]  ">
        <h2 className="pl-3 mb-4 text-[30px] font-semibold">
          {t("CONFIGURACION CUENTA")}
        </h2>
      </div>
      <div className="h-[90%] w-[90%] flex flex-row min-w-[20%] ">
        <div className="flex-col-6 min-w-[20%] h-full pl-[15px] justify-end">
          <div
            className={`flex items-center h-[10%] font-bold border-l-[1px]  border-t-[1px] border-b-[1px] cursor-pointer ${
              options.perfil
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
            }`}
            onClick={() => handleClick("perfil")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              {t("MI PERFIL")}
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px] border-b-[1px]   cursor-pointer ${
              options.cursos
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
            }`}
            onClick={() => handleClick("cursos")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              {t("MIS CURSOS")}
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px]  border-b-[1px]   cursor-pointer ${
              options.pago
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500"
                : "bg-white"
            }`}
            onClick={() => handleClick("pago")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">{t("MIS PAGOS")}</p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px] border-b-[1px]  cursor-pointer ${
              options.review
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500 "
                : "bg-white"
            }`}
            onClick={() => handleClick("review")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              {t("MIS RESEÑAS")}
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[1px] border-b-[1px]  cursor-pointer ${
              options.calendar
                ? "bg-blue-500 text-white cursor-not-allowed border-blue-500 "
                : "bg-white"
            }`}
            onClick={() => handleClick("calendar")}
          >
            <p className="text-[18px] ml-[20px] focus:text-white ">
              {t("CALENDARIO")}
            </p>
          </div>
          <div
            className={`flex items-center h-[10%] font-bold border-x-[1px] border-l-[2px]  border-t-[1px] border-b-[2px]   cursor-pointer ${
              options.danger
                ? "bg-red-500 text-white cursor-not-allowed border-red-500 "
                : "bg-white"
            }`}
            onClick={() => handleClick("danger")}
          >
            <p className="text-[18px] ml-[20px] ">{t("ZONA PELIGRO")}</p>
          </div>
        </div>
        <div className={`w-full border-[1px]  ${
              options.danger
                ? "border-red-500 "
                : "border-blue-500"
            }`}>
          {options.perfil ? <ProfileSection /> : null}
          {options.pago ? <PaymentSection /> : null}
          {options.review ? <ReviewSection /> : null}
          {options.cursos ? <CourseSection /> : null}
          {options.calendar ? <CalendarSection /> : null}
          {options.danger ? <DangerZone /> : null}
        </div>
      </div>
    </div>
  );
};
