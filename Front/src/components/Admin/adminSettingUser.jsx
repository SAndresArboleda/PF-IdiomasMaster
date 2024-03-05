import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import { adminProduct } from "../../redux/action/actions";
import { RiFileUserLine } from "react-icons/ri";
import { idUser, putUser } from "./userData";
import { FaSearchPlus } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AdminSettingUser() {
  const initialUserState = {
    profile: "",
    _id: "",
    name: "",
    lastname: "",
    email: "",
    status: true,
    img: "",
    password: "",
  };

  const data = useSelector((state) => state.adminUser);

  const [user, setUser] = useState(initialUserState);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      const { _id, name, lastname, email, status, img, profile, age } = data;

      setUser({
        _id,
        name,
        lastname,
        email,
        status,
        profile,
        age,
        img,
      });
    }
  }, []);

  const resetForm = () => {
    setUser(initialUserState);
    setErrors({});
    //setSuccessMessage("");
  };

  const handleFetch = async (event) => {
    event.preventDefault();

    try {
      const response = await idUser(searchTerm);

      if (response.data) {
        const { _id, name, lastname, email, status, img, profile, age } =
          response.data;

        setUser({
          _id,
          name,
          lastname,
          email,
          status,
          profile,
          age,
          img,
        });
        setSearchTerm("");

      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El id no corresponde a ningún producto",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El id no corresponde a ningún usuario",
      });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "status" ? value === "true" : value === "false" ? false : value;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await putUser({
        profile: user.profile,
        id: user._id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        status: user.status,
        img: user.img,
        password: user.password,
        age: user.age,
      });
      Swal.fire({
        icon: "success",
        title: "Usuario modificado con éxito",

      });
      resetForm();
      dispatch(adminProduct({}));
    } catch (error) {
      console.error("Error al actualizar el curso:", error.message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] overflow-croll">
      <div className="w-full h-[40px] bg-[#151139]  flex flex-row items-center">
        <p className=" text-white ml-6 text-[20px]">
          Busca & Actualiza Usuario
        </p>
      </div>
      <div className="w-full h-[20%] bg-[#151139]  flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Busca Usuario por ID"
              type="search"
              value={searchTerm}
              className="w-[400px] h-[40px]  rounded-lg text-black px-6 py-3 text-base hover:border-[#7aacfd] cursor-pointer transition mr-[15px]"
              onChange={handleSearch}
            />
            <IoSearchCircle
              className="text-[50px] text-white cursor-pointer transition-transform transform-gpu hover:shadow-white active:scale-95"
              type="submit"
              onClick={handleFetch}
            />
          </div>
        </div>

        {user._id && user._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`ID Usuario: ${user._id}`}</h1>
            </div>

            <div className="h-full w-[50%] flex items-center justify-center">
              <div className="h-full w-[90%]  flex flex-row items-center justify-center">
                <select
                  id="status"
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                  required
                  className="h-10 w-[40%] border mt-1 rounded px-4 bg-gray-50"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
                {user.status ? (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-green-400" />
                  </div>
                ) : (
                  <div className="h-full w-[30%]  flex flex-row items-center justify-center">
                    <FaCircle className="text-[20px] ml-[5px] text-red-500" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {user._id && user._id.length ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-[#282a54] w-full h-[96%] grid grid-cols-3 gap-[5px] p-[5px]"
          >
            <div className="bg-[#282a54] w-full h-full grid grid-rows-3 gap-[5px] rounded-[10px]">
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Nombre
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  ></input>
                </div>
              </div>
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Email
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  ></input>
                </div>
              </div>
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Tipo
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    id="profile"
                    name="profile"
                    value={user.profile}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione un Perfil</option>
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="bg-[#282a54] w-full h-full grid grid-rows-3 gap-[5px] rounded-[10px]">
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Apellido
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    id="lastname"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  ></input>
                </div>
              </div>
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Contraseña
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Nueva Contraseña"
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  ></input>
                </div>
              </div>
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Edad
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    id="age"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  ></input>
                </div>
              </div>
            </div>
            <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
              <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[10%] flex items-center">
                  <label htmlFor="duration" className="text-white text-[18px]">
                    Imagen
                  </label>
                </div>
                {user.img ? (
                  <div className="w-full h-[60%] flex items-center justify-center overflow-hidden ">
                    <img
                      src={user.img}
                      alt="Preview"
                      className="max-h-[250px] max-w-full"
                    />
                  </div>
                ) : (
                  <div className="w-full h-[70%] flex items-center justify-center overflow-hidden ">
                    <RiFileUserLine className="w-full h-full flex items-center justify-center overflow-hidden text-white " />
                  </div>
                )}
              </div>
              <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center justify-center">
                  <label
                    htmlFor="duration"
                    className="text-white text-[20px]"
                  ></label>
                </div>
                <div className="w-full h-[75%] flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
                  >
                    Actualizar Usuario
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className=" w-full h-full rounded-[10px] items-center justify-center flex">
            <h1 className="text-yellow-500 text-[40px]">Busca un Usuario</h1>
            <FaSearchPlus className="text-white text-[40px] ml-[30px]" />
          </div>
        </>
      )}
    </div>
  );
}
