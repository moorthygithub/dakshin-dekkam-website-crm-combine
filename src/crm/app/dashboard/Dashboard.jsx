import { DASHBOARD } from "@/api";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { Card, CardContent } from "@/crm/components/ui/card";
import { Users } from "lucide-react";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import Page from "@/crm/app/page/page";

const Dashboard = () => {
  const {
    data: dashboard,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: DASHBOARD,
    queryKey: ["dashboard"],
  });
  if (isLoading) {
    return <LoaderComponent name="Dashboard Data" />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message="Error Fetching Dashboard Data"
        refetch={refetch}
      />
    );
  }

  const getWasteColor = (percentage) => {
    if (percentage > 10) return "text-red-600";
    if (percentage > 7) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <Page>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your events</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    ActiveEvent
                  </p>
                  <p className="text-2xl font-bold">
                    {dashboard?.totalActiveEvent || 0}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
