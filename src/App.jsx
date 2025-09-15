import { Toaster } from "./crm/components/ui/toaster";
import AppRoutes from "./routes/AppRoutes";
function App() {
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
