"use client";

import { useState, useEffect } from "react";
import {
    subscribeToCateringInquiries,
    CateringInquiry,
    updateCateringInquiryStatus
} from "@/lib/firebase-utils";
import {
    ClipboardList,
    Clock,
    User,
    Phone,
    Mail,
    CheckCircle,
    Loader2,
    Filter,
    Search,
    MessageSquare,
    Sparkles,
    CalendarCheck,
    ChefHat
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function InquiriesManagementPage() {
    const [inquiries, setInquiries] = useState<CateringInquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const unsubscribe = subscribeToCateringInquiries((data) => {
            setInquiries(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleStatusUpdate = async (id: string, status: CateringInquiry["status"]) => {
        try {
            await updateCateringInquiryStatus(id, status);
        } catch (error) {
            alert("Error updating status");
        }
    };

    const filteredInquiries = inquiries.filter(inquiry => {
        const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
        const matchesSearch = inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            inquiry.phone.includes(searchTerm);
        return matchesStatus && matchesSearch;
    });

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "confirmed": return "bg-green-500/10 text-green-500 border-green-500/20";
            case "contacted": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
            case "cancelled": return "bg-red-500/10 text-red-500 border-red-500/20";
            default: return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        }
    };

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <section className="bg-[#312e81] pt-8 pb-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.2em] mb-2 text-xs">
                            <span className="opacity-60">Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-amber-500">Inquiries Hub</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-white tracking-tight">
                            Event Logistics
                        </h1>
                        <p className="text-xs md:text-sm font-sans font-medium text-amber-100/40 max-w-2xl">
                            Transforming inquiries into unforgettable culinary experiences. Manage your event requests and catering logistics.
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
                                        placeholder="Search events. (e.g. Wedding, Birthday)"
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
                                        <option value="contacted" className="bg-[#2d251f]">Contacted</option>
                                        <option value="confirmed" className="bg-[#2d251f]">Confirmed</option>
                                        <option value="cancelled" className="bg-[#2d251f]">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Inquiries List */}
                        <div className="grid grid-cols-1 gap-6">
                            {loading ? (
                                <div className="bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4">
                                    <Loader2 className="animate-spin text-amber-600" size={32} />
                                    <span className="text-amber-900/50 font-bold uppercase tracking-widest text-xs">Listening for Event Requests...</span>
                                </div>
                            ) : filteredInquiries.length === 0 ? (
                                <div className="bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4 opacity-60 text-gray-400">
                                    <ClipboardList size={48} />
                                    <p className="text-lg font-bold">No catering inquiries found.</p>
                                </div>
                            ) : (
                                filteredInquiries.map((inquiry) => (
                                    <motion.div
                                        key={inquiry.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border border-amber-100 overflow-hidden group hover:border-amber-300 transition-all duration-500"
                                    >
                                        <div className="p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-10">
                                            <div className="space-y-8 flex-1">
                                                <div className="flex flex-wrap items-center gap-4">
                                                    <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(inquiry.status)}`}>
                                                        {inquiry.status}
                                                    </span>
                                                    <span className="text-sm text-gray-400 font-bold flex items-center gap-2">
                                                        <Clock size={16} className="text-amber-500" />
                                                        {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                                                    </span>
                                                    <span className="bg-indigo-500/10 text-indigo-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                                                        {inquiry.eventType}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                                    <div className="flex items-start gap-4">
                                                        <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                            <User size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Customer</p>
                                                            <p className="text-xl font-black text-black">{inquiry.name}</p>
                                                            <div className="flex flex-col gap-1 mt-1">
                                                                <a href={`tel:${inquiry.phone}`} className="text-sm text-gray-700 font-medium hover:text-amber-600 transition-colors flex items-center gap-2">
                                                                    <Phone size={14} /> {inquiry.phone}
                                                                </a>
                                                                <p className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                                                    <Mail size={14} /> {inquiry.email}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                            <CalendarCheck size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Event Details</p>
                                                            <p className="text-xl font-black text-black">{inquiry.date}</p>
                                                            <div className="flex items-center gap-3 mt-1">
                                                                <span className="text-sm text-amber-600 font-black uppercase tracking-widest bg-amber-50 px-3 py-1 rounded-lg italic text-xs">
                                                                    {inquiry.time || 'TBD'}
                                                                </span>
                                                                <span className="text-sm text-gray-700 font-bold">
                                                                    {inquiry.guests} Guests
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-start gap-4">
                                                        <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform duration-500">
                                                            <Sparkles size={24} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-1">Status Control</p>
                                                            <div className="relative">
                                                                <select
                                                                    value={inquiry.status}
                                                                    onChange={(e) => inquiry.id && handleStatusUpdate(inquiry.id, e.target.value as CateringInquiry["status"])}
                                                                    className="appearance-none w-full bg-amber-50 border border-amber-100 text-amber-900 px-4 py-2 pr-10 rounded-xl text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                                                                >
                                                                    <option value="pending">Pending</option>
                                                                    <option value="contacted">Contacted</option>
                                                                    <option value="confirmed">Confirmed</option>
                                                                    <option value="cancelled">Cancelled</option>
                                                                </select>
                                                                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" size={14} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {inquiry.message && (
                                                    <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 flex gap-6">
                                                        <MessageSquare className="text-amber-500 shrink-0" size={24} />
                                                        <div>
                                                            <p className="text-[10px] text-amber-900/40 uppercase font-black tracking-widest mb-3">Vision & Requirements</p>
                                                            <p className="text-base text-gray-700 leading-relaxed font-medium italic">&quot;{inquiry.message}&quot;</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="lg:w-48 shrink-0 flex items-end">
                                                <a
                                                    href={`tel:${inquiry.phone}`}
                                                    className="w-full bg-[#2d251f] hover:bg-black text-amber-500 px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-900/10"
                                                >
                                                    <Phone size={18} strokeWidth={3} />
                                                    Initiate Call
                                                </a>
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
