import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
type Props = {};

function AuthLayout({}: Props) {
  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <Link to={"/"}>
            <img src="/logo.svg" alt="Logotipo Devtree"></img>
          </Link>
          <div className="py-10">
            <Outlet />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </>
  );
}

export default AuthLayout;
