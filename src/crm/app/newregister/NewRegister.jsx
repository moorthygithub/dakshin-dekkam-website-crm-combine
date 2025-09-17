import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import MemberTable from "@/crm/components/MemberTable/MemberTable";
import { useFetchMemberData } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";

const NewRegister = () => {
  const {
    data: memberdata,
    isLoading,
    isError,
    refetch,
  } = useFetchMemberData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Member Data" refetch={refetch} />
    );

  const filteredData = memberdata?.data?.filter(
    (item) => item.user_status === "New"
  );
  return (
    <Page>
      <div className="w-full space-y-8">
        <MemberTable
          title="New Register List"
          data={filteredData}
          refetch={refetch}
          navigate={navigate}
          type="new"
        />
      </div>
    </Page>
  );
};
export default NewRegister;
