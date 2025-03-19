// // //
import { useDispatch, useSelector } from "react-redux";
import LinkButton from "../../../ui/LinkButton";
import Button from "../../../ui/Button";
import CartItem from "./CartItem";
import { clearCart, getCart } from "../../../store/cartSlice";
import { getUserName } from "../../../store/userSlice";
import EmptyCart from "../reusable/EmptyCart";

export default function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector(getUserName);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 rounded-lg bg-amber-50 shadow-md shadow-gray-300 p-2">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="mt-6 space-x-4">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}
