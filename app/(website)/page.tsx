import type { Metadata } from "next";
import Home from "@/components/pages/Home";

export const metadata: Metadata = {
  title: "Highway Restaurant in Magamaga",
  description:
    "Kiston Highway Restaurant in Magamaga on Jinja–Busia Highway. Authentic African cuisine, clean washrooms, secure parking, and quick stopover meals.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <Home />;
}
