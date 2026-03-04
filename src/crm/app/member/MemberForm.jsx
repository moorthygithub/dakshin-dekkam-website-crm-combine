import { GET_STATES, MEMBER_LIST } from "@/api";
import Page from "@/crm/app/page/page";
import { MemoizedSelect } from "@/crm/components/common/MemoizedSelect";
import PageHeaders from "@/crm/components/common/PageHeaders";
import { LoaderComponent } from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import { Card, CardContent } from "@/crm/components/ui/card";
import { Input } from "@/crm/components/ui/input";
import { Textarea } from "@/crm/components/ui/textarea";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import { useToast } from "@/hooks/use-toast";
import { useFetchBloodGroup, useFetchOccupation } from "@/hooks/useApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { decryptId } from "@/crm/utils/encyrption/Encyrption";
import { useApiMutation } from "@/hooks/useApiMutation";
import generateYearOptions from "@/website/utils/generateYearOptions";
const useFetchMaterial = (id) => {
  return useGetApiMutation({
    url: `${MEMBER_LIST}/${id}`,
    queryKey: ["materialbyid"],
    options: {
      enabled: !!id,
    },
  });
};
const MarriedStatus = [
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Unmarried",
    label: "Unmarried",
  },
];
const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];
const MemberForm = () => {
  const { id } = useParams();
  let decryptedId = null;
  const isEdit = Boolean(id);

  if (isEdit) {
    try {
      const rawId = decodeURIComponent(id);
      decryptedId = decryptId(rawId);
    } catch (err) {
      console.error("Failed to decrypt ID:", err.message);
    }
  }
  const { data: statedata } = useGetApiMutation({
    url: GET_STATES,
    queryKey: ["statedata-crm"],
  });
  const isEditMode = Boolean(id);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const yearOptions = generateYearOptions(1950);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_dob: "",
    user_city: "",
    user_age: "",
    mobile: "",
    user_whatsapp: "",
    email: "",
    user_occupation: "",
    user_education: "",
    resi_address: "",
    place_of_residence: "",
    native_place: "",
    user_doa: "",
    user_married_status: "",
    user_group_mid: "",
    user_status: isEditMode ? "" : "Active",
    user_state: "",
    user_pincode: "",
  });
  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: materialByid, loading: isFetching } =
    useFetchMaterial(decryptedId);
  useEffect(() => {
    if (decryptedId && materialByid?.data) {
      const raw = materialByid.data;
      setFormData({
        first_name: raw?.first_name || "",
        middle_name: raw?.middle_name || "",
        last_name: raw?.last_name || "",
        user_dob: raw?.user_dob || "",
        user_city: raw?.user_city || "",
        user_age: raw?.user_age || "",
        mobile: raw?.mobile || "",
        user_whatsapp: raw?.user_whatsapp || "",
        email: raw?.email || "",
        user_occupation: raw?.user_occupation || "",
        user_education: raw?.user_education || "",
        resi_address: raw?.resi_address || "",
        place_of_residence: raw?.place_of_residence || "",
        native_place: raw?.native_place || "",
        user_doa: raw?.user_doa || "",
        user_married_status: raw?.user_married_status || "",
        user_state: raw?.user_state || "",
        user_pincode: raw?.user_pincode || "",
        user_group_mid: raw?.user_group_mid || "",
        user_status: raw?.user_status || "Active",
      });
    }
  }, [decryptedId, materialByid]);

  const { data: blodGroupdata, isLoading: loadingbloodgroup } =
    useFetchBloodGroup();
  const { data: occupationdata, isLoading: loadingoccupation } =
    useFetchOccupation();

  // const handleInputChange = (e, field) => {
  //   const value = e.target ? e.target.value : e;
  //   let updatedFormData = { ...formData, [field]: value };

  //   setFormData(updatedFormData);
  // };
  const handleInputChange = (e, field) => {
    let value = e.target ? e.target.value : e;
    if (
      ["user_age", "mobile", "user_whatsapp", "user_pincode"].includes(field)
    ) {
      value = value.replace(/\D/g, "");
    }

    let updatedFormData = { ...formData, [field]: value };

    setFormData(updatedFormData);
  };
  useEffect(() => {
    const calculateProgress = () => {
      let formCopy = { ...formData };

      if (isEditMode) {
        delete formCopy.user_group_mid;
      }

      const totalFormFields = Object.keys(formCopy).length;

      const filledFormFields = Object.values(formCopy).filter((value) => {
        if (value === null || value === undefined) return false;
        return value.toString().trim() !== "";
      }).length;

      // const missingFields = Object.entries(formCopy)
      //   .filter(
      //     ([, value]) =>
      //       value === null ||
      //       value === undefined ||
      //       value.toString().trim() === ""
      //   )
      //   .map(([key]) => key);

      const totalFields = totalFormFields;
      const filledFields = filledFormFields;

      const percentage =
        totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);

      setProgress(percentage);
    };

    calculateProgress();
  }, [formData, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!formData.first_name) missingFields.push("First Name");
    // if (!formData.middle_name) missingFields.push("Middle Name");
    if (!formData.user_dob) missingFields.push("Born Year");
    if (!formData.user_city) missingFields.push("City");
    if (!formData.user_age) missingFields.push("Age");
    if (!formData.mobile) missingFields.push("Mobile");
    // if (!formData.user_whatsapp) missingFields.push("WhatsApp Number");
    if (!formData.email) missingFields.push("Email");
    if (!formData.user_occupation) missingFields.push("Occupation");
    // if (!formData.user_education) missingFields.push("Education");
    // if (!formData.resi_address) missingFields.push("Residential Address");
    // if (!formData.place_of_residence) missingFields.push("Place of Residence");
    // if (!formData.native_place) missingFields.push("Native Place");
    // if (!formData.user_doa) missingFields.push("Date of Anniversary");
    if (!formData.user_state) missingFields.push("State");
    if (!formData.user_pincode) missingFields.push("Pincode");
    // if (!formData.user_married_status) missingFields.push("Marital Status");
    if (!formData.user_group_mid && !isEditMode)
      missingFields.push("Group MID");
    if (!formData.user_status && isEditMode)
      missingFields.push("Status is Required");
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <div>
            <p>Please fill in the following fields:</p>
            <ul className="list-disc pl-5">
              {missingFields.map((field, i) => (
                <li key={i}>{field}</li>
              ))}
            </ul>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await submitTrigger({
        url: isEditMode ? `${MEMBER_LIST}/${decryptedId}` : MEMBER_LIST,
        method: isEditMode ? "put" : "post",
        data: formData,
      });
      if (response?.code == 201) {
        toast({
          title: "Success",
          description: response.message,
        });
        navigate("/crm/member");
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to save raw material",
        variant: "destructive",
      });
    }
  };

  if (isFetching || loadingbloodgroup || loadingoccupation) {
    return <LoaderComponent />;
  }
  return (
    <Page>
      <div className="p-0">
        <div className="">
          <form onSubmit={handleSubmit} className="w-full ">
            <PageHeaders
              title={isEditMode ? "Update Member" : "Create Member"}
              subtitle="member"
              progress={progress}
              mode={isEditMode ? "edit" : "create"}
            />
            <Card className={`mb-6 ${ButtonConfig.cardColor}`}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.first_name}
                      onChange={(e) => handleInputChange(e, "first_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Middle Name
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.middle_name}
                      onChange={(e) => handleInputChange(e, "middle_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Last Name
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.last_name}
                      onChange={(e) => handleInputChange(e, "last_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Born Year <span className="text-red-500">*</span>
                    </label>
                    {/* <Input
                      className="bg-white"
                      value={formData.user_dob}
                      onChange={(e) => handleInputChange(e, "user_dob")}
                      type="date"
                    /> */}
                    <MemoizedSelect
                      value={formData.user_dob}
                      onChange={(e) => handleInputChange(e, "user_dob")}
                      options={yearOptions}
                      placeholder="Select Born Year"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Age <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white"
                      value={formData.user_age}
                      onChange={(e) => handleInputChange(e, "user_age")}
                    />
                  </div>{" "}
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      maxLength={50}
                    />
                  </div>
                  {/* <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Blood Group <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_blood_group}
                      onChange={(e) => handleInputChange(e, "user_blood_group")}
                      options={
                        blodGroupdata?.data?.map((blood) => ({
                          value: blood.blood_group,
                          label: blood.blood_group,
                        })) || []
                      }
                      placeholder="Select Blood Group"
                    />
                  </div> */}
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.mobile}
                      onChange={(e) => handleInputChange(e, "mobile")}
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Whatsapp
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_whatsapp}
                      onChange={(e) => handleInputChange(e, "user_whatsapp")}
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Education
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_education}
                      onChange={(e) => handleInputChange(e, "user_education")}
                      maxLength={50}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Occupation <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_occupation}
                      onChange={(e) => handleInputChange(e, "user_occupation")}
                      options={
                        occupationdata?.data?.map((occupation) => ({
                          value: occupation.occupation,
                          label: occupation.occupation,
                        })) || []
                      }
                      placeholder="Select Occupation"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Marital Status
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_married_status}
                      onChange={(e) =>
                        handleInputChange(e, "user_married_status")
                      }
                      options={MarriedStatus}
                      placeholder="Select  Marital Status"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Date of Anniversary
                    </label>
                    <Input
                      type="date"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_doa}
                      onChange={(e) => handleInputChange(e, "user_doa")}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Place of Residence
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.place_of_residence}
                      onChange={(e) =>
                        handleInputChange(e, "place_of_residence")
                      }
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Native Place in Kutch
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.native_place}
                      onChange={(e) => handleInputChange(e, "native_place")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white"
                      value={formData.user_city}
                      onChange={(e) => handleInputChange(e, "user_city")}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      State <span className="text-red-500">*</span>
                    </label>
                    <MemoizedSelect
                      value={formData.user_state}
                      onChange={(e) => handleInputChange(e, "user_state")}
                      options={
                        statedata?.data?.map((state) => ({
                          value: state.state_name,
                          label: state.state_name,
                        })) || []
                      }
                      placeholder="Select State"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Pincode <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white"
                      value={formData.user_pincode}
                      onChange={(e) => handleInputChange(e, "user_pincode")}
                      maxLength={6}
                    />
                  </div>
                  {!isEditMode && (
                    <div>
                      <label
                        className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                      >
                        Member ID<span className="text-red-500">*</span>
                      </label>
                      <Input
                        className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                        value={formData.user_group_mid}
                        onChange={(e) => handleInputChange(e, "user_group_mid")}
                      />
                    </div>
                  )}
                  {isEditMode && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                        >
                          Status <span className="text-red-500">*</span>
                        </label>
                      </div>

                      <MemoizedSelect
                        value={formData.user_status}
                        onChange={(e) => handleInputChange(e, "user_status")}
                        options={
                          status?.map((status) => ({
                            value: status.value,
                            label: status.label,
                          })) || []
                        }
                        placeholder="Select Status"
                      />
                    </div>
                  )}
                  <div className="md:col-span-2">
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Address
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.resi_address}
                      onChange={(e) => handleInputChange(e, "resi_address")}
                      maxLength={800}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-row items-center gap-2 justify-end ">
              <Button
                type="submit"
                className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center mt-2`}
                disabled={submitLoading}
                loading={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}{" "}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center mt-2`}
              >
                Go Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default MemberForm;
