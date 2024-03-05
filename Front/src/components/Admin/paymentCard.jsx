import { idReview, idUser } from "./userData";
import { useDispatch } from "react-redux";
import { adminReview, adminUser } from "../../redux/action/actions";
import { FiInfo } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";

export default function PaymentCard({
  index,
  id,
  date,
  amount,
  user,
  course,
  status,
}) {
  const dispatch = useDispatch();

  const total = Math.floor(amount * .00118963)

  return (
    <div className="w-full h-[35px] border-[1px] border-[#151139] flex flex-row hover:bg-[#4f4986]">
      <div className="h-full w-[5%]  bg-[#151139] flex items-center justify-center text-white">
        <h1 className=" text-[14px] font-light text-white">{index}</h1>
      </div>
      <div className="h-full w-[25%]  flex items-center justify-start">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{id}</h1>
      </div>
      <div className="h-full w-[12%]  flex items-center justify-center">
        {date && date.length > 0 && (
          <h1 className="ml-[20px] text-[14px] font-light text-white">
            {date.split('T')[0]}
          </h1>
        )}
      </div>
      <div className="h-full w-[10%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {total}
        </h1>
      </div>
      <div className="h-full w-[20%]  flex items-center justify-center">
        <h1 className="ml-[20px] text-[12px] font-light text-white">{user}</h1>
      </div>
      <div className="h-full w-[20%] flex items-center justify-center ">
        <h1 className="ml-[20px] text-[12px] font-light text-white">
          {course}
        </h1>
      </div>
      <div className="h-full w-[13%] flex items-center justify-center ">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {status}
        </h1>
      </div>
    </div>
  );
}
