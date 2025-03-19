// // //
import { redirect } from "react-router-dom";
import { createOrder } from "../../../api/apiRestaurant";
import store from "../../../store/store";
import { clearCart } from "../../../store/cartSlice";

// https://uibakery.io/regex-library/phone-number
function isValidPhone(str) {
  return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );
}

export default async function createOrderAction({ request }) {
  // console.log(request);
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  // console.log(order);

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct valid phone number!";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  // console.log(newOrder);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);

  // return null; // ⏺ for debugging
}
