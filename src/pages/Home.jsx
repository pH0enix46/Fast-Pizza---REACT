// // //
import { useSelector } from "react-redux";
import CreateUser from "../components/features/user/CreateUser";
import Button from "../ui/Button";

export default function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 text-center sm:my-16">
      <h1 className="mb-8 px-2 text-3xl font-semibold tracking-wide md:text-4xl">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you
        </span>
      </h1>

      {username === "" ? (
        <CreateUser />
      ) : (
        <Button to="/menu" type="primary">
          Continue ordering!&nbsp;&nbsp;&nbsp; {username}
        </Button>
      )}
    </div>
  );
}
