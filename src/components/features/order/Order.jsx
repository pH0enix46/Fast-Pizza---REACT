// // //
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../../utility/helpers";
import { useFetcher, useLoaderData } from "react-router-dom";
import OrderItem from "./OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

export default function Order() {
  const order = useLoaderData();
  // console.log(order);
  const fetcher = useFetcher(); // ⏺ useFetcher() is React Router hook for making fetch requests without navigation, useful for handling form, API call and many more
  const {
    // ⏺ Test ID: IIDSAT
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(
    function () {
      // console.log(fetcher);
      // console.log(fetcher.data);

      if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu"); // ⏺ load() is React Router method/function is used to fetch data before a route is rendered
    },
    [fetcher]
  );

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-400 px-3 py-1 text-xs font-semibold tracking-wider text-gray-100 uppercase shadow sm:text-sm">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-400 px-3 py-1 text-xs font-semibold tracking-wider text-gray-100 uppercase shadow sm:text-sm">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-gray-200 px-6 py-5 shadow shadow-gray-400">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-gray-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-gray-200 border-t-2 border-b-2 border-gray-300 p-2">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
            isLoadingIngredients={fetcher.state === "loading"}
          ></OrderItem>
        ))}
      </ul>

      <div className="space-y-2 rounded-lg bg-gray-200 px-6 py-5 shadow">
        <p className="font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}
