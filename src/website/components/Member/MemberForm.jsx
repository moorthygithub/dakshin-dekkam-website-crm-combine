import { Loader, Lock, Phone } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showErrorToast } from "../../utils/toast";
import InputField from "../common/InputField";
import { loginSuccess } from "@/crm/redux/slices/AuthSlice";
import { useApiMutation } from "@/hooks/useApiMutation";

const MemberForm = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    password: "",
  });
  const PANEL_URL = import.meta.env.VITE_API_BASE_URL;
  const { trigger: submitTrigger, loading: isApiLoading } = useApiMutation();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false); // new state
  const navigate = useNavigate();
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "mobile") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const formDatas = new FormData();
    formDatas.append("username", formData.mobile);
    formDatas.append("password", formData.password);

    try {
      const res = await submitTrigger({
        url: "/panel-login",
        method: "post",
        data: formDatas,
      });

      if (res.code == 200 && res.UserInfo?.token) {
        const { UserInfo } = res;
        dispatch(
          loginSuccess({
            token: UserInfo.token,
            id: UserInfo.user.id,
            name: UserInfo.user?.name,
            mobile: UserInfo.user?.mobile,
            user_type: UserInfo.user?.user_type,
            branch_id: UserInfo.user?.branch_id,
            email: UserInfo.user?.email,
            token_expire_time: UserInfo.token_expires_at,
            version: res?.version?.version_panel,
            companyname: res?.company_detils?.company_name,
            companystatename: res?.company_detils?.company_state_name,
            company_address: res?.company_detils?.company_address,
            company_email: res?.company_detils?.company_email,
            company_gst: res?.company_detils?.company_gst,
            company_mobile: res?.company_detils?.company_mobile,
            company_state_code: res?.company_detils?.company_state_code,
            company_state_name: res?.company_detils?.company_state_name,
            login_type: "website",
          })
        );
        navigate("/crm/home");
      } else {
        showErrorToast(res?.message || "Login failed: Unexpected response.");
      }
    } catch (error) {
      console.log(error, "error");
      showErrorToast(error.response?.data?.message || "Please try again.");
    }
  };
  const isLoading = isApiLoading || isRedirecting;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-md my-6 rounded-xl p-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Member Area</h2>

      <InputField
        label="Mobile"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Enter your mobile"
        startIcon={<Phone size={18} />}
        error={errors.mobile}
      />

      <InputField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your password"
        startIcon={<Lock size={18} />}
        error={errors.password}
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full mt-3 flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition ${
          isLoading ? "opacity-70 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <>
            <Loader className="h-5 w-5 animate-spin mr-2" />
            {isRedirecting ? "Redirecting..." : "Logging in..."}
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default MemberForm;
