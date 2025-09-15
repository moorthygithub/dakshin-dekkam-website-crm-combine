import { useSelector } from "react-redux";

import SessionTimeoutTracker from "./crm/components/SessionTimeoutTracker/SessionTimeoutTracker";
import ValidationWrapper from "./crm/utils/ValidationWrapper";
import VersionCheck from "./crm/utils/VersionCheck";
import { Toaster } from "./crm/components/ui/toaster";
import useLogout from "./hooks/useLogout";
import AppRoutes from "./routes/AppRoutes";
function App() {
  const time = useSelector((state) => state.auth.token_expire_time);
  const handleLogout = useLogout();
  return (
    <>
      <ValidationWrapper>
        {/* <DevToolBlocker />
        <DisableRightClick /> */}
        <VersionCheck />
        <Toaster />
        <SessionTimeoutTracker expiryTime={time} onLogout={handleLogout} />
        <AppRoutes />
      </ValidationWrapper>
    </>
  );
}

export default App;
