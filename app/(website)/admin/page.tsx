import type { Metadata } from "next";
import AdminLogin from "@/components/admin/AdminLogin";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin login for Kiston Highway Restaurant content and booking management.",
  alternates: {
    canonical: "/admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
    return <AdminLogin />;
}
