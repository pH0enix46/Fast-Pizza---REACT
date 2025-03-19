// // //
import { Form, useActionData, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../ui/Button";
import { getCart, getTotalCartPrice } from "../../../store/cartSlice";
import EmptyCart from "../reusable/EmptyCart";
import { formatCurrency } from "../../../utility/helpers";
import { useState } from "react";
import { fetchAddress } from "../../../store/userSlice";

export default function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAdress = addressStatus === "loading";
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData();
  const cart = useSelector(getCart); // ⏺ redux who call getCart function not us, so we need to call by use like getCart()
  // console.log(cart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const [withPriority, setWithPriority] = useState(false);
  const priorityPirce = withPriority ? totalCartPrice * 0.2 : 0; // ⏺ 20% extra
  const totalPrice = totalCartPrice + priorityPirce;
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-4">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form
        method="POST"
        className="rounded-lg bg-gray-100 px-4 py-8 shadow shadow-gray-400"
      >
        <div className="mb-5 flex flex-col gap-2 sm:grow sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:basis-32">First Name</label>
          <div className="w-full">
            <input
              className="input w-[80%]"
              type="text"
              name="customer"
              required
              defaultValue={username}
              // ⏺ defaultValue sets the initial value of an input, But it can be changed by the user
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:grow sm:flex-row sm:items-center sm:gap-4">
          <label className="sm:basis-32">Phone number</label>
          <div className="w-full">
            <input className="input w-[80%]" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 w-fit rounded-full bg-red-100 p-2 text-xs text-red-400 shadow sm:text-sm px-4">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:grow sm:flex-row sm:items-center sm:gap-4 relative">
          <label className="sm:basis-32">Address</label>
          <div className="w-full">
            <input
              className="input w-[80%]"
              type="text"
              name="address"
              disabled={isLoadingAdress}
              defaultValue={address}
              required
            />
            {addressStatus === "error" && (
              <p className="mt-2 w-fit rounded-full bg-red-100 p-2 text-xs text-red-400 shadow sm:text-sm px-4">
                {errorAddress}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className="absolute right-2 z-10 sm:-top-2">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAdress}
              >
                Get your position!
              </Button>
            </span>
          )}
        </div>

        <div className="mb-10 flex items-center gap-2">
          <input
            className="h-5 w-5 appearance-none rounded-full border-2 border-gray-500 accent-yellow-400 checked:bg-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onClick={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLoadingAdress} type="primary">
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
