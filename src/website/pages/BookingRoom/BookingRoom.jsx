import PageMeta from "@/website/components/common/PageMeta";
import HeroSub from "@/website/components/HeroSub";

import BookingRoomForm from "./BookingRoomForm";

const BookingRoom = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/booking-room", text: "Hall Booking" },
  ];
  return (
    <>
      <PageMeta title="Hall Booking | Dhakshin Ekkam" />
      <HeroSub title="Hall Booking" breadcrumbLinks={breadcrumbLinks} />
      <BookingRoomForm />
    </>
  );
};

export default BookingRoom;
