import type { Metadata } from "next";
import Services from "@/components/pages/Services";

export const metadata: Metadata = {
  title: "Catering Services",
  description:
    "Corporate catering, event catering, group meals, and takeaway services by Kiston Highway Restaurant near Jinja and Magamaga.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <Services />;
}
