import { NavLink } from "react-router";

export default function Nav() {
  return (
    <nav className="text-sm">
      <NavLink to="/about" className="hover:underline">
        About
      </NavLink>
    </nav>
  );
}
