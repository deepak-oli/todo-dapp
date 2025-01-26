import AnimatedLogoSvg from "@/components/AnimatedLogoSvg";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <section className="container mx-auto flex flex-col h-screen items-center justify-center">
      <AnimatedLogoSvg />
      <Card className="min-w-[320px] max-w-[500px]">
        <CardHeader>
          <CardTitle className="text-red-500 text-center">
            404 Page Not Found.
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col">
          <p className="text-xs text-gray-500">
            The page you are looking for might have been removed or is
            unavailable.
          </p>
          <NavLink
            to="/"
            className="text-blue-500 text-sm underline flex gap-2 mt-3"
          >
            <span>Back Home</span>
          </NavLink>
        </CardFooter>
      </Card>
    </section>
  );
}
