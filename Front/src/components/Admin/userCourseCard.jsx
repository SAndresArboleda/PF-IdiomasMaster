
export default function UserCoursesCard ({language, level, duration}){

    return(
        <div className="w-full h-[40px] border-b-[1px] border-[#181b55] flex items-center">
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-yellow-500 text-[15px]">{language} </h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-white text-[15px]">{level}</h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-white text-[15px]">{duration}</h1>
            </div>
        </div>
    )
}