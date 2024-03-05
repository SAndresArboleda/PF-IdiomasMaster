import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import { idUser, putUser } from "../Admin/userData";
import { PiNotePencilBold } from "react-icons/pi";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const ProfileSection = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useLocalStorage("userData", {});
  const [imagePreview, setImagePreview] = useState(null);
  const { t , i18n} = useTranslation()

  const defaultAvatarUrl =
    "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0=";
  const [editedData, setEditedData] = useState({});

  const buttonDisable = () => {
    if (
      editedData.name === userData.name &&
      editedData.lastname === userData.lastname &&
      editedData.email === userData.email &&
      parseInt(editedData.age) === userData.age &&
      !userData.img &&
      !editedData.img &&
      editedData.password.length < 7
    ) {
      return true;
    } else if (
      editedData.name === userData.name &&
      editedData.lastname === userData.lastname &&
      editedData.email === userData.email &&
      parseInt(editedData.age) === userData.age &&
      !userData.img &&
      editedData.img
    ) {
      return false;
    } else if (
      editedData.name === userData.name &&
      editedData.lastname === userData.lastname &&
      editedData.email === userData.email &&
      parseInt(editedData.age) === userData.age &&
      userData.img &&
      userData.img === imagePreview &&
      editedData.password.length < 7
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setEditedData((prevCourse) => ({
          ...prevCourse,
          img: reader.result,
        }));
        setImagePreview(reader.result);
      };
    }
  };

  useEffect(() => {
    const fecthUser = async () => {
      const response = await idUser(userData._id);

      if (response.data) {
        console.log(response.data);
        setEditedData({
          ...editedData,
          id: response.data._id,
          name: response.data.name,
          lastname: response.data.lastname,
          email: response.data.email,
          age: response.data.age,
          password:""
        });
        setImagePreview(response.data?.img || defaultAvatarUrl);
      }
    };
    fecthUser();
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await putUser({
        id: editedData.id,
        name: editedData.name,
        lastname: editedData.lastname,
        email: editedData.email,
        img: editedData.img,
        password: editedData.password,
        age: editedData.age,
      });

      console.log("hola respoesta----<",response)

      if(response._id){
console.log("SI QUEDAAA")
        setUserData({
          ...response,
          isAuthenticated: true,
        })
      }

      Swal.fire({
        icon: 'success',
        title: t("USUARIO ACTUALIZADO"),
        showConfirmButton: false,
        timer: 2300, // La alerta se cerrará automáticamente después de 1.5 segundos
      });
    } catch (error) {
      console.error("Error al actualizar el curso:", error.message);
      Swal.fire({
        icon: 'error',
        title: t("ERROR AL MODIFICAR USUARIO"),
        text: error.message // Puedes mostrar el mensaje de error específico si lo proporciona la función de registro
      });
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    (isAuthenticated || Object.keys(userData).length > 0) && (
      <div className="flex flex-rows w-full h-full gap-8 items-center">
        <div className=" w-[60%] h-[90%] grid grid-rows-5 overflow-hidden items-center justify-center">
          <div className="h-[80%] w-full bg-white flex flex-row rounded-[10px] overflow-hidden border-[1px] border-[#2d53d9]">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[18px] ml-[50px] text-white">{t("NOMBRE")}</h1>
            </div>
            <div className="w-[70%] h-[full] flex items-center justify-evenly">
              <input
                type="text"
                id="first_name"
                name="name"
                className={`h-10 w-[45%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white" ${
                  user?.sub.includes("google") &&
                  "opacity-50 cursor-not-allowed"
                }`}
                placeholder= {t("INGRESA NOMBRE")}
                value={editedData.name}
                onChange={handleInputChange}
                required
                readOnly={user?.sub.includes("google")}
              />
              <input
                type="text"
                id="last_name"
                name="lastname"
                className={`h-10 w-[45%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white" ${
                  user?.sub.includes("google") &&
                  "opacity-50 cursor-not-allowed"
                }`}
                placeholder={t("INGRESA APELLIDO")}
                value={editedData.lastname}
                onChange={handleInputChange}
                required
                readOnly={user?.sub.includes("google")}
              />
            </div>
          </div>
          <div className="h-[80%] w-full bg-white flex flex-row rounded-[10px] overflow-hidden border-[1px] border-[#2d53d9]">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[18px] ml-[50px] text-white">{t("EMAIL")}</h1>
            </div>
            <div className="w-[70%] h-[full] flex items-center justify-evenly">
              <input
                type="email"
                id="email"
                name="email"
                className={`h-10 w-[90%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"  ${
                  user?.sub.includes("google") &&
                  "opacity-50 cursor-not-allowed"
                }`}
                placeholder= {t("INGRESA TU EMAIL PARA MODIFICARLO")}
                value={editedData.email}
                onChange={handleInputChange}
                required
                readOnly={user?.sub.includes("google")}
              />
            </div>
          </div>
          <div className="h-[80%] w-full bg-white flex flex-row rounded-[10px] overflow-hidden border-[1px] border-[#2d53d9]">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[18px] ml-[50px] text-white">{t("CONTRASEÑA")}</h1>
            </div>
            <div className="w-[70%] h-[full] flex items-center justify-evenly">
              <input
                type="password"
                id="password"
                name="password"
                className={`h-10 w-[90%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white" ${
                  user?.sub.includes("google") &&
                  "opacity-50 cursor-not-allowed"
                }`}
                placeholder={t("INGRESA TU NUEVA CONTRASEÑA")}
                value={editedData.password}
                onChange={handleInputChange}
                required
                readOnly={user?.sub.includes("google")}
              />
            </div>
          </div>
          <div className="h-[80%] w-[60%] bg-white flex flex-row rounded-[10px] overflow-hidden border-[1px] border-[#2d53d9]">
            <div className="w-[52%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[18px] ml-[50px] text-white">{t("EDAD")}</h1>
            </div>
            <div className="w-[50%] h-[full] flex items-center justify-evenly">
              <input
                type="age"
                id="age"
                name="age"
                className="h-10 w-[90%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"
                placeholder= {t("INGRESA TU NUEVA EDAD")}
                value={editedData.age}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="h-full w-full  bg-[#2d53d9] flex items-center justify-center flex-row rounded-b-[10px] overflow-hidden ">
            <button
            disabled={buttonDisable()}
              type="submit"
              onClick={handleSubmit}
              className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-[10px] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {t("GUARDAR")}
            </button>
          </div>
        </div>
        <div className="w-[40%] h-[90%] flex flex-col items-start relative ">
          <div className="flex flex-col w-full h-[70%] items-center">
            <div className="flex flex-col w-full h-[70%] items-center justfify-center">
              <img
                className="object-fit w-[250px] h-[250px] rounded-[250px] border-[1px] border-gray-200"
                src={imagePreview}
                alt="Bordered avatar"
              />
            </div>

            <div className="flex flex-row w-full h-[20%] items-center justify-evenly">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="file-input"
              />
              {!user?.sub.includes("google") && (
                <label
                  htmlFor="file-input"
                  className="w-[150px] h-[50px] border-2 border-black/30 hover:bg-yellow-400 text-black font-bold  rounded-[10px] cursor-pointer flex items-center justify-center"
                >
                  {t("CAMBIAR FOTO")}
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileSection;
