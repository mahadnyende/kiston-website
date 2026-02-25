"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    ShoppingBag,
    MessageSquare,
    TrendingUp,
    Clock,
    ArrowRight,
    Star,
    LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { 
    subscribeToBookings, 
    subscribeToCateringInquiries, 
    subscribeToContactMessages,
    Booking,
    CateringInquiry,
    ContactMessage
} from "@/lib/firebase-utils";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function DashboardPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [inquiries, setInquiries] = useState<CateringInquiry[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeBookings = subscribeToBookings(setBookings);
        const unsubscribeInquiries = subscribeToCateringInquiries(setInquiries);
        const unsubscribeMessages = subscribeToContactMessages(setMessages);

        setLoading(false);

        return () => {
            unsubscribeBookings();
            unsubscribeInquiries();
            unsubscribeMessages();
        };
    }, []);

    const stats = [
        { 
            name: "Total Bookings", 
            value: bookings.length.toString(), 
            icon: ShoppingBag, 
            color: "text-amber-600", 
            bg: "bg-amber-50" 
        },
        { 
            name: "Catering Inquiries", 
            value: inquiries.length.toString(), 
            icon: Users, 
            color: "text-amber-700", 
            bg: "bg-amber-100/50" 
        },
        { 
            name: "Unread Messages", 
            value: messages.filter(m => m.status === 'unread').length.toString(), 
            icon: MessageSquare, 
            color: "text-amber-800", 
            bg: "bg-amber-200/30" 
        },
        { 
            name: "Confirmed Events", 
            value: bookings.filter(b => b.status === 'confirmed').length.toString(), 
            icon: TrendingUp, 
            color: "text-green-600", 
            bg: "bg-green-50" 
        },
    ];

    const recentBookings = bookings.slice(0, 5);

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <section className="bg-[#2d251f] pt-8 pb-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.2em] mb-2 text-xs">
                            <span className="opacity-60">Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-amber-500">Dashboard</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-white tracking-tight">
                            Management Hub
                        </h1>
                        <p className="text-xs md:text-sm font-sans font-medium text-amber-100/40 max-w-2xl">
                            Real-time overview of your restaurant&apos;s digital ecosystem and performance.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
                    <div className="space-y-12">
                        {/* Highlights Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-white p-6 rounded-[2rem] shadow-xl shadow-amber-900/5 border border-amber-50 group transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-0.5">{stat.name}</p>
                                                <p className="text-xl font-black text-black tabular-nums">{stat.value}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Activity Card */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-amber-900/5 border border-amber-100">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-playfair)] tracking-tight">Recent Activity</h2>
                                    <Link href="/admin/bookings" className="text-amber-600 text-sm font-bold hover:text-amber-700 flex items-center gap-2 transition-colors">
                                        All Details <ArrowRight size={16} />
                                    </Link>
                                </div>

                                {recentBookings.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center py-16 text-gray-300">
                                        <Clock size={48} strokeWidth={1.5} className="mb-4 opacity-50 text-gray-400" />
                                        <p className="text-sm font-medium text-gray-500">No recent bookings to display.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {recentBookings.map((booking) => (
                                            <div key={booking.id} className="group flex items-center justify-between p-5 rounded-2xl border border-gray-50 hover:border-amber-100 hover:bg-amber-50/30 transition-all duration-300">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-12 h-12 rounded-xl bg-[#2d251f] text-amber-500 flex items-center justify-center font-bold text-lg shadow-lg">
                                                        {booking.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">{booking.name}</p>
                                                        <p className="text-sm text-gray-500 font-medium">{booking.date} • {booking.time}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                                                        'bg-amber-100 text-amber-700'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Quick Branded Actions */}
                            <div className="space-y-6">
                                <div className="bg-[#2d251f] p-8 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="text-xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Quick Actions</h3>
                                        <div className="space-y-3">
                                            <Link
                                                href="/admin/menu"
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-amber-500 text-[#2d251f] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <ShoppingBag size={20} />
                                                </div>
                                                <span className="font-bold text-sm tracking-wide">Update Menu</span>
                                            </Link>
                                            <Link
                                                href="/admin/testimonials"
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                            >
                                                <div className="w-10 h-10 rounded-xl bg-amber-500 text-[#2d251f] flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Star size={20} />
                                                </div>
                                                <span className="font-bold text-sm tracking-wide">Manage Reviews</span>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* Decorative flare */}
                                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>
                                </div>

                                <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100">
                                    <h4 className="text-amber-800 font-bold mb-2 text-sm uppercase tracking-widest">Support Tip</h4>
                                    <p className="text-amber-900/70 text-sm leading-relaxed">
                                        Check your unread inquiries regularly to ensure a 5-star customer service rating.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthGuard>
    );
}
