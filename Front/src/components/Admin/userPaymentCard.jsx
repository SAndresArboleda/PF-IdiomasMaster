
export default function UserPaymentCard ({date, amount, status}){

    return(
        <div className="w-full h-[40px] border-b-[1px] border-[#181b55] flex items-center">
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-yellow-500 text-[15px]">{date.split("T")[0]} </h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-white text-[15px]">$ {Math.floor(amount * .00118963)}</h1>
            </div>
            <div className="h-full w-[30%] flex items-center justify-evenly">
            <h1 className="text-white text-[15px]">{status}</h1>
            </div>
        </div>
    )
}