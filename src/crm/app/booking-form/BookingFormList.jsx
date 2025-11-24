




import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";

import { useFetchBookingFormData } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import Page from "../page/page";
import BookingFormTable from "@/crm/components/BookingFormTable/BookingFormTable";

const BookingFormList = () => {
  const {
    data: bookingFormData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookingFormData();
  const navigate = useNavigate();

  if (isLoading) return <LoaderComponent />;
  if (isError)
    return (
      <ErrorComponent message="Error Fetching Booking Form Data" refetch={refetch} />
    );

  
  return (
    <Page>
      <div className="w-full space-y-8">
        <BookingFormTable
          title="Booking Form List"
          data={bookingFormData.data}
          refetch={refetch}
          navigate={navigate}
        />
      </div>
    </Page>
  );
};
export default BookingFormList;
