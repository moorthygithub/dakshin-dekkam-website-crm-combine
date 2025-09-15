import { DASHBOARD } from "@/api";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { Card, CardContent } from "@/crm/components/ui/card";
import { Settings2, Users } from "lucide-react";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import Page from "@/crm/app/page/page";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { MemoizedSelect } from "@/crm/components/common/MemoizedSelect";
import { useState, useMemo, useEffect } from "react";
import { ButtonConfig } from "@/crm/config/ButtonConfig";

const colors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-orange-600",
  "bg-indigo-600",
];

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

  const [formData, setFormData] = useState({
    branch_id: "",
  });

  const authBranchId = useSelector((state) => state.auth.branch_id);
  const navigate = useNavigate();

  // ✅ Build branchOptions from dashboard.upcomingEvent
  const branchOptions = useMemo(() => {
    if (!dashboard?.upcomingEvent) return [{ value: 0, label: "All Branches" }];

    const uniqueBranches = [
      ...new Map(
        dashboard.upcomingEvent.map((event) => [
          event.branch_id,
          {
            value: event.branch_id,
            label: event.branch_name || `Branch ${event.branch_id}`,
          },
        ])
      ).values(),
    ];

    return [{ value: 0, label: "All Branches" }, ...uniqueBranches];
  }, [dashboard]);

  // ✅ Set default branch from auth or fallback to "All Branches"
  useEffect(() => {
    if (branchOptions.length > 0) {
      const defaultBranch =
        branchOptions.find((b) => b.value === authBranchId) || branchOptions[0];
      setFormData((prev) => ({ ...prev, branch_id: defaultBranch.value }));
    }
  }, [branchOptions, authBranchId]);

  const handleInputChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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

  const stats = [
    {
      label: "Active Events",
      value: dashboard?.totalActiveEvent || 0,
      icon: <Settings2 className="h-6 w-6 text-blue-600" />,
      color: "from-blue-100 to-blue-200",
    },
    {
      label: "Active Members",
      value: dashboard?.totalActiveMember || 0,
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: "from-green-100 to-green-200",
    },
  ];

  const eventImageBase =
    dashboard?.image_url?.find((i) => i.image_for === "Event")?.image_url || "";

  // ✅ Filter events by branch_id (if not "All")
  const filteredEvents =
    formData.branch_id && formData.branch_id !== 0
      ? dashboard.upcomingEvent.filter(
          (event) => event.branch_id === formData.branch_id
        )
      : dashboard.upcomingEvent;

  return (
    <Page>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your events</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((item, idx) => (
                <Card
                  key={idx}
                  className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition"
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {item.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-full bg-gradient-to-br ${item.color} shadow-sm`}
                    >
                      {item.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chart Placeholder */}
            <Card className="h-64 flex items-center justify-center">
              <span className="text-muted-foreground">
                📊 Chart placeholder (Events / Members trend)
              </span>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4 max-h-screen overflow-y-auto">
            <h3 className="text-lg font-semibold">Upcoming Events</h3>

            {/* Branch Dropdown */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                >
                  Branch
                </label>
              </div>

              <MemoizedSelect
                value={formData.branch_id}
                onChange={(value) => handleInputChange(value, "branch_id")}
                options={branchOptions}
                placeholder="Select Branch"
              />
            </div>

            {/* Events */}
            <div className="space-y-4">
              {filteredEvents?.length > 0 ? (
                filteredEvents.map((event, index) => {
                  const eventDate = moment(event.event_from_date);
                  const day = eventDate.format("DD");
                  const month = eventDate.format("MMM");
                  const badgeColor = colors[index % colors.length];
                  return (
                    <Card
                      key={event.id}
                      className="overflow-hidden shadow-md hover:shadow-lg transition "
                    >
                      <div className="flex">
                        {/* Event Image */}
                        <div className="relative w-32 h-28 shrink-0">
                          <img
                            src={`${eventImageBase}${event.event_image}`}
                            alt={event.event_name}
                            className="object-cover w-full h-full"
                          />
                          {/* Date Badge */}
                          <div
                            className={`absolute top-2 left-2 ${badgeColor} text-white rounded-md px-2 py-1 text-center`}
                          >
                            <span className="block text-sm font-bold leading-tight">
                              {day}
                            </span>
                            <span className="block text-[10px] uppercase">
                              {month}
                            </span>
                          </div>
                        </div>

                        {/* Event Info */}
                        <CardContent className="p-4 flex flex-col justify-center">
                          <p className="font-semibold text-gray-800">
                            {event.event_name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {event.event_description}
                          </p>
                          <span
                            className="mt-2 inline-block text-xs font-medium text-blue-600 cursor-pointer"
                            onClick={() => navigate("/crm/event")}
                          >
                            View Details →
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
