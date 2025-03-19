// // //
import { Link } from "react-router-dom";

export default function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block cursor-pointer rounded-full bg-yellow-400 text-sm font-semibold tracking-wide text-gray-600 uppercase shadow shadow-amber-500 transition-colors duration-300 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none active:bg-yellow-500 disabled:cursor-not-allowed px-3 py-2 text-sm";

  const styles = {
    primary: base,
    small: base + " text-xs",
    round: base + " text-xs px-2 py-1",
    secondary:
      "inline-block cursor-pointer rounded-full bg-transparent text-sm font-semibold tracking-wide text-gray-500 uppercase shadow shadow-amber-400 transition-colors duration-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none active:bg-yellow-500 disabled:cursor-not-allowed px-3 py-2 border-2 border-gray-200 hover:text-gray-200 text-sm",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}
