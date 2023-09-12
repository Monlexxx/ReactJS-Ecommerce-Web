import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import Footer from "../components/Footer";
import LiveChat from "../components/LiveChat";

// component root hiển thị ở mọi màn hình
const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      {/* Hiển thị live chat ở đây để có thể hiển thị ở tất cả các màn hình */}
      <LiveChat />
      <Footer />
    </>
  );
};

export default RootLayout;
