import { NavLink } from "react-router";
import Logo from "../Logo";
import Nav from "./Nav";
import Profile from "./Profile";

export default function Header() {
  return (
    <header className="flex justify-between items-center rounded border-b border-t  mt-5 py-1 px-3">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <div className="flex gap-10">
        <Nav />
        <Profile />
      </div>
    </header>
  );
}
