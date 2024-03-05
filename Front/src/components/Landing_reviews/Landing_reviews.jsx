import { RiStarSFill } from "react-icons/ri";

export default function Landing_reviews({ img, review, name, location }) {
  return (
    <div className="w-[600px] h-[500px] rounded-[20px] shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
      <div className="w-[full h-[70%] bg-white flex flex-row ">
        <div className="w-[50%] h-full overflow-hidden ">
          <img src={img} className="w-full h-full object-cover"></img>
        </div>
        <div className="w-[50%] h-full overflow-hidden p-6">
          <h1 className="text-black text-[15px]">"{review}"</h1>
        </div>
      </div>
      <div className="w-[full h-[30%] bg-gradient-to-r from-indigo-800 via-purple-700 to-pink-900 flex flex-col ">
        <h1 className="text-[40px] ml-[30px]">{name}</h1>
        <h1 className="text-[20px] ml-[30px] text-yellow-500">{location}</h1>
        <div className=" w-[400px] h-[50px] ml-[30px] mt-[10px] flex flex-row">
          <RiStarSFill className="text-[40px] text-yellow-400" />
          <RiStarSFill className="text-[40px] text-yellow-400" />
          <RiStarSFill className="text-[40px] text-yellow-400" />
          <RiStarSFill className="text-[40px] text-yellow-400" />
          <RiStarSFill className="text-[40px] text-yellow-400" />
        </div>
      </div>
    </div>
  );
}
