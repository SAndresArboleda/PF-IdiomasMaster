import { FaCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { idProduct } from "./userData";
import { adminProduct } from "../../redux/action/actions";

export default function ProductCard({
  id,
  type,
  cost,
  status,
  date,
  index,
  updated,
  finish,
  setSettings,
  students
}) {
  const dispatch = useDispatch();

  let create = "";

  if (updated) {
    create = updated.toString();
  }

  const handleClick = async () => {
    const response = await idProduct(id);

    if (response.data) {
      dispatch(adminProduct(response.data));

      setSettings.setSettings();
    }
  };

  return (
    <div className="w-full h-[35px] border-[1px] border-[#151139] flex flex-row hover:bg-[#4f4986]">
      <div className="h-full w-[5%]  bg-[#151139] flex items-center justify-center text-white">
        <h1 className=" text-[14px] font-light text-white">{index}</h1>
      </div>
      <div className="h-full w-[18%]  flex items-center justify-start">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{id}</h1>
      </div>
      <div className="h-full w-[12%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {create.split("T")[0]}
        </h1>
      </div>
      <div className="h-full w-[10%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{type}</h1>
      </div>
      <div className="h-full w-[7%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{cost}</h1>
      </div>
      <div className="h-full w-[7%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{students.length}</h1>
      </div>
      {status ? (
        <div className="h-full w-[11%]  flex flex-row items-center justify-center ">
          <div className="h-full w-[40%]  flex flex-row items-center justify-center ">
            <h1 className="ml-[20px] text-[14px] font-light text-white">
              Activo
            </h1>
          </div>
          <FaCircle className="text-[10px] ml-[15px] text-green-400" />
        </div>
      ) : (
        <div className="h-full w-[11%]  flex flex-row items-center justify-center">
          <div className="h-full w-[40%]  flex flex-row items-center justify-center ">
            <h1 className="ml-[20px] text-[14px] font-light text-white">
              Inactivo
            </h1>
          </div>
          <FaCircle className="text-[10px] ml-[15px] text-red-500" />
        </div>
      )}

      <div className="h-full w-[10%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {date.split("T")[0]}
        </h1>
      </div>
      <div className="h-full w-[10%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {finish.split("T")[0]}
        </h1>
      </div>
      <div className="h-full w-[10%] flex items-center justify-center ">
        <TfiWrite
          className="text-[20px] ml-[15px] text-white cursor-pointer"
          onClick={handleClick}
        />
      </div>
      
    </div>
  );
}
