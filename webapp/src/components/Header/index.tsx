import Logo from "../Logo";
import Nav from "./Nav";
import Profile from "./Profile";

export default function Header() {
  return (
    <header className="flex justify-between">
      <Logo />
      <div className="flex gap-4">
        <Nav />
        <Profile />
      </div>
    </header>
  );
}
