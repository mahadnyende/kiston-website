import type { Metadata } from "next";
import Facilities from "@/components/pages/Facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "See facilities at Kiston Highway Restaurant: secure parking, clean washrooms, family areas, outdoor seating, and safe stopover amenities.",
  alternates: {
    canonical: "/facilities",
  },
};

export default function FacilitiesPage() {
  return <Facilities />;
}
