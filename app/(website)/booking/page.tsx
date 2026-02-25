import type { Metadata } from "next";
import Booking from "@/components/pages/Booking";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Reserve a table at Kiston Highway Restaurant in Magamaga. Book quickly for stopovers, family meals, and group travel along Jinja–Busia Road.",
  alternates: {
    canonical: "/booking",
  },
};

export default function BookingPage() {
  return <Booking />;
}
