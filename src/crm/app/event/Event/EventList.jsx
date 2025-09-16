import { EVENT } from "@/api";
import Page from "@/crm/app/page/page";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/crm/components/ui/dialog";
import { Input } from "@/crm/components/ui/input";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { encryptId } from "@/crm/utils/encyrption/Encyrption";
import { Search, SquarePlus } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EventMemberTrackForm from "../EventMemberTrack/EventMemberTrackForm";
import EventTrackQRScanner from "../EventMemberTrack/EventTrackQRScanner";
import EventListCard from "./EventCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/crm/components/ui/select";
import { useSelector } from "react-redux";

const EventList = () => {
  const [open, setOpen] = useState(false);
  const [selectedId, setSelected] = useState(null);
  const [openQrDialog, setOpenQrDialog] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [NoofMember, setNoofMember] = useState(null);
  const [eventId, setEventId] = useState(null);
  const userType = useSelector((state) => state.auth.user_type);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [branchId, setBranchId] = useState(0);
  const itemsPerPage = 9;
  const authBranchId = useSelector((state) => state.auth.branch_id);

  const [imageUrls, setImageUrls] = useState({
    userImageBase: "",
    noImage: "",
  });

  const {
    data: eventdata,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: EVENT,
    queryKey: ["eventdata"],
  });

  useEffect(() => {
    if (!eventdata) return;
    const userImageObj = eventdata?.image_url?.find(
      (img) => img.image_for === "Event"
    );
    const noImageObj = eventdata?.image_url?.find(
      (img) => img.image_for === "No Image"
    );

    setImageUrls({
      userImageBase: userImageObj?.image_url || "",
      noImage: noImageObj?.image_url || "",
    });
  }, [eventdata]);

  const navigate = useNavigate();

  const handleScannerClose = () => {
    setOpenQrDialog(false);
    setScanning(false);
  };

  const handleScanner = (user) => {
    setEventId(user.id);
    setNoofMember(user.event_no_member_allowed);
    setOpenQrDialog(true);
    setScanning(true);
  };

  const filteredData = useMemo(() => {
    if (!eventdata?.data) return [];

    return eventdata.data.filter((event) => {
      const matchesSearch = event.event_name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesBranch =
        branchId === 0 || event.branch_id === Number(branchId);

      return matchesSearch && matchesBranch;
    });
  }, [eventdata, search, branchId]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

  const branchOptions = useMemo(() => {
    if (!eventdata?.branch) return [{ value: 0, label: "All Branches" }];

    return [
      { value: 0, label: "All Branches" },
      ...eventdata.branch.map((b) => ({
        value: b.id,
        label: b.branch_name || `Branch ${b.id}`,
      })),
    ];
  }, [eventdata]);
  useEffect(() => {
    if (branchOptions.length > 0) {
      const defaultBranch =
        branchOptions.find((b) => b.value === authBranchId) || branchOptions[0];
      setBranchId(defaultBranch.value);
    }
  }, [branchOptions, authBranchId]);

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Event Data" refetch={refetch} />
    );

  return (
    <Page>
      <div className="w-full">
        <div className="flex text-left text-2xl text-gray-800 font-[400]">
          Event List
        </div>

        <div className="flex items-center justify-between w-full py-4">
          {/* Search */}
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search Event..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-8 bg-gray-50 border-gray-200 focus:border-gray-300 focus:ring-gray-200"
            />
          </div>

          <div className="flex items-center">
            {userType === 3 && (
              <Select
                value={String(branchId)}
                onValueChange={(value) => {
                  setBranchId(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-full md:w-48 h-9 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {branchOptions.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <Button
              variant="default"
              className={`ml-2 ${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor}`}
              onClick={() => navigate("/crm/event-form")}
            >
              <SquarePlus className="h-4 w-4 mr-1" /> Events
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {paginatedData.map((event) => (
            <EventListCard
              key={event.id}
              event={event}
              onEdit={(id) =>
                navigate(`/crm/event-form/${encodeURIComponent(encryptId(id))}`)
              }
              onTrack={() => {
                setSelected(null);
                setOpen(true);
              }}
              refetch={refetch}
              onScan={handleScanner}
              onAttend={(id) =>
                navigate(
                  `/crm/event-member-attend/${encodeURIComponent(
                    encryptId(id)
                  )}`
                )
              }
              imageUrls={imageUrls}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Total Events : {filteredData.length}
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages || totalPages === 0}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {open && (
        <EventMemberTrackForm
          setOpen={setOpen}
          open={open}
          selectedId={selectedId}
          refetch={refetch}
        />
      )}

      {/* QR Scanner */}
      <Dialog open={openQrDialog} onOpenChange={handleScannerClose}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Scan</DialogTitle>
          </DialogHeader>
          <EventTrackQRScanner
            eventId={eventId}
            setOpenQrDialog={setOpenQrDialog}
            setScanning={setScanning}
            scanning={scanning}
            NoofMember={NoofMember}
          />
        </DialogContent>
      </Dialog>
    </Page>
  );
};

export default EventList;
