import { useState } from "react";
import AdminProductsAll from "./adminProductsAll";
import AdminAddProduct from "./adminAddProduct";
import AdminSettingProduct from "./adminSettingProduct";
import { useDispatch } from "react-redux";
import { adminProduct, adminUser } from "../../redux/action/actions";
import AdminUserAll from "./adminUserAll";
import AdminSettingUser from "./adminSettingUser";
import AdminInfoUser from "./adminUserInfo";

export default function AdminUsers() {

  const dispatch = useDispatch()

  const [options, setOptions] = useState({
    main: true,
    setting: false,
    info: false,
  });

  const handleClick = (element) => {
    const updatedOptions = {
      main: false,
      setting: false,
      info: false,
      [element]: true,
    };
    setOptions(updatedOptions);
    dispatch(adminUser())

  };

  const setSettings = () => {

    const updatedOptions = {
      main: false,
      setting: true,
      info: false,
    };
    setOptions(updatedOptions);

  }

  const setInfo = () => {

    const updatedOptions = {
      main: false,
      setting: false,
      info: true,
    };
    setOptions(updatedOptions);

  }

  return (
    <div className="h-[90vh] w-full bg-[#f1f1f1] flex items-center justify-center">
      <div className="h-[85%] w-[85%] flex flex-col">
        <div className="w-full h-[8%] flex items-center pl-[40px] justify-between">
          <div className="h-full w-[20%]">
            <h1 className="text-gray-800 text-[30px]">Usuarios</h1>
          </div>
          <div className="bg-[#151139] w-[500px] h-full flex flex-row">
            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.main ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("main")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.main ? "text-white" : "text-black"
                }`}
              >
                Mis Usuarios
              </h1>
            </div>

            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.setting ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("setting")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.setting ? "text-white" : "text-black"
                }`}
              >
                Config Usuarios
              </h1>
            </div>
            <div
              className={`h-full w-[34%] flex items-center justify-center cursor-pointer group ${
                options.info? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("info")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.info ? "text-white" : "text-black"
                }`}
              >
                Info Usuario
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[90%] bg-[#292b54]">
          {options.main ? <AdminUserAll setSettings={setSettings} setInfo={setInfo} /> : null}
          {options.setting ? <AdminSettingUser /> : null}
          {options.info ? <AdminInfoUser  /> : null}
        </div>
      </div>
    </div>
  );
}
