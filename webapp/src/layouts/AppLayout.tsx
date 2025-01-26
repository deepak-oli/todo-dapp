import Header from "@/components/Header";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
