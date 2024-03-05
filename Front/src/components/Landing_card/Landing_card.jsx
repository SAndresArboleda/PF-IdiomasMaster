import { useTranslation } from "react-i18next";
 

export default function Landing_card({ img, title, description }) {
  const { t , i18n} = useTranslation()

  return (
    <div className="relative h-[350px] m-1 shadow-lg shadow-black/50 rounded-[10px]">
      <img src={`${img}`} className="w-full h-full rounded-[10px] "></img>
      <div
        id="landing_card_info"
        className="absolute z-10 w-full h-[55%] bg-white/60 flex flex-col items-center justify-evenly top-[45%] px-5 rounded-b-[10px]"
      >
        <h3 className="text-3xl text-black border-t-2 border-b-2 border-black">
          {title}
        </h3>
        <h4 className="text-1xl text-black rounded-[10px] text-center ">
          {description}
        </h4>
      </div>
    </div>
  );
}
