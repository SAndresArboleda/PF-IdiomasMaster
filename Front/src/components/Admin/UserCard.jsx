import { FaCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { idUser } from "./userData";
import { useDispatch } from "react-redux";
import { adminUser } from "../../redux/action/actions";
import { FiInfo } from "react-icons/fi";

export default function UserCard({
  index,
  id,
  type,
  name,
  email,
  status,
  setSettings,
  lastname,
  profile,
  setInfo
}) {
  const dispatch = useDispatch();

  const handleClick = async () => {
    const response = await idUser(id);

    if (response.data) {
      dispatch(adminUser(response.data));
      setSettings.setSettings();
    }
  };

  const handleInfo = async () => {
    const response = await idUser(id);

    if (response.data) {
      dispatch(adminUser(response.data));
      setInfo.setInfo();
    }
  };
  return (
    <div className="w-full h-[35px] border-[1px] border-[#151139] flex flex-row hover:bg-[#4f4986]">
      <div className="h-full w-[5%]  bg-[#151139] flex items-center justify-center text-white">
        <h1 className=" text-[14px] font-light text-white">{index}</h1>
      </div>
      <div className="h-full w-[22%]  flex items-center justify-start">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{id}</h1>
      </div>
      <div className="h-full w-[10%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{name}</h1>
      </div>
      <div className="h-full w-[15%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {lastname}
        </h1>
      </div>
      <div className="h-full w-[12%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{type}</h1>
      </div>
      {status ? (
        <div className="h-full w-[12%]  flex flex-row items-center justify-center ">
          <div className="h-full w-[40%]  flex flex-row items-center justify-center ">
            <h1 className="ml-[20px] text-[14px] font-light text-white">
              Activo
            </h1>
          </div>
          <FaCircle className="text-[10px] ml-[15px] text-green-400" />
        </div>
      ) : (
        <div className="h-full w-[12%]  flex flex-row items-center justify-center">
          <div className="h-full w-[40%]  flex flex-row items-center justify-center ">
            <h1 className="ml-[20px] text-[14px] font-light text-white">
              Inactivo
            </h1>
          </div>
          <FaCircle className="text-[10px] ml-[15px] text-red-500" />
        </div>
      )}

      <div className="h-full w-[12%] flex items-center justify-center ">
        <TfiWrite
          className="text-[20px] ml-[15px] text-white cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="h-full w-[12%] flex items-center justify-center ">
        <FiInfo
          className="text-[20px] ml-[15px] text-white cursor-pointer"
          onClick={handleInfo}
        />
      </div>
    </div>
  );
}
