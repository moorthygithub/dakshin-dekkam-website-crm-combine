import { DOT_ENV, PANEL_CHECK } from "@/api";
import useToken from "@/api/usetoken";
import { useToast } from "@/hooks/use-toast";
import { useApiMutation } from "@/hooks/useApiMutation";
import { logout } from "@/crm/redux/slices/AuthSlice";
import { setShowUpdateDialog } from "@/crm/redux/slices/versionSlice";
import { persistor } from "@/crm/redux/store";
import CryptoJS from "crypto-js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const secretKey = import.meta.env.VITE_SECRET_KEY;
const validationKey = import.meta.env.VITE_SECRET_VALIDATION;

const AppInitializer = ({ children }) => {
  const token = useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const localVersion = useSelector((state) => state.auth?.version);
  const { trigger: StatusTrigger } = useApiMutation();
  useEffect(() => {
    const validateEnvironment = async () => {
      try {
        if (!secretKey) {
          navigate("/crm/maintenance");
          throw new Error("Missing SECRET_KEY");
        }

        const statusRes = await StatusTrigger({
          url: PANEL_CHECK,
        });
        if (statusRes?.message !== "Success") {
          throw new Error("Panel status check failed");
        }

        const serverVer = statusRes?.version?.version_panel;

        if (token) {
          dispatch(
            setShowUpdateDialog({
              showUpdateDialog: localVersion !== serverVer,
              version: serverVer,
            })
          );
        }

        const dotenvRes = await StatusTrigger({
          url: DOT_ENV,
        });
        const dynamicValidationKey = dotenvRes?.data;

        if (!dynamicValidationKey) {
          throw new Error("Validation key missing");
        }

        const computedHash = validationKey
          ? CryptoJS.MD5(validationKey).toString()
          : "";

        if (!secretKey || computedHash !== dynamicValidationKey) {
          throw new Error("Invalid environment config");
        }

        if (location.pathname === "/crm/maintenance") {
          // if (loginType == "website") {
          navigate("/");
          // } else {
          //   navigate("/crm");
          // }
        }
      } catch (error) {
        console.error("❌ App Initialization Error:", error.message);
        await persistor.flush();
        localStorage.clear();
        dispatch(logout());
        setTimeout(() => persistor.purge(), 1000);
        toast({
          title: "Environment Error",
          description: error.message,
          variant: "destructive",
        });

        if (location.pathname !== "/crm/maintenance") {
          navigate("/crm/maintenance");
        }
      }
    };

    validateEnvironment();
  }, [navigate, dispatch]);

  return children;
};

export default AppInitializer;
