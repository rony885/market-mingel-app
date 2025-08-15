import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header/Header";
import SidebarMenu from "./components/SidebarMenu/SidebarMenu";
import Loader from "./components/Loader";
import NotFound from "./components/NotFound";
import NotFound2 from "./components/NotFound2";

import Dashboard from "./pages/Dashboard/Dashboard";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import AboutTeamAdd from "./pages/About/AboutTeamAdd";
import AboutTeamEdit from "./pages/About/AboutTeamEdit";
import AboutTeamList from "./pages/About/AboutTeamList";

import ServiceCategoryList from "./pages/Services/ServiceCategory/ServiceCategoryList";
import ServiceCategoryAdd from "./pages/Services/ServiceCategory/ServiceCategoryAdd";
import ServiceCategoryEdit from "./pages/Services/ServiceCategory/ServiceCategoryEdit";

import ServiceList from "./pages/Services/Service/ServiceList";
import ServiceAdd from "./pages/Services/Service/ServiceAdd";
import ServiceEdit from "./pages/Services/Service/ServiceEdit";

import ClientList from "./pages/Client/ClientList";
import ClientAdd from "./pages/Client/ClientAdd";
import ClientEdit from "./pages/Client/ClientEdit";

import Settings from "./pages/Settings/Settings";
import BusinessProposal from "./pages/BusinessProposal/BusinessProposal";
import Contact from "./pages/Contact/Contact";

import UserList from "./pages/User/UserList";
import UserAdd from "./pages/User/UserAdd";
import UserEdit from "./pages/User/UserEdit";

import Profile from "./pages/Authentication/Profile";
import ChangePassword from "./pages/Authentication/ChangePassword";

import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import EmigrantDivisionContent from "./pages/EmigrantDivision/EmigrantDivisionContent";

import EmigrantDivCategoryList from "./pages/EmigrantDivision/EmigrantDivisionCategory/EmigrantDivCategoryList";
import EmigrantDivCategoryAdd from "./pages/EmigrantDivision/EmigrantDivisionCategory/EmigrantDivCategoryAdd";
import EmigrantDivCategoryEdit from "./pages/EmigrantDivision/EmigrantDivisionCategory/EmigrantDivCategoryEdit";

import EmigrantDivisionDetailsList from "./pages/EmigrantDivision/EmigrantDivisionDetails/EmigrantDivisionDetailsList";
import EmigrantDivisionDetailsAdd from "./pages/EmigrantDivision/EmigrantDivisionDetails/EmigrantDivisionDetailsAdd";
import EmigrantDivisionDetailsEdit from "./pages/EmigrantDivision/EmigrantDivisionDetails/EmigrantDivisionDetailsEdit";
import { useApiContext } from "./context/ApiContext";

function App() {
  const { c_user } = useApiContext();
  const aT = localStorage.getItem("marketmingl_Access_Token");
  const rT = localStorage.getItem("marketmingl_Refresh_Token");

  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarEnabled, setIsSidebarEnabled] = useState(false);

  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Handle toggle logic
  const handleToggle = () => {
    const dataMenuSize = htmlElement.getAttribute("data-menu-size");
    // Only execute the toggle logic if datamenusize is "hidden"
    if (dataMenuSize === "hidden") {
      if (isSidebarEnabled) {
        htmlElement.classList.remove("sidebar-enable");
        bodyElement.style.overflow = ""; // Reset overflow
      } else {
        htmlElement.classList.add("sidebar-enable");
        bodyElement.style.overflow = "hidden"; // Hide overflow
      }
      setIsSidebarEnabled(!isSidebarEnabled); // Toggle sidebar state
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const htmlElement = document.documentElement;
      const currentSize = htmlElement.getAttribute("data-menu-size");
      if (window.innerWidth <= 1140) {
        if (currentSize !== "hidden") {
          htmlElement.setAttribute("data-menu-size", "hidden");
        }
      } else {
        htmlElement.setAttribute("data-menu-size", "sm-hover-active");
      }
    };
    // Run once when mounted
    handleResize();
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/custom_user/logout/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${aT}`,
          },
          body: JSON.stringify({
            refresh_token: rT,
          }),
        }
      );
      if (response.ok) {
        localStorage.removeItem("marketmingl_Access_Token");
        localStorage.removeItem("marketmingl_Refresh_Token");
        window.location.reload(false);
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  if (!aT) {
    return (
      <BrowserRouter>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            width: "100%",
          }}
        >
          <Routes>
            <Route path="/" element={<SignIn />}></Route>
            <Route path="/register" element={<SignUp />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="*" element={<NotFound2 />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }

  return (
    <>
      <BrowserRouter>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="wrapper">
            <Header
              handleTogglle={handleToggle}
              handleLogout={handleLogout}
              c_user={c_user}
            />
            <SidebarMenu handleTogglle={handleToggle} />

            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/home" element={<Home />}></Route>

              <Route path="/about-us" element={<AboutUs />}></Route>
              <Route path="/about-team" element={<AboutTeamList />}></Route>
              <Route path="/about-team-add" element={<AboutTeamAdd />}></Route>
              <Route
                path="/about-team-edit/:id"
                element={<AboutTeamEdit />}
              ></Route>

              <Route
                path="/service-category"
                element={<ServiceCategoryList />}
              ></Route>
              <Route
                path="/service-category-add"
                element={<ServiceCategoryAdd />}
              ></Route>
              <Route
                path="/service-category-edit/:id"
                element={<ServiceCategoryEdit />}
              ></Route>

              <Route path="/service" element={<ServiceList />}></Route>
              <Route path="/service-add" element={<ServiceAdd />}></Route>
              <Route path="/service-edit/:id" element={<ServiceEdit />}></Route>

              <Route path="/client" element={<ClientList />}></Route>
              <Route path="/client-add" element={<ClientAdd />}></Route>
              <Route path="/client-edit/:id" element={<ClientEdit />}></Route>

              <Route
                path="/emigrant-service-category"
                element={<EmigrantDivCategoryList />}
              ></Route>
              <Route
                path="/emigrant-service-category-add"
                element={<EmigrantDivCategoryAdd />}
              ></Route>
              <Route
                path="/emigrant-service-category-edit/:id"
                element={<EmigrantDivCategoryEdit />}
              ></Route>

              <Route
                path="/emigrant-service"
                element={<EmigrantDivisionDetailsList />}
              ></Route>
              <Route
                path="/emigrant-service-add"
                element={<EmigrantDivisionDetailsAdd />}
              ></Route>
              <Route
                path="/emigrant-service-edit/:id"
                element={<EmigrantDivisionDetailsEdit />}
              ></Route>

              <Route
                path="/emigrant-service-content"
                element={<EmigrantDivisionContent />}
              ></Route>

              <Route
                path="/business-proposal"
                element={<BusinessProposal />}
              ></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/setting" element={<Settings />}></Route>

              <Route path="/user" element={<UserList />}></Route>
              <Route path="/user-add" element={<UserAdd />}></Route>
              <Route path="/user-edit/:id" element={<UserEdit />}></Route>

              <Route
                path="/profile"
                element={<Profile c_user={c_user} />}
              ></Route>
              <Route
                path="/change-password"
                element={<ChangePassword />}
              ></Route>

              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
