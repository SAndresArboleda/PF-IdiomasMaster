import { GrVmMaintenance } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdminOptions from "./adminOptions";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";



export default function AdminNavbar() {
  const [userData] = useLocalStorage("userData", {});
  const [options, setOptions] = useState(false)


  const handleOptions = () => {

    if(!options){
      setOptions(true)
    } else {
      setOptions(false)
    }
  }

  return (
    <div className="flex h-[80px] z-20  top-0 w-full items-center justify-between text-white bg-[#2d53d9] relative  " >
      <div className="flex h-full w-[320px] items-center ml-[30px]">
        <GrVmMaintenance className="text-[40px]" />
        <h1 className="text-[25px] ml-[25px]">Idiomas Master</h1>
      </div>
      <div className="flex h-full w-[950px]  items-center justify-evenly">
        <Link to ="/admindashboard" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdDashboard className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">General</h1>
        </Link>
        <Link to="/admindashboard/products" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaStore className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Productos</h1>
        </Link>
        <Link to="/admindashboard/users" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <FaUsers className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Usuarios</h1>
        </Link>
        <Link to="/admindashboard/notifications"  className="relative flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <MdNotificationsActive className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">
            Notificaciones
          </h1>

        </Link>
        <Link to="/admindashboard/settings" className="flex h-full w-[20%] items-center justify-evenly group hover:bg-white cursor-pointer transition-colors duration-300 ease-in-out">
          <IoMdSettings className="text-[30px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out" />
          <h1 className="text-[20px] group-hover:text-[#2d53d9] transition-colors duration-300 ease-in-out cursor-pointer">Configuracion</h1>
        </Link>
      </div>
      <div className="flex h-full w-[270px] items-center justify-between mr-[20px] cursor-pointer" onClick={handleOptions}>
        <h1 className="text-[18px] text-yellow-400 transition-colors duration-300 ease-in-out ml-[15px]">{userData && userData.email ? `${userData.email}` : null}</h1>
        <RiUserSettingsFill className="text-[40px] transition-colors duration-300 ease-in-out " />
      </div>
      {options?
    (<AdminOptions/>):null  
    }
    </div>
  );
}
