import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideBarItem from "./SideBarItem";
import { Breadcrumb } from "../breadcrumb/Breadcrumb";

function Layout() {
  return (
    <div className="flex">
      <SideBarItem />
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-4">
        <Breadcrumb />
          <Outlet />{" "}
          {/* This is where nested route components will be rendered */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
