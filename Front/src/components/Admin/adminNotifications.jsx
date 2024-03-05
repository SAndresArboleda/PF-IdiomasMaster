import { useState } from "react";
import AdminProductsAll from "./adminProductsAll";
import AdminAddProduct from "./adminAddProduct";
import AdminSettingProduct from "./adminSettingProduct";
import { useDispatch } from "react-redux";
import { adminProduct, adminReview, adminUser } from "../../redux/action/actions";
import AdminUserAll from "./adminUserAll";
import AdminSettingUser from "./adminSettingUser";
import AdminInfoUser from "./adminUserInfo";
import AdminReviewsAll from "./adminReviewsAll";
import AdminManageReview from "./adminManageReview";
import AdminPayments from "./adminPayments";

export default function AdminNotifications() {

  const dispatch = useDispatch()

  const [options, setOptions] = useState({
    review: true,
    payments: false,
    manage: false,
  });

  const handleClick = (element) => {
    const updatedOptions = {
        review: false,
        payments: false,
        manage: false,
      [element]: true,
    };
    setOptions(updatedOptions);
    dispatch(adminReview())

  };

  const setSettings = () => {

    const updatedOptions = {
        review: false,
        payments: false,
        manage: true,
    };
    setOptions(updatedOptions);

  }


  return (
    <div className="h-[90vh] w-full bg-[#f1f1f1] flex items-center justify-center">
      <div className="h-[85%] w-[85%] flex flex-col">
        <div className="w-full h-[8%] flex items-center pl-[40px] justify-between">
          <div className="h-full w-[20%]">
            <h1 className="text-gray-800 text-[30px]">Notificaciones</h1>
          </div>
          <div className="bg-[#151139] w-[500px] h-full flex flex-row">
            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.review ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("review")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.review ? "text-white" : "text-black"
                }`}
              >
                Reseñas
              </h1>
            </div>

            <div
              className={`h-full w-[33%] flex items-center justify-center cursor-pointer group ${
                options.payments ? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("payments")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.payments ? "text-white" : "text-black"
                }`}
              >
                Pagos
              </h1>
            </div>
            <div
              className={`h-full w-[34%] flex items-center justify-center cursor-pointer group ${
                options.manage? "bg-[#151139]" : "bg-gray-200 cursor-not-allowed"
              }`}
              onClick={() => handleClick("manage")}
            >
              <h1
                className={`text-gray-800 text-[18px] cursor-pointer ${
                  options.manage ? "text-white" : "text-black"
                }`}
              >
                Admin Reseñas
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-[90%] bg-[#292b54]">
          {options.review ? <AdminReviewsAll setSettings={setSettings} /> : null}
          {options.payments ? <AdminPayments /> : null}
          {options.manage ? <AdminManageReview  /> : null}
        </div>
      </div>
    </div>
  );
}
