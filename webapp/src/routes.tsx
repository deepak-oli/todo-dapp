import { lazy } from "react";
import { Routes, Route } from "react-router";

import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const WalletConnect = lazy(() => import("@/pages/WalletConnect"));
const NotFound = lazy(() => import("@/pages/NotFound"));

export default function Routing() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="/wallet-connect" element={<WalletConnect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
