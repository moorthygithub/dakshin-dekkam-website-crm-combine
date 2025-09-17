import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { GET_COMPANY_DETAILS } from "@/api";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { setCompany } from "../redux/slices/companySlice";

const CompanyData = () => {
  const dispatch = useDispatch();
  const { data: eventdata, isLoading } = useGetApiMutation({
    url: GET_COMPANY_DETAILS,
    queryKey: ["companydata"],
  });

  useEffect(() => {
    if (eventdata?.data) {
      dispatch(setCompany(eventdata.data));
    }
  }, [eventdata, dispatch]);

  return <div></div>;
};

export default CompanyData;
