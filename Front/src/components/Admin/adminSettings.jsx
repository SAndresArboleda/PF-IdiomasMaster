import { useEffect, useState } from "react";
import { putUser } from "./userData";
import { useLocalStorage } from "../../CustomHook/UseLocalStorage";
import Swal from "sweetalert2";

export default function AdminSettings() {
  const initialUserState = {
    _id: "",
    name: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [userData, setUserData] = useLocalStorage("userData", {});

  useEffect(() => {
    setUser({
      _id: userData._id,
      name: userData.name,
      lastname: userData.lastname,
      email: userData.email,
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "status" ? value === "true" : value === "false" ? false : value;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await putUser({
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      });

      if (response._id) {
        setUserData({
          ...userData,
          name: response.name,
          lastname: response.lastname,
          email: response.email
        })
        Swal.fire({
          icon: "success",
          title: "Usuario modificado con éxito",
        });
      }
    } catch (error) {
      console.error("Error al actualizar el curso:", error.message);
    }
  };

  const handleDisable = () => {

    if(userData.name === user.name && userData.lastname === user.lastname && userData.email === user.email){

      return true
    }

    return false
  }
  return (
    <div className="h-[90vh] w-full bg-[#f1f1f1] flex items-center justify-center">
      <div className="h-[85%] w-[85%] flex flex-col">
        <div className="w-full h-[8%] flex items-center pl-[40px] justify-between">
          <div className="h-full w-[20%]">
            <h1 className="text-gray-800 text-[30px]">
              Configuracion Administrador
            </h1>
          </div>
        </div>
        <form
          className="w-[60%] h-[90%]  grid grid-rows-6 rounded-[10px] gap-[5px] overflow-hidden"
          
        >
          <div className="h-full w-full  bg-white flex flex-row rounded-[10px] overflow-hidden">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[20px] ml-[50px] text-white">Nombre</h1>
            </div>
            <div className="w-[70%] h-[full] flex items-center justify-evenly">
              <input
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="h-10 w-[45%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"
              ></input>
              <input
                id="lastname"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
                className="h-10 w-[45%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"
              ></input>
            </div>
          </div>
          <div className="h-full w-full  bg-white flex flex-row rounded-[10px] overflow-hidden">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[20px] ml-[50px] text-white">Email</h1>
            </div>
            <div className="w-[60%] h-[full] flex items-center justify-center">
              <input
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="h-10 w-[90%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"
              ></input>
            </div>
          </div>
          <div className="h-full w-full  bg-white flex flex-row rounded-[10px] overflow-hidden">
            <div className="w-[30%] h-[full] bg-[#2d53d9] flex items-center ">
              <h1 className="text-[20px] ml-[50px] text-white">Contraseña</h1>
            </div>
            <div className="w-[60%] h-[full] flex items-center justify-center">
              <input
                id="password"
                name="password"
                value={user.password}
                placeholder="Nuevo Password"
                onChange={handleChange}
                type="password"
                className="h-10 w-[90%] border-[2px] border-[#2d53d9] mt-1 rounded px-4 bg-white"
              ></input>
            </div>
          </div>

          <div className="h-full w-full  bg-[#2d53d9] flex items-center justify-center flex-row rounded-[10px] overflow-hidden">
            <button
              type="submit"
              className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={handleDisable()}
            >
              Actualizar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
