import type { Metadata } from "next";
import About from "@/components/pages/About";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Kiston Highway Restaurant, our story, quality promise, and authentic African cuisine served in Magamaga along Jinja–Busia Highway.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <About />;
}
