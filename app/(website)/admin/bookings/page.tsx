"use client";

import { useState, useEffect } from "react";
import {
    getBookings,
    updateBookingStatus,
    subscribeToBookings,
    Booking
} from "@/lib/firebase-utils";
import {
    Calendar,
    Clock,
    User,
    Phone,
    Mail,
    CheckCircle,
    XCircle,
    Loader2,
    Filter,
    Search,
    ChevronDown,
    Users,
    MessageSquareQuote
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function BookingsManagementPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeToBookings((data) => {
            setBookings(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusUpdate = async (id: string, status: Booking["status"]) => {
        try {
            await updateBookingStatus(id, status);
        } catch (error) {
            alert("Error updating status");
        }
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const matchesSearch = booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.phone.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const getStatusStyles = (status: Booking["status"]) => {
        switch (status) {
            case "confirmed": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        }
    };

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <section className="bg-[#064e3b] pt-8 pb-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.2em] mb-2 text-xs">
                            <span className="opacity-60">Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-amber-500">Bookings Hub</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-white tracking-tight">
                            Reservations Control
                        </h1>
                        <p className="text-xs md:text-sm font-sans font-medium text-amber-100/40 max-w-2xl">
                            Manage your guest bookings, seating arrangements, and ensure a flawless dining experience for every visitor.
                        </p>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
                    <div className="space-y-8">
                        {/* Control Bar */}
                        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between bg-[#2d251f] p-4 rounded-2xl shadow-2xl border border-white/10">
                            <div className="flex-1 flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search reservations..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="appearance-none pl-12 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all cursor-pointer text-sm"
                                    >
                                        <option value="all" className="bg-[#2d251f]">All Statuses</option>
                                        <option value="pending" className="bg-[#2d251f]">Pending</option>
                                        <option value="confirmed" className="bg-[#2d251f]">Confirmed</option>
                                        <option value="cancelled" className="bg-[#2d251f]">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Bookings List */}
                        <div className="grid grid-cols-1 gap-6">
                            {loading ? (
                                <div className="bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4">
                                    <Loader2 className="animate-spin text-amber-600" size={32} />
                                    <span className="text-amber-900/50 font-bold uppercase tracking-widest text-xs">Refreshing Guest List...</span>
                                </div>
                            ) : filteredBookings.length === 0 ? (
                                <div className="bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4 opacity-60 text-gray-400">
                                    <Calendar size={48} />
                                    <p className="text-lg font-bold">No reservations found matching your criteria.</p>
                                </div>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <motion.div
                                        key={booking.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border border-amber-100 overflow-hidden group hover:border-amber-300 transition-all duration-500"
                                    >
                                        <div className="p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-10">
                                            <div className="space-y-8 flex-1">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                    <span className="text-sm text-gray-400 font-bold flex items-center gap-2">
                                                        <Clock size={16} className="text-amber-500" />
                                                        Placed on {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                            <User size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Customer</p>
                                                            <p className="text-xl font-black text-black">{booking.name}</p>
                                                            <div className="flex flex-col gap-1 mt-1">
                                                                <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                                                    <Phone size={14} /> {booking.phone}
                                                                </p>
                                                                <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                                                    <Mail size={14} /> {booking.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                            <Calendar size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Reservation</p>
                                                            <p className="text-xl font-black text-black">{booking.date}</p>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <span className="text-sm text-amber-600 font-black uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-lg italic">
                                                                    {booking.time}
                                                                </span>
                                                                <span className="text-sm text-gray-700 font-bold flex items-center gap-2">
                                                                    <Users size={16} /> {booking.guests} Guests
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {booking.specialRequests ? (
                                                        <div className="flex items-start gap-4 col-span-1 md:col-span-2 lg:col-span-1">
                                                            <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                                <MessageSquareQuote size={24} />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Special Requests</p>
                                                                <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 italic">
                                                                    <p className="text-sm text-amber-900/70 font-medium leading-relaxed">&quot;{booking.specialRequests}&quot;</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-center p-8 border-2 border-dashed border-amber-50 rounded-[2rem] opacity-30">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-amber-900">No Special Requests</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex flex-row lg:flex-col gap-4 lg:w-48 shrink-0">
                                                {booking.status !== "confirmed" && (
                                                    <button
                                                        onClick={() => booking.id && handleStatusUpdate(booking.id, "confirmed")}
                                                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/10"
                                                    >
                                                        <CheckCircle size={18} strokeWidth={3} />
                                                        Confirm
                                                    </button>
                                                )}
                                                {booking.status !== "cancelled" && (
                                                    <button
                                                        onClick={() => booking.id && handleStatusUpdate(booking.id, "cancelled")}
                                                        className="flex-1 bg-white hover:bg-red-50 border border-red-100 text-red-500 px-6 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 hover:border-red-200"
                                                    >
                                                        <XCircle size={18} strokeWidth={3} />
                                                        Cancel
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthGuard>
    );
}
