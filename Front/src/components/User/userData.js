import axios from "axios";

export const UserData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/getAllCourses`);

    if (response) {
      return response;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};


export const userCourses = async () => {



  try {
    const response = await axios.get(`http://localhost:3000/getUserCourses/65c3df4bedcb5cdd85ce20f5`);

    if (response.data) {
        return response.data; 
      }
  } catch (error) {
    throw new Error(error.message);
  }
};
