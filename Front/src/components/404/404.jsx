import { useLocation } from "react-router-dom";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect, useState } from "react";
import Redirect from "../Register/redirect";

export default function Error404() {
  const location = useLocation();
  const [userData] = useLocalStorage("userData", {});
  const [componente, setComponente] = useState(null);

  const ErrorComponent = (
    <div className="w-full h-[90vh] flex flex-col items-center mt-[80px]">
      <div className="w-full h-[30%] flex flex-col items-center justify-center">
        <div className="w-[120px] h-[120px]">
          <img
            src="img/logo4.png"
            alt="logo_master"
            className="w-full h-full bg-black"
          />
        </div>
        <div className="w-full h-[50%] flex items-center justify-center">
          <h1 className="text-[50px] font-bold">Oops, Página No Encontrada</h1>
        </div>
      </div>
      <div className="w-full h-[50%] flex flex-row items-center justify-center relative overflow-hidden">
        <h1 className="error1">4</h1>
        <h1 className="error2">0</h1>
        <h1 className="error3">4</h1>
      </div>
      <div className="w-full h-[20%] flex items-center justify-center">
        <h1 className="text-[50px] font-bold">
          Lo Sentimos, la página buscada no Existe
        </h1>
      </div>
    </div>
  );


  useEffect(() => {
    if (!userData.isAuthenticated && !userData.email) {
      if (
        location.pathname !== "/" &&
        location.pathname !== "/home" &&
        location.pathname !== "/detail/:id" &&
        location.pathname !== "/search" &&
        location.pathname !== "/redirect"
       
      ) {
        setComponente(ErrorComponent);
      }
    } else {
      if (
        userData.isAuthenticated &&
        userData.profile === "admin" &&
        location.pathname !== "/admindashboard" &&
        location.pathname !== "/admindashboard/products" &&
        location.pathname !== "/admindashboard/users" &&
        location.pathname !== "/admindashboard/notifications" &&
        location.pathname !== "/admindashboard/settings"
      ) {
        setComponente(ErrorComponent);
      } else if (
        userData.isAuthenticated &&
        userData.profile === "user" &&
        location.pathname !== "/home" &&
        location.pathname !== "/detail/:id" &&
        location.pathname !== "/search" &&
        location.pathname !== "/configuracion" &&
        location.pathname !== "/user/home" &&
        location.pathname !== "/favorite" &&
        location.pathname !== "/cart" &&
        location.pathname !== "/Chat"
      ) {
        setComponente(ErrorComponent);
      }
    }
  }, []);

  

  return componente;
}
