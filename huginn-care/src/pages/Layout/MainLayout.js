import { Outlet } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

function MainLayout() {
  return (
    <>
      <div className="page">
        <Outlet />
      </div>
      <NavBar/>
    </>
  )
}

export default MainLayout;
