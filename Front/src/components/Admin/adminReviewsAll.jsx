import { useEffect, useState } from "react";
import { reviewData, usersData } from "./userData";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import ReviewCard from "./reviewCard";

export default function AdminReviewsAll({ setSettings }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await reviewData();

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
          <h1>ID Reseña</h1>
        </div>
        <div className="h-full w-[15%]  bg-[#151139] flex items-center justify-center text-white ">
          <h1>Fecha Creacion</h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Valoracion</h1>
        </div>
        <div className="h-full w-[17%] bg-[#151139]  flex items-center justify-center text-white">
          <h1>Vista</h1>
        </div>
        <div className="h-full w-[17%] bg-[#151139] flex items-center justify-center text-white">
          <h1>Respuesta</h1>
        </div>
        <div className="h-full w-[16%]  bg-[#3b3194]  flex items-center justify-center text-white">
          <h1>Info</h1>
        </div>
      </div>
      <div className="bg-[#282a54] w-full h-[96%] max-h-[637px] overflow-y-scroll ">
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <ReviewCard
              key={element._id}
              index={index + 1}
              id={element._id}
              rating={element.rating}
              view={element.view}
              reply={element.reply}
              setSettings={{ setSettings }}
              date={element.updatedAt}
            />
          ))}
      </div>
    </div>
  );
}
