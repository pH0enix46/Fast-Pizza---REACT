// // //
import { updateOrder } from "../../../api/apiRestaurant";

export default async function UpdateOrderAction({ request, params }) {
  const data = { priority: true };

  await updateOrder(params.orderId, data);

  return null;
}
