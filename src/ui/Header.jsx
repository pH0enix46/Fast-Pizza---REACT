// // //
import { Link } from "react-router-dom";
import SearchOrder from "../components/features/order/SearchOrder";
import Username from "../components/features/user/Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b-2 border-b-gray-400 bg-yellow-500 px-4 py-3 uppercase shadow-xl sm:px-6">
      <Link to={"/"} className="tracking-widest">
        Fast React Pizza`
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
