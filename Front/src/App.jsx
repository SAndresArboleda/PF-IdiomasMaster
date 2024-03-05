import { Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Navbar,
  Landing,
  HomeC,
  Register,
  Login,
  Detail,
  About,
  SearchHome,
  Configuration,
  AuthProvider,
  Favorite,
  ShopCart,
  Room,
} from "./components";
import AdminHome from "./components/Admin/adminHome";
import AdminNavbar from "./components/Admin/adminNavbar";
import AdminProducts from "./components/Admin/adminProducts";
import UserLanding from "./components/User/UserLand";
import UserNavbar from "./components/User/UserNavbar";
import AdminUsers from "./components/Admin/adminUsers";
import AdminNotifications from "./components/Admin/adminNotifications";
import AdminSettings from "./components/Admin/adminSettings";
import { useLocalStorage } from "./CustomHook/UseLocalStorage";
import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Redirect from "./components/Register/redirect";
import Error404 from "./components/404/404";

function App() {
  const [userData, setUserData] = useLocalStorage("userData", {});
  const loginData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const location = useLocation();


  const [lastLocation, setLastLocation] = useState("");

  const { t, i18n } = useTranslation();
  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, []);
  const lng = navigator.language;

  useEffect(() => {
    setData(userData);
  }, []);



  useEffect(() => {
    if (loginData.isAuthenticated && Object.keys(data).length === 0) {
      setData(loginData);
    }
  }, [loginData.isAuthenticated]);

  useEffect(() => {
    if (data.profile) {
    
      const lastLocation = localStorage.getItem("lastLocation");

      if (lastLocation) {
       
        if (lastLocation === "/login") {
          navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
        } else if (lastLocation === "/") {
          navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
        } else{
          navigate(lastLocation)
        }
      } else {
      
        navigate(data.profile === "admin" ? "/admindashboard" : "/user/home");
      }
    }

    if(userData.email && userData.email.length > 0 && userData.password && userData.password.length > 0 && !userData.isAuthenticated){
      setUserData({});
    }
    // if (data.email && !data.profile) {
    //   setUserData({});
    //   navigate("/");
    // }
  }, [data]);


  useEffect(() => {
    const currentLocation = location.pathname;
    localStorage.setItem("lastLocation", currentLocation);
    setLastLocation(currentLocation);
  }, [location.pathname]);

  return (
    <>
      <Suspense fallback="loading">
        <AuthProvider>
          {Object.keys(data).length === 0 &&
          data.isAuthenticated === undefined &&  location.pathname !== "/redirect" ? (
            <Navbar />
          ) : null}

          {Object.keys(data).length &&
          data.isAuthenticated &&
          data.profile === "user" ? (
            <UserNavbar />
          ) : null}

          {Object.keys(data).length &&
          data.isAuthenticated &&
          data.profile === "admin" ? (
            <AdminNavbar />
          ) : null}
          <Routes>
            <Route path="/home" element={<HomeC />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search" element={<SearchHome />} />
            <Route path="/redirect" element={<Redirect />} />
            <Route path="/*" element={<Error404/>} />

            {Object.keys(data).length === 0 &&
            data.isAuthenticated === undefined ? (
              <>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
               
              </>
            ) : null}

            {Object.keys(data).length &&
            data.isAuthenticated &&
            data.profile === "user" ? (
              <>
                <Route path="/configuracion" element={<Configuration />} />
                <Route path="/user/home" element={<UserLanding />} />
                <Route path="/favorite" element={<Favorite />} />
                <Route path="/cart" element={<ShopCart />} />
                <Route path="/Chat" element={<Room />} />
              </>
            ) : null}

            {Object.keys(data).length &&
            data.isAuthenticated &&
            data.profile === "admin" ? (
              <>
                <Route path="/admindashboard" element={<AdminHome />} />
                <Route
                  path="/admindashboard/products"
                  element={<AdminProducts />}
                />
                <Route path="/admindashboard/users" element={<AdminUsers />} />
                <Route
                  path="/admindashboard/notifications"
                  element={<AdminNotifications />}
                />
                <Route
                  path="/admindashboard/settings"
                  element={<AdminSettings />}
                />
              </>
            ) : null}
          </Routes>
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;

{
  /*     
        <Route path="/home" element={} />
        <Route path="/login" element={} />
        <Route path="/about" element={} />
        <Route path="/buyPremium" element={} />
        <Route path="/detail:id" element={} /> 
*/
}
