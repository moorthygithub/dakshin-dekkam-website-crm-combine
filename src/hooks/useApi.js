import { BOOKING_FORM_LIST, BOOKING_HALL_LIST, MEMBER_LIST } from "@/api";
import { useGetApiMutation } from "./useGetApiMutation";

// ---------------New
export const useFetchBloodGroup = () => {
  return useGetApiMutation({
    url: "/panel-fetch-blood-group",
    queryKey: ["bloodGroup"],
  });
};
export const useFetchPayment = () => {
  return useGetApiMutation({
    url: "/panel-fetch-payment-mode",
    queryKey: ["payment"],
  });
};
export const useFetchOccupation = () => {
  return useGetApiMutation({
    url: "/panel-fetch-occupation",
    queryKey: ["occupation"],
  });
};
export const useFetchBranch = () => {
  return useGetApiMutation({
    url: "/panel-fetch-branch",
    queryKey: ["branch"],
  });
};
export const useFetchMemberData = () => {
  return useGetApiMutation({
    url: MEMBER_LIST,
    queryKey: ["memberdata"],
  });
};
export const useFetchBookingFormData = () => {
  return useGetApiMutation({
    url: BOOKING_FORM_LIST,
    queryKey: ["bookingFormData"],
  });
};
export const useFetchBookingHallData = () => {
  return useGetApiMutation({
    url: BOOKING_HALL_LIST,
    queryKey: ["bookingHallData"],
  });
};
