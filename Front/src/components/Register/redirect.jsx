import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { useEffect } from "react";

export default function Redirect() {
  const navigate = useNavigate();
  const [userData, setUserData] = useLocalStorage("userData", {});

  useEffect(() => {
    if (userData.isAuthenticated) {
      navigate(userData.profile === "admin" ? "/admindashboard" : "/user/home");

      return;
    }

    navigate("/");
  }, []);

  return (
    <div className="w-full h-[90vh] flex flex-col items-center justify-center mt-[80px]">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <h1 className="text-[50px] text-gray-700 mt-[50px]">Redirigiendo...</h1>
    </div>
  );
}
