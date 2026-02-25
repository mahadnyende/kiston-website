import type { Metadata } from "next";
import Menu from "@/components/pages/Menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse Kiston Highway Restaurant menu: beef pilau, katogo, tilapia, snacks, drinks, and more Ugandan dishes on Jinja–Busia Highway.",
  alternates: {
    canonical: "/menu",
  },
};

export default function MenuPage() {
  return <Menu />;
}
