import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <section className="container mx-auto flex flex-col h-screen items-center justify-center">
      <svg
        className="h-20 animate-bounce"
        width="238"
        height="238"
        viewBox="0 0 238 238"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M119 238C184.722 238 238 184.722 238 119C238 53.2781 184.722 0 119 0C53.2781 0 0 53.2781 0 119C0 184.722 53.2781 238 119 238Z"
          fill="#0A0A0A"
        />
        <path
          d="M89.7 165.7C87.8 171.9 85.3 175.4 77 175.4C70 175.4 66.8 172.7 66.8 168.4C66.8 167 67.1 165.4 67.6 164L95.9 64.6C97.8 58.4 100.3 54.9 108.4 54.9C115.6 54.9 118.7 57.6 118.7 61.9C118.7 63.5 118.2 64.9 117.8 66.6L89.7 165.7Z"
          fill="white"
        />
        <path
          d="M144.1 165.7C142.2 171.9 139.7 175.4 131.4 175.4C124.4 175.4 121.2 172.7 121.2 168.4C121.2 167 121.5 165.4 122 164L150.3 64.6C152.2 58.4 154.7 54.9 162.8 54.9C170 54.9 173.1 57.6 173.1 61.9C173.1 63.5 172.6 64.9 172.2 66.6L144.1 165.7Z"
          fill="white"
        />
      </svg>

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
