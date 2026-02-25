"use client";

import { useState, useEffect } from "react";
import {
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    subscribeToTestimonials,
    Testimonial
} from "@/lib/firebase-utils";
import {
    Plus,
    Search,
    Edit2,
    Trash2,
    Star,
    Loader2,
    X,
    CheckCircle2,
    MessageSquare,
    Quote,
    Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<Testimonial, "id" | "createdAt">>({
        name: "",
        text: "",
        rating: 5,
        featured: false,
    });

    useEffect(() => {
        const unsubscribe = subscribeToTestimonials((data) => {
            setTestimonials(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem?.id) {
                await updateTestimonial(editingItem.id, formData);
            } else {
                await addTestimonial(formData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            resetForm();
        } catch (error) {
            alert("Error saving testimonial");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this testimonial?")) {
            try {
                await deleteTestimonial(id);
            } catch (error) {
                alert("Error deleting testimonial");
            }
        }
    };

    const toggleFeatured = async (item: Testimonial) => {
        if (!item.id) return;
        try {
            await updateTestimonial(item.id, { featured: !item.featured });
        } catch (error) {
            alert("Error updating status");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            text: "",
            rating: 5,
            featured: false,
        });
    };

    const openEditModal = (item: Testimonial) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            text: item.text,
            rating: item.rating,
            featured: item.featured,
        });
        setIsModalOpen(true);
    };

    const filteredTestimonials = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <section className="bg-[#4c1d95] pt-8 pb-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.2em] mb-2 text-xs">
                            <span className="opacity-60">Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-amber-500">Reviews & Feedback</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-white tracking-tight">
                            Voice of Guests
                        </h1>
                        <p className="text-xs md:text-sm font-sans font-medium text-amber-100/40 max-w-2xl">
                            Curating experiences and celebrating the feedback that drives our excellence forward.
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
                                        placeholder="Search by name or content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setEditingItem(null);
                                        setIsModalOpen(true);
                                    }}
                                    className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 shadow-xl shadow-amber-900/10"
                                >
                                    <Plus size={18} />
                                    Create Manual Review
                                </button>
                            </div>
                        </div>

                        {/* Testimonials Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {loading ? (
                                <div className="col-span-full bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4">
                                    <Loader2 className="animate-spin text-amber-600" size={32} />
                                    <span className="text-amber-900/50 font-bold uppercase tracking-widest text-xs">Retrieving the Voice of Guests...</span>
                                </div>
                            ) : filteredTestimonials.length === 0 ? (
                                <div className="col-span-full bg-white p-16 rounded-[2rem] shadow-2xl shadow-amber-900/5 border border-amber-100 flex flex-col items-center gap-4 opacity-60 text-gray-400">
                                    <MessageSquare size={48} />
                                    <p className="text-lg font-bold">No testimonials found matching your search.</p>
                                </div>
                            ) : (
                                filteredTestimonials.map((t) => (
                                    <motion.div
                                        key={t.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border overflow-hidden group hover:border-amber-300 transition-all duration-500 flex flex-col ${t.featured ? 'border-amber-200' : 'border-amber-50'}`}
                                    >
                                        <div className="p-8 lg:p-10 flex flex-col h-full space-y-6">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 bg-[#2d251f] rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                                                        <Quote size={24} />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-black text-black">{t.name}</h3>
                                                        <div className="flex gap-1 text-amber-500 mt-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star key={i} size={14} fill={i < t.rating ? "currentColor" : "none"} strokeWidth={3} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openEditModal(t)}
                                                        className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => t.id && handleDelete(t.id)}
                                                        className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex-1">
                                                <p className="text-gray-900 italic font-medium leading-[1.8] text-lg">&quot;{t.text}&quot;</p>
                                            </div>

                                            <div className="flex items-center justify-between pt-6 border-t border-amber-100/50">
                                                <button
                                                    onClick={() => toggleFeatured(t)}
                                                    className={`text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full flex items-center gap-2.5 transition-all shadow-lg ${
                                                        t.featured 
                                                        ? 'bg-amber-600 text-white shadow-amber-600/20' 
                                                        : 'bg-white text-gray-400 border border-gray-100 hover:border-amber-300 hover:text-amber-600 shadow-none'
                                                    }`}
                                                >
                                                    {t.featured ? <CheckCircle2 size={14} strokeWidth={3} /> : <Star size={14} strokeWidth={3} />}
                                                    {t.featured ? 'Featured Live' : 'Not Featured'}
                                                </button>
                                                <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                                    {t.createdAt instanceof Date ? t.createdAt.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }) : 'Verified Feedback'}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsModalOpen(false)}
                                className="absolute inset-0 bg-[#2d251f]/80 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden border border-white/20"
                            >
                                <div className="p-10 border-b border-gray-100 flex items-center justify-between bg-amber-50/30">
                                    <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                                        {editingItem ? "Refine Feedback" : "Add Guest Experience"}
                                    </h2>
                                    <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white shadow-sm rounded-full transition-all text-gray-400 hover:text-red-500 hover:rotate-90">
                                        <X size={20} strokeWidth={3} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-1">Guest Identification</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all font-bold"
                                            placeholder="Enter guest name..."
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-1">Testimonial Content</label>
                                        <textarea
                                            rows={5}
                                            required
                                            value={formData.text}
                                            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none resize-none transition-all font-medium italic"
                                            placeholder="Translate their experience into words..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-amber-900/40 ml-1">Satisfaction Rating</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.rating}
                                                    onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                                                    className="appearance-none w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:ring-2 focus:ring-amber-500 focus:bg-white outline-none transition-all font-black cursor-pointer"
                                                >
                                                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                                </select>
                                                <Star className="absolute right-6 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" size={18} fill="currentColor" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-end pb-4">
                                            <label className="flex items-center gap-4 cursor-pointer group">
                                                <div className={`w-6 h-6 rounded-lg border-2 transition-all flex items-center justify-center ${formData.featured ? 'bg-amber-600 border-amber-600' : 'bg-gray-50 border-gray-200 group-hover:border-amber-400'}`}>
                                                    {formData.featured && <CheckCircle2 size={14} className="text-white" strokeWidth={4} />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    checked={formData.featured}
                                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                                    className="hidden"
                                                />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 group-hover:text-amber-600 transition-colors">Surface on Live Site</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpen(false)}
                                            className="flex-1 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all"
                                        >
                                            Discard
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-[2] py-5 bg-[#2d251f] hover:bg-black text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-900/10 transition-all font-bold"
                                        >
                                            {editingItem ? "Update Voice" : "Commit to Site"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </AdminAuthGuard>
    );
}
