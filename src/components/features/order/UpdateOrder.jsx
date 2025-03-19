// // //
import { useFetcher } from "react-router-dom";
import Button from "../../../ui/Button";

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // ⏺ fetcher.Form in React Router is a component used to handle form submissions without triggering a full page reload or navigation, allowing for seamless data submission
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
