import { MEMBER_LIST } from "@/api";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";
import MemberTable from "@/crm/components/MemberTable/MemberTable";
import { useFetchMemberData } from "@/hooks/useApi";

const MemberInactiveList = () => {
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

  const allMembers = memberdata?.data || [];
  const activeMembers = allMembers.filter((m) => m.user_status === "Active");
  const inactiveMembers = allMembers.filter((m) => m.user_status !== "Active");

  return (
    <Page>
      <div className="w-full space-y-8">
        <MemberTable
          title="Inactive Members List"
          data={inactiveMembers}
          refetch={refetch}
          navigate={navigate}
        />
      </div>
    </Page>
  );
};
export default MemberInactiveList;
