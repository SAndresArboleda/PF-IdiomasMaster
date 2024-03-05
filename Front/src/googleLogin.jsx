import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postThirdPartyUser } from "./redux/action/actions"; // Importa la acción adecuada

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const dispatch = useDispatch();

  const onSuccess = (userData) => {
    console.log("Datos del usuario recibidos:", userData);
    dispatch(postThirdPartyUser(userData));
  };

  return (
    <div className="mt-[5px]">
      <button
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
            connection: "google-oauth2",
            onSuccess,
          })
        }
      >
        <img
          src="https://raw.githubusercontent.com/react-native-google-signin/google-signin/HEAD/img/signin-button.png"
          alt=""
          className="w-50 h-14"
        />
      </button>
    </div>
  );
};

export default LoginButton;
