







import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";

import {  useFetchLoanFormData } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";
import LoanFormTable from "./LoanFormTable";

const LoanForm = () => {
  const {
    data: LoanFormData,
    isLoading,
    isError,
    refetch,
  } = useFetchLoanFormData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Loan Form Data" refetch={refetch} />
    );

  
  return (
    <Page>
      <div className="w-full space-y-8">
        <LoanFormTable
          title="Loan Form List"
          data={LoanFormData.data}
          refetch={refetch}
          navigate={navigate}
        />
      </div>
    </Page>
  );
};
export default LoanForm;
