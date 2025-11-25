import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";


import { useNavigate } from "react-router-dom";

import BookingHallList from "./BookingHallList";
import { useFetchBookingHallData } from "@/hooks/useApi";
import Page from "@/crm/app/page/page";


const BookingHall = () => {
 const {
    data: bookingHallData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookingHallData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Hall Booking Data" refetch={refetch} />
    );

  return (
    <Page>
      <div className="w-full space-y-8">
        <BookingHallList
          title="Hall Booking List"
          data={bookingHallData.data}
          refetch={refetch}
          navigate={navigate}
        />
      </div>
    </Page>
  );
};

export default BookingHall;