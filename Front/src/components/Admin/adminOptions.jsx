import LogoutButton from "../Login/LogOut";

export default function AdminOptions() {
  return (
    <div className="h-[100px] w-[200px] bg-[#2d53d9] absolute right-5 top-[90px] rounded-[10px] flex items-center justify-center">
      <button className="w-[80%] h-[50%]">
        <LogoutButton />
      </button>
    </div>
  );
}
