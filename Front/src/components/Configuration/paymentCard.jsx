import { useEffect, useState } from "react";
import { idProduct } from "../Admin/userData";
import { useTranslation } from "react-i18next";
import ListPaymentCard from "./listPaymentCard";

const URL = import.meta.env.VITE_URL_HOST;

export default function PaymentCard({ id, amount, date, course, status }) {
  const [data, setData] = useState({});
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await idProduct(course);

      if (response.data) {
        setData(response.data);
      } else {
        const response = await fetch(`${URL}/getShoppedCart/${course}`);
        console.log("ho2.....", response);
        if (!response.ok) {
          console.log("Error en la llamada");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      }
    };

    fetchCourse();
  }, [course]);

  // useEffect(() => {
  //   if (Object.keys(courses).length === 0) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`${URL}/getCart/${id}`);
  //         if (!response.ok) {
  //           console.log("Error en la llamada");
  //         }
  //         const data = await response.json();
  //         console.log(data)
  //         setCourse(data);
  //       } catch (error) {
  //         console.log("Mensaje de Error", error.message);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [courses]);

  return (
    <div className="bg-white shadow-lg border-[1px] border-gray-200 flex flex-col  w-full">
      <div className="bg-blue-500 flex flex-row items-center justify-between h-[80px] w-full ">
        <h1 className="ml-[15px] text-[17px] text-white">{`${t(
          "NUMERO DE PAGO"
        )} : ${id}`}</h1>
        <div className="h-full w-[50%] text-yellow-300 flex flex-col items-end pr-[50px] justify-center">
        <h1>
             {date.split("T")[0]} 
          </h1>
          <h1>
            Pago {status}
          </h1>
          
        <h1>
        Monto:{" "}
            {`$ ${Math.floor(amount * .00118963)}`}
        </h1>
        </div>
      </div>

      <div>
        {data &&
          data.courses &&
          data.courses.map((element) => (
            <ListPaymentCard
              key={element._id}
              language={element.language}
              level={element.level}
              price={element.price}
              duration={element.duration}
              img={element.image}
              schedule = {element.schedule}
            />
          ))}
          {data &&
          data._id &&
          (
            <ListPaymentCard
              key={data._id}
              language={data.language}
              level={data.level}
              price={data.price}
              duration={data.duration}
              img={data.image}
              schedule = {data.schedule}
            />
          )}
      </div>

      {/* <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full w-[20%]">
          <div className="w-full h-[150px] bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-[17px] text-black">{`${t("TOTAL PAGO")} :`}</h1>
            <h1 className="text-[40px] text-black">{`$ ${Math.floor(
              amount * 0.00026
            )}`}</h1>
          </div>
          <div className="w-full h-[150px] bg-gray-100 flex flex-col items-center justify-center">
            <h1 className="text-[17px] text-black">
              {t("ESTADO DEL PAGO")}
              {" : "}
            </h1>
            <h1 className="text-[25px] text-black">
              {t(`STATUS_${status?.toUpperCase()}`)}
            </h1>
          </div>
        </div> */}
      {/* <div className="w-[60%] h-full bg-white grid grid-cols-2 items-center justify-center">
            <div className="flex pl-[30px] justify-evenly flex-col w-full h-full">
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("IDIOMA CURSO")}
                {" : "}
                {t(`LANGUAGE_${course?.language?.toUpperCase()}`)}
              </h1>
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("DURACION_DE")}
                {" : "}
                {t(`DURACION_${course?.duration?.toUpperCase()}`)}
              </h1>
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("NIVEL")}
                {" : "}
                {t(`NIVEL_${course?.level?.toUpperCase()}`)}
              </h1>
            </div>
            <div className="flex justify-evenly flex-col w-full h-full">
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("HORARIOS")}
                {" : "}
                {t(`SCHEDULE_${course?.schedule?.toUpperCase()}`)}
              </h1>
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("UBICACION")}
                {" : "}
                {course?.location}
              </h1>
              <h1 className="text-[20px] ml-[10px] text-black">
                {t("FECHA DE PAGO")}
                {" : "}
                {date.split("T")[0]}
              </h1>
            </div>
          </div> */}
    </div>
  );
}
