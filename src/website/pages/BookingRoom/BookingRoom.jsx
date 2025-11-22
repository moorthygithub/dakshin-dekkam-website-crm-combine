import PageMeta from '@/website/components/common/PageMeta';
import HeroSub from '@/website/components/HeroSub';

import BookingRoomForm from './BookingRoomForm';

const BookingRoom = () => {
     const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/booking-room", text: "Booking Room" },
  ];
  return (
 <>
      <PageMeta title="Booking Room | Dhakshin Ekkam" />
      <HeroSub
        title="Booking Room"
        breadcrumbLinks={breadcrumbLinks}
      />
      <BookingRoomForm />
    </>
  )
}

export default BookingRoom


