import React, { useState } from "react";
import validation from "./validation";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postCourseData } from "../../redux/action/actions";
import "./CourseForm.css";

function CourseForm({ onSubmit }) {
  const [course, setCourse] = useState({
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
  });

  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
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
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(course);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log("Datos enviados al hacer clic:", course);
      dispatch(postCourseData(course));
      window.alert("El curso se ha creado exitosamente."); // Actualizar el mensaje de éxito
    }
  };

  return (
    <div className="">
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center containerCourse">
        <div className="ContainerForm">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-18 mb-0 ContainerFromInt">
              <h1 className=" Titulo font-semibold text-xl text-gray-600">
                Crear nuevo curso
              </h1>
              <p className="Subtitulo text-gray-500 mb-6">
                Completa el formulario, por favor.
              </p>
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600"></div>

                <p className="font-medium text-lg">Detalles del curso</p>
                <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="language">Lenguaje:</label>
                    <select
                      id="language"
                      name="language"
                      value={course.language}
                      onChange={handleChange}
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Seleccione un idioma</option>
                      <option value="English">Inglés</option>
                      <option value="French">Francés</option>
                      <option value="German">Alemán</option>
                      <option value="Italian">Italiano</option>
                      <option value="Dutch">Holandés</option>
                      <option value="Portuguese">Portugués</option>
                    </select>
                    <br />
                    <br />
                    {errors.language && (
                      <p className="text-red-500">{errors.language}</p>
                    )}

                    <label htmlFor="level">Nivel:</label>
                    <select
                      id="level"
                      name="level"
                      value={course.level}
                      onChange={handleChange}
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Seleccione un nivel</option>
                      <option value="Beginner">Principiante</option>
                      <option value="Intermediate">Intermedio</option>
                      <option value="Advanced">Avanzado</option>
                    </select>
                    <br />
                    <br />
                    {errors.level && (
                      <p className="text-red-500">{errors.level}</p>
                    )}

                    <label htmlFor="price">Precio:</label>
                    <div className="relative">
                      <span className="text-lg absolute top-2.5 left-3">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={course.price}
                        onChange={handleChange}
                        required
                        placeholder="Precio entre 25 y 500 USD"
                        className="h-10 border mt-1 rounded pl-10 w-full bg-gray-50"
                      />
                    </div>
                    <br />
                    <br />
                    {errors.price && (
                      <p className="text-red-500">{errors.price}</p>
                    )}
                    <label htmlFor="duration">Duración:</label>
                    <select
                      id="duration"
                      name="duration"
                      value={course.duration}
                      onChange={handleChange}
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Seleccione una duración</option>
                      <option value="1 Month">1 Mes</option>
                      <option value="2 Months">2 Meses</option>
                      <option value="3 Months">3 Meses</option>
                      <option value="4 Months">4 Meses</option>
                    </select>
                    <br />
                    <br />
                    {errors.duration && (
                      <p className="text-red-500">{errors.duration}</p>
                    )}

                    <label htmlFor="schedule">Horario:</label>
                    <select
                      id="schedule"
                      name="schedule"
                      value={course.schedule}
                      onChange={handleChange}
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                      <option value="">Seleccione un horario</option>
                      <option value="On Weekends">Fines de semana</option>
                      <option value="During the week">Durante la semana</option>
                      <option value="Monday-Wednesday-Friday">
                        Lunes, Miércoles, Viernes
                      </option>
                      <option value="Tuesday-Thursday">Martes, Jueves</option>
                    </select>
                    <br />
                    <br />

                    <label htmlFor="start_time">Fecha de inicio: </label>
                    <div className="relative">
                      <DatePicker
                        id="start_date"
                        type="date"
                        selected={course.start_time}
                        onChange={handleStartDateChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
                        dateFormat="dd/MM/yyyy"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <br />

                    <label htmlFor="finish_time">Fecha de finalización:</label>
                    <div className="relative">
                      <DatePicker
                        id="end_date"
                        type="date"
                        selected={course.finish_time}
                        onChange={handleEndDateChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 block"
                        dateFormat="dd/MM/yyyy"
                        required
                        autoComplete="off"
                      />
                    </div>
                    <br />
                    <br />

                    <label htmlFor="location">Ubicación:</label>
                    <select
                      type="text"
                      id="location"
                      name="location"
                      value={course.location}
                      onChange={handleChange}
                      required
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
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
                    <br />
                    <br />
                    <label htmlFor="image">Imagen:</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full"
                    />
                    <br />
                    <br />
                    <button
                      type="submit"
                      className="bg-blue-950 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
                    >
                      Crear Curso
                    </button>
                    <div className="text-green-500 mt-8 text-lg">
                      {successMessage}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CourseForm;
