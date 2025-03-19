// // //
import { getMenu } from "../../../api/apiRestaurant";

export default async function menuLoader() {
  const menu = await getMenu();
  return menu;
}
