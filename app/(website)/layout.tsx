import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "Kiston Highway Restaurant",
    template: "%s | Kiston Highway Restaurant",
  },
  description:
    "Kiston Highway Restaurant in Magamaga along Jinja–Busia Highway: authentic African cuisine, secure parking, clean washrooms, and catering services.",
  alternates: {
    canonical: "/",
  },
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <Header />
      </div>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
