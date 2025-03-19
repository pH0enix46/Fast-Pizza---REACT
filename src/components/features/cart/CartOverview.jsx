// // //
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getTotalCartPrice,
  getTotalCartQuantity,
} from "../../../store/cartSlice";
import { formatCurrency } from "../../../utility/helpers";

export default function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className="flex items-center justify-between bg-gray-800 px-4 py-4 text-sm text-gray-300 shadow-2xl sm:px-6 md:text-base border-2 border-gray-600">
      <p className="space-x-4 font-bold text-gray-400 sm:space-x-6">
        <span>{totalCartQuantity} pizzas</span>{" "}
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>

      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}
