import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "./crm/components/ui/toaster";
import AppRoutes from "./routes/AppRoutes";
function App() {
  useEffect(() => {
    AOS.init({
      // duration: 800,
      once: false,
    });
  }, []);
  return (
    <>
      {/* <DevToolBlocker />
        <DisableRightClick /> */}
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
