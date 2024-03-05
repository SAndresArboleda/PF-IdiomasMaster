import { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { deleteUser } from "../Admin/userData";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { t } from "i18next";

export default function DangerZone() {
  const { logout } = useAuth0();
  const [userData, setUserDataLocally] = useLocalStorage("userData");
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: t("ESTAS_SEGURO"),
      text: t("QUIERES_CERRAR_SESION"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("CERRAR_SESION"),
      cancelButtonText: t("CERRAR"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUser({
          id: userData._id,
          email: data.email,
          password: data.password,
        });

        if (response.status) {
          setUserDataLocally({});
          logout({ logoutParams: { returnTo: window.location.origin } }).then(
            () => {
              navigate("/");
            }
          );
        } else {
          Swal.fire({
            icon: "error",
            title: `${response.response.data.message}`,
            text: `Vuelva a Intentarlo`,
          });
        }
      }
    });
  };

  const buttonDisable = () => {
    if (data.email.length > 5 && data.password.length > 5) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="w-full h-[20%] flex flex-row items-center justify-center">
        <h1 className="text-[50px] text-gray-700"> {t("ZONA PELIGRO")}</h1>
        <CgDanger className="text-[70px] ml-[20px] text-gray-700" />
      </div>
      <div className="w-[95%] h-[20%] bg-sky-700 flex flex-row items-center justify-center px-[20px]">
        <h1 className="text-[20px] text-white">
          {" "}
          {t("EN ESTA SECCIÓN, PODRÁS DESACTIVAR TU CUENTA")}
        </h1>
      </div>
      <div className="w-[60%] h-[55%] grid grid-rows-4">
        <div className="w-full h-full bg-white flex items-center justify-center text-[20px] border-b-[2px] border-red-700 text-gray-700 ">
          <h1>{t("INGRESA TUS DATOS PARA DESATIVAR TU CUENTA")}</h1>
        </div>
        <div className="w-full h-full bg-white flex items-center justify-center text-[20px]">
          <div className=" w-full h-[70%] flex flex-col items-center justify-center">
            <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden border-2 border-red-700">
              <div className="w-[20%] h-full bg-red-700 flex items-center justify-center">
                <MdEmail className="text-[40px] text-white" />
              </div>

              <input
                className="text-black w-[80%] h-full pl-[20px] text-[20px]  overflow-hidden"
                onChange={handleChange}
                name="email"
                placeholder={t("INGRESA EMAIL")}
                id="email"
                type="email"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-white flex items-center justify-center text-[20px]">
          <div className=" w-full h-[70%] flex flex-col items-center justify-center">
            <div className="h-[80%] w-[90%] rounded-[10px] bg-purple-500 flex flex-row overflow-hidden border-2 border-red-700">
              <div className="w-[20%] h-full bg-red-700 flex items-center justify-center">
                <RiLockPasswordLine className="text-[40px] text-white" />
              </div>

              <input
                className="text-black w-[80%] h-full pl-[20px] text-[20px]"
                onChange={handleChange}
                placeholder={t("INGRESA CONTRASEÑA")}
                name="password"
                id="password"
                type="password"
              />
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-red-700 flex items-center justify-center text-[20px] rounded-b-[10px]">
          <button
            className="w-[200px] h-[50px] bg-white rounded-[10px] hover:bg-yellow-400 disabled:opacity-30 disabled:cursor-not-allowed"
            onClick={handleDelete}
            disabled={buttonDisable()}
          >
            {t("DESACTIVAR CUENTA")}
          </button>
        </div>
      </div>
    </div>
  );
}
