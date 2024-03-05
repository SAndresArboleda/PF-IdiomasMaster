import React, { useEffect, useState } from "react";
import validation from "../CourseForm/validation";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoSearchCircle } from "react-icons/io5";
import { idProduct, putProduct } from "./userData";
import { FaCircle } from "react-icons/fa";
import { adminProduct } from "../../redux/action/actions";
import { FaSearchPlus } from "react-icons/fa";
import Swal from "sweetalert2";
export default function AdminSettingProduct() {
  const initialCourseState = {
    language: "",
    level: "",
    price: "",
    duration: "",
    schedule: "",
    start_time: "",
    finish_time: "",
    location: "",
    image: "",
    status: true,
  };

  const data = useSelector((state) => state.adminProduct);

  const [course, setCourse] = useState(initialCourseState);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      const {
        _id,
        language,
        level,
        price,
        duration,
        schedule,
        location,
        image,
        status,
        start_time,
        finish_time,
      } = data;

      setCourse({
        _id,
        language,
        level,
        price,
        duration,
        schedule,
        location,
        image,
        status,
        start_time,
        finish_time,
      });

      setImagePreview(image);
    }
  }, []);

  const resetForm = () => {
    setCourse(initialCourseState);
    setErrors({});
    setSuccessMessage("");
    setImagePreview(null);
  };

  const handleFetch = async (event) => {
    event.preventDefault();

    try {
      const response = await idProduct(searchTerm);

      if (response.data) {
        setCourse(response.data);
        setImagePreview(response.data.image);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El id no corresponde a ningún producto',
        });
      }

      setSearchTerm("");
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'El id no corresponde a ningún producto',
        text: 'Verifique el id proporcionado e intente nuevamente',
      });
    }
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleStartDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      start_time: date,
    }));
  };

  const handleEndDateChange = (date) => {
    setCourse((prevCourse) => ({
      ...prevCourse,
      finish_time: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "status" ? value === "true" : value === "false" ? false : value;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: newValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCourse((prevCourse) => ({
          ...prevCourse,
          image: reader.result,
        }));
        setImagePreview(reader.result); // Establecer la vista previa de la imagen
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation(course);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        await putProduct({
          id: course._id,
          language: course.language,
          level: course.level,
          price: course.price,
          duration: course.duration,
          schedule: course.schedule,
          location: course.location,
          image: course.image,
          status: course.status,
          start_time: course.start_time,
          finish_time: course.finish_time,
        });
        Swal.fire({
          icon: 'success',
          title: '¡Curso modificado con éxito!',
          showConfirmButton: false,
          timer: 2000,
        })
        resetForm();
        dispatch(adminProduct({}));
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error,
        })
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col border-[#151139] border-[1px] overflow-croll">
      <div className="w-full h-[40px] bg-[#151139]  flex flex-row items-center">
        <p className=" text-white ml-6 text-[20px]">
          Busca & Configura un Producto
        </p>
      </div>
      <div className="w-full h-[20%] bg-[#151139]  flex flex-row ">
        <div className="h-full w-[40%] ">
          <div className="w-full h-full pl-[20px] bg-[#151139] flex flex-row items-center">
            <input
              placeholder="Busca Producto por ID"
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

        {course._id && course._id.length > 0 && (
          <div className="h-full w-[60%] flex items-center justify-center bg-[#373a6c] ">
            <div className="h-full w-[50%] flex items-center justify-center">
              <h1 className="text-yellow-500 text-[18px]">{`ID Producto: ${course._id}`}</h1>
            </div>

            <div className="h-full w-[50%] flex items-center justify-center">
              <div className="h-full w-[90%]  flex flex-row items-center justify-center">
                <select
                  id="status"
                  name="status"
                  value={course.status}
                  onChange={handleChange}
                  required
                  className="h-10 w-[40%] border mt-1 rounded px-4 bg-gray-50"
                >
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </select>
                {course.status ? (
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

      {course._id && course._id.length ? (
        <>
          <form
            onSubmit={handleSubmit}
            className="bg-[#282a54] w-full h-[96%] grid grid-cols-3 gap-[5px] p-[5px]"
          >
            <div className="bg-[#282a54] w-full h-full grid grid-rows-4 gap-[5px] rounded-[10px]">
              <div className="w-full h-full pl-[20px] rounded-[10px] bg-[#373a6c] ">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Lenguaje
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    id="language"
                    name="language"
                    value={course.language}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione un idioma</option>
                    <option value="Ingles">Inglés</option>
                    <option value="Frances">Francés</option>
                    <option value="Aleman">Alemán</option>
                    <option value="Italiano">Italiano</option>
                    <option value="Holandes">Holandés</option>
                    <option value="Portugues">Portugués</option>
                  </select>
                </div>
                <div className="w-full h-[25%] flex items-center">
                  {errors.language && (
                    <p className="text-red-500">{errors.language}</p>
                  )}
                </div>
              </div>
              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="level" className="text-white text-[18px]">
                    Nivel
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    id="level"
                    name="level"
                    value={course.level}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione un nivel</option>
                    <option value="Principiante">Principiante</option>
                    <option value="Intermedio">Intermedio</option>
                    <option value="Avanzado">Avanzado</option>
                  </select>
                </div>
                <div className="w-full h-[25%] flex items-center">
                  {errors.level && (
                    <p className="text-red-500">{errors.level}</p>
                  )}
                </div>
              </div>

              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Precio
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={course.price}
                    onChange={handleChange}
                    required
                    placeholder="Precio entre 25 y 500 USD"
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  />
                </div>
                <div className="w-full h-[25%] flex items-center">
                  {errors.price && (
                    <p className="text-red-500">{errors.price}</p>
                  )}
                </div>
              </div>
              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="language" className="text-white text-[18px]">
                    Duración
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    id="duration"
                    name="duration"
                    value={course.duration}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione una duración</option>
                    <option value="1 Mes">1 Mes</option>
                    <option value="2 Meses">2 Meses</option>
                    <option value="3 Meses">3 Meses</option>
                    <option value="4 Meses">4 Meses</option>
                  </select>
                </div>
                <div className="w-full h-[25%] flex items-center">
                  {errors.duration && (
                    <p className="text-red-500">{errors.duration}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-[#282a54] w-full h-full grid grid-rows-4 gap-[5px] rounded-[10px]">
              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label htmlFor="schedule" className="text-white text-[18px]">
                    Horario
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    id="schedule"
                    name="schedule"
                    value={course.schedule}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione un horario</option>
                    <option value="Fines de semana">Fines de semana</option>
                    <option value="Durante la semana">Durante la semana</option>
                    <option value="Lunes, Miércoles, Viernes">
                      Lunes, Miércoles, Viernes
                    </option>
                    <option value="Martes, Jueves">Martes, Jueves</option>
                  </select>
                </div>
                <div className="w-full h-[25%] flex items-center"></div>
              </div>

              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label
                    htmlFor="start_time"
                    className="text-white text-[18px]"
                  >
                    Ubicacion
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <select
                    type="text"
                    id="location"
                    name="location"
                    value={course.location}
                    onChange={handleChange}
                    required
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                  >
                    <option value="">Seleccione Pais Inscrito</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Bélgica">Bélgica</option>
                    <option value="Brasil">Brasil</option>
                    <option value="Canadá">Canadá</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Dinamarca">Dinamarca</option>
                    <option value="España">España</option>
                    <option value="Estados_Unidos">Estados Unidos</option>
                    <option value="Francia">Francia</option>
                    <option value="Irlanda">Irlanda</option>
                    <option value="Italia">Italia</option>
                    <option value="Noruega">Noruega</option>
                    <option value="Holanda">Holanda</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Suecia">Suecia</option>
                    <option value="Suiza">Suiza</option>
                  </select>
                </div>
                <div className="w-full h-[25%] flex items-center"></div>
              </div>

              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label
                    htmlFor="start_time"
                    className="text-white text-[18px]"
                  >
                    Fecha de inicio
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <DatePicker
                    id="start_date"
                    type="date"
                    selected={course.start_time}
                    onChange={handleStartDateChange}
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                    dateFormat="dd/MM/yyyy"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="w-full h-[25%] flex items-center"></div>
              </div>
              <div className="w-full h-full bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[25%] flex items-center">
                  <label
                    htmlFor="start_time"
                    className="text-white text-[18px]"
                  >
                    Fecha de Finalizacion
                  </label>
                </div>
                <div className="w-full h-[50%] flex items-center">
                  <DatePicker
                    id="end_date"
                    type="date"
                    selected={course.finish_time}
                    onChange={handleEndDateChange}
                    className="h-10 w-[90%] border mt-1 rounded px-4 bg-gray-50"
                    dateFormat="dd/MM/yyyy"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="w-full h-[25%] flex items-center"></div>
              </div>
            </div>
            <div className="bg-[#282a54] w-full h-full flex flex-col gap-[5px] rounded-[10px]">
              <div className="w-full h-[75%] bg-[#373a6c] pl-[20px] rounded-[10px]">
                <div className="w-full h-[10%] flex items-center">
                  <label htmlFor="duration" className="text-white text-[18px]">
                    Imagen
                  </label>
                </div>
                <div className="w-full h-[20%] flex items-center">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-[90%] h-[75%] text-white flex flex-col"
                  />
                </div>
                <div className="w-full h-[60%] flex items-center justify-center overflow-hidden ">
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-[250px] max-w-full"
                    />
                  )}
                </div>
              </div>
              <div className="w-full h-[25%] bg-[#373a6c] pl-[20px] rounded-[10px]">

                <div className="w-full h-full flex items-center justify-center">
                  <button
                    type="submit"
                    className="w-[250px] h-[50px] bg-white hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded"
                  >
                    Actualiza Producto
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>
          <div className=" w-full h-full rounded-[10px] items-center justify-center flex">
            <h1 className="text-yellow-500 text-[40px]">Busca un Producto</h1>
            <FaSearchPlus className="text-white text-[40px] ml-[30px]" />
          </div>
        </>
      )}
    </div>
  );
}
