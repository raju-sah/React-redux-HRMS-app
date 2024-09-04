import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";
import SideBarItem from "./SideBarItem";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Layout() {
  return (
    <div className="flex">
      <SideBarItem />
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        <Navbar />
        <main className="flex-1 p-4">
          <Outlet /> {/* This is where nested route components will be rendered */}
        </main>
          <ToastContainer />
      </div>
    </div>
  );
}

export default Layout;
