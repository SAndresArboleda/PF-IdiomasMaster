import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function AboutCard({ name, Location, gitHub, email, linkedIn, img }) {
  return (
    <div className="h-[450px] bg-white">
      <div className="h-[100%] w-[95%] bg-white rounded-[10px] overflow-hidden border-[1px] border-gray-300 shadow-sm shadow-black/10 ">
        <div className="w-full h-[40%] bg-sky-600 relative">
          <div className="w-[210px] h-[210px] bg-white rounded-[200px] absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-[10px] border-sky-600">
            <img src={img} alt={name} className="w-full h-full object-cover rounded-full" style={{ objectPosition: 'center top' }} />
          </div>
          <div className="w-[56px] h-[170px] grid grid-rows-3  absolute top-[10px] right-[5px] ">
            <div className="w-full h-full flex items-center justify-center ">
              <a href={gitHub} target="_blank" rel="noopener noreferrer">
                <SiGithub className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
              </a>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
              <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
              </a>
            </div>
            <div className="w-full h-full flex items-center justify-center ">
              <a href={`mailto:${email}`}>
                <MdEmail className="text-[40px] text-gray-100 hover:cursor-pointer hover:text-yellow-400" />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full h-[60%] relative flex flex-col justify-center items-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h1>
          <p className="text-lg text-gray-600 mb-2">Full Stack Developer</p>
          <p className="text-lg text-gray-600">{Location}</p>
        </div>
      </div>
    </div>
  );
}

