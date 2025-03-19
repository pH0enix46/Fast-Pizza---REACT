// // //
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utility/helpers";
import DeleteItem from "../reusable/DeleteItem";
import UpdateItemQntity from "../reusable/UpdateItemQntity";
import { getCurrentQuantityByID } from "../../../store/cartSlice";

export default function CartItem({ item }) {
  const { name, quantity, totalPrice, pizzaId } = item;
  const currentQuantity = useSelector(getCurrentQuantityByID(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQntity pizzaId={pizzaId} currentQuantity={currentQuantity} />

        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}
