import { idReview, idUser } from "./userData";
import { useDispatch } from "react-redux";
import { adminReview, adminUser } from "../../redux/action/actions";
import { FiInfo } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { MdOutlineSpeakerNotesOff } from "react-icons/md";

export default function ReviewCard({ index, id,  rating, date, view, reply, setSettings }) {
  const dispatch = useDispatch();

  const handleClick = async () => {

    const response = await idReview(id);
    if (response.data) {
      console.log(response.data)
      dispatch(adminReview(response.data));
      setSettings.setSettings();
    }
  };

  return (
    <div className="w-full h-[35px] border-[1px] border-[#151139] flex flex-row hover:bg-[#4f4986]">
      <div className="h-full w-[5%]  bg-[#151139] flex items-center justify-center text-white">
        <h1 className=" text-[14px] font-light text-white">{index}</h1>
      </div>
      <div className="h-full w-[25%]  flex items-center justify-start">
        <h1 className="ml-[20px] text-[14px] font-light text-white">{id}</h1>
      </div>
      <div className="h-full w-[15%]  flex items-center justify-center">
      {date && date.length > 0 && (
          <h1 className="ml-[20px] text-[14px] font-light text-white">
            {date.split('T')[0]}
          </h1>
        )}
      </div>
      <div className="h-full w-[10%] flex items-center justify-center">
        <h1 className="ml-[20px] text-[14px] font-light text-white">
          {rating}
        </h1>
      </div>
      <div className="h-full w-[17%]  flex items-center justify-center">
        {view? 
        (<FaRegEye className="text-[20px] ml-[15px] text-green-200 " />)
    :(<FaRegEyeSlash className="text-[20px] ml-[15px] text-red-500 " />)}
      </div>

      <div className="h-full w-[17%] flex items-center justify-center ">
      {reply && reply.length > 0 ? 
        (<MdOutlineSpeakerNotes className="text-[20px] ml-[15px] text-green-200 " />)
    :(<MdOutlineSpeakerNotesOff className="text-[20px] ml-[15px] text-red-500 " />)}
      </div>
      <div className="h-full w-[16%] flex items-center justify-center ">
        <FiInfo
          className="text-[20px] ml-[15px] text-white cursor-pointer"
         onClick={handleClick}
        />
      </div>
    </div>
  );
}
