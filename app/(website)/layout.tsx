import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AdminBar from "@/components/admin/AdminBar";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="sticky top-0 z-50">
        <AdminBar />
        <Header />
      </div>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
