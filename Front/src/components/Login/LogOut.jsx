import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocalStorage } from '../../CustomHook/UseLocalStorage';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { useTranslation } from "react-i18next";


const LogoutButton = () => {
  const navigate = useNavigate()
  const { logout } = useAuth0();
  const [userData, setUserDataLocally] = useLocalStorage("userData");
  const { t , i18n} = useTranslation()


  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: t("ESTAS_SEGURO"),
      text: t("QUIERES_CERRAR_SESION"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t("CERRAR_SESION"),
      cancelButtonText: t("CERRAR"),
    }).then((result) => {
      if (result.isConfirmed) {
        logout({ logoutParams: { returnTo: window.location.origin } }).then(() => {
          setUserDataLocally({});

        });
      }
    });
  };
  


  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      <h1>{t("CERRAR_SESION")}</h1>
    </button>
  );
};

export default LogoutButton;
