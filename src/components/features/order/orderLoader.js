// // //
import { getOrder } from "../../../api/apiRestaurant";

export default async function orderLoader({ params }) {
  const order = await getOrder(params.orderId);

  return order;
}
