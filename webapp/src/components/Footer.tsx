import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex justify-between items-center gap-4">
      <Logo />
      <p>{new Date().getFullYear()}</p>
    </footer>
  );
}
