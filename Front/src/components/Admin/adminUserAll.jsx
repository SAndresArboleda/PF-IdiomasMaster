import { useEffect, useState } from "react";
import { usersData } from "./userData";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";

export default function AdminUserAll({ setSettings, setInfo }) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await usersData();

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
        <div className="h-full w-[22%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Id Usuario</h1>
        </div>
        <div className="h-full w-[10%]  bg-[#151139] flex items-center justify-center text-white ">
          <h1>Nombre</h1>
        </div>
        <div className="h-full w-[15%]  bg-[#151139]  flex items-center justify-center text-white">
          <h1>Apellido</h1>
        </div>
        <div className="h-full w-[12%] bg-[#151139]  flex items-center justify-center text-white">
          <h1>Tipo</h1>
        </div>
        <div className="h-full w-[12%] bg-[#151139] flex items-center justify-center text-white">
          <h1>Estado</h1>
        </div>
        <div className="h-full w-[12%]  bg-[#3b3194]  flex items-center justify-center text-white">
          <h1>Actualizar</h1>
        </div>
        <div className="h-full w-[12%]  bg-[#3b3194]  flex items-center justify-center text-white">
          <h1>Informacion</h1>
        </div>
      </div>
      <div className="bg-[#282a54] w-full h-[96%] max-h-[637px] overflow-y-scroll ">
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <UserCard
              key={element._id}
              index={index + 1}
              id={element._id}
              type={element.profile}
              name={element.name}
              lastname={element.lastname}
              email={element.email}
              status={element.status}
              setSettings={{ setSettings }}
              setInfo = {{setInfo}}
            />
          ))}
      </div>
    </div>
  );
}
