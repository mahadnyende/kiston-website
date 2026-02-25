"use client";

import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    UtensilsCrossed,
    Calendar,
    Star,
    Settings,
    LogOut,
    Menu as MenuIcon,
    X,
    ClipboardList,
    ExternalLink
} from "lucide-react";
import { subscribeToBookings, subscribeToCateringInquiries } from "@/lib/firebase-utils";
import Footer from "@/components/layout/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [pendingBookings, setPendingBookings] = useState(0);
    const [pendingInquiries, setPendingInquiries] = useState(0);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const isAdminLoginPath = pathname === "/admin" || pathname === "/admin/";
        
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (!user && !isAdminLoginPath) {
                router.push("/admin");
            } else {
                setUser(user);
            }
            setLoading(false);
        });

        // Subscriptions for badges
        const unsubscribeBookings = subscribeToBookings((bookings) => {
            const pending = bookings.filter(b => b.status === 'pending').length;
            setPendingBookings(pending);
        });

        const unsubscribeInquiries = subscribeToCateringInquiries((inquiries) => {
            const pending = inquiries.filter(i => i.status === 'pending').length;
            setPendingInquiries(pending);
        });

        return () => {
            unsubscribeAuth();
            unsubscribeBookings();
            unsubscribeInquiries();
        };
    }, [router, pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/admin");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
            </div>
        );
    }

    const isAdminLoginPath = pathname === "/admin" || pathname === "/admin/";
    if (!user && !isAdminLoginPath) return null;
    if (!user && isAdminLoginPath) return <>{children}</>;

    const navigation = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
        { name: "Bookings", href: "/admin/bookings", icon: Calendar, badge: pendingBookings },
        { name: "Inquiries", href: "/admin/inquiries", icon: ClipboardList, badge: pendingInquiries },
        { name: "Testimonials", href: "/admin/testimonials", icon: Star },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white shadow-xl z-50 transition-transform duration-300 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
                <div className="h-full flex flex-col">
                    <div className="p-6 border-b flex items-center justify-between">
                        <Link href="/admin/dashboard" className="text-xl font-bold text-amber-600">
                            Kiston CMS
                        </Link>
                        <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                    flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                    ${isActive
                                            ? "bg-amber-50 text-amber-600"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-amber-600"}
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon size={20} />
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                    {item.badge !== undefined && item.badge > 0 && (
                                        <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t space-y-2">
                        <Link
                            href="/"
                            target="_blank"
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-amber-600 rounded-lg transition-colors"
                        >
                            <ExternalLink size={20} />
                            <span className="font-medium">View Live Site</span>
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6 lg:px-10">
                    <button
                        className="lg:hidden p-2 -ml-2 text-gray-600"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <MenuIcon size={24} />
                    </button>
                    <div className="flex items-center gap-4 ml-auto">
                        <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
                        <div className="h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-6 lg:p-10">
                    <div className="min-h-[calc(100vh-250px)]">
                        {children}
                    </div>
                    <div className="-mx-6 lg:-mx-10 mt-10">
                        <Footer />
                    </div>
                </div>
            </main>
        </div>
    );
}
