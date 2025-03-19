// // //
import Header from "../ui/Header";
import CartOverview from "../components/features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "../ui/Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-4xl">
          <Outlet /> {/* ⏺ remember! nested routes */}
        </main>
      </div>

      <CartOverview />
    </div>
  );
}
