"use client";

import { useState, useEffect } from "react";
import {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    subscribeToMenuItems,
    MenuItem
} from "@/lib/firebase-utils";
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    Edit2,
    Trash2,
    ToggleLeft,
    ToggleRight,
    Loader2,
    Image as ImageIcon,
    UtensilsCrossed,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function MenuManagementPage() {
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    // Form State
    const [formData, setFormData] = useState<Omit<MenuItem, "id">>({
        name: "",
        category: "Main Meals",
        description: "",
        price: 0,
        image: "",
        available: true,
        ingredients: [],
    });

    const categories = ["Main Meals", "Local Specialties", "Snacks", "Soft Drinks", "Alcoholic Drinks"];

    useEffect(() => {
        const unsubscribe = subscribeToMenuItems((data) => {
            setItems(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem?.id) {
                await updateMenuItem(editingItem.id, formData);
            } else {
                await addMenuItem(formData);
            }
            setIsModalOpen(false);
            setEditingItem(null);
            resetForm();
        } catch (error) {
            alert("Error saving menu item");
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this item?")) {
            try {
                await deleteMenuItem(id);
            } catch (error) {
                alert("Error deleting item");
            }
        }
    };

    const toggleAvailability = async (item: MenuItem) => {
        if (!item.id) return;
        try {
            await updateMenuItem(item.id, { available: !item.available });
        } catch (error) {
            alert("Error updating availability");
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            category: "Main Meals",
            description: "",
            price: 0,
            image: "",
            available: true,
            ingredients: [],
        });
    };

    const openEditModal = (item: MenuItem) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
            image: item.image,
            available: item.available,
            ingredients: item.ingredients || [],
        });
        setIsModalOpen(true);
    };

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <AdminAuthGuard>
            <div className="min-h-screen bg-white">
                {/* Header Section */}
                <section className="bg-[#1e293b] pt-8 pb-6 border-b border-white/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.2em] mb-2 text-xs">
                            <span className="opacity-60">Admin</span>
                            <span className="text-white/20">/</span>
                            <span className="text-amber-500">Menu Management</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold mb-2 font-[family-name:var(--font-playfair)] text-white tracking-tight">
                            Menu CMS
                        </h1>
                        <p className="text-xs md:text-sm font-sans font-medium text-amber-100/40 max-w-2xl">
                            Curate your culinary offerings and keep your diners informed about daily specials and permanent favorites.
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
                                        placeholder="Find a dish..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:ring-2 focus:ring-amber-500 outline-none transition-all text-sm"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <select
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value)}
                                        className="appearance-none pl-12 pr-10 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all cursor-pointer text-sm"
                                    >
                                        <option value="all" className="bg-[#2d251f]">All Categories</option>
                                        {categories.map(c => <option key={c} value={c} className="bg-[#2d251f]">{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => {
                                    resetForm();
                                    setEditingItem(null);
                                    setIsModalOpen(true);
                                }}
                                className="bg-amber-500 hover:bg-amber-600 text-[#2d251f] px-6 py-2 rounded-xl flex items-center justify-center gap-2 transition-all font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 text-xs"
                            >
                                <Plus size={24} strokeWidth={3} />
                                Add New Dish
                            </button>
                        </div>

                        {/* Menu Table/Grid */}
                        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-amber-900/5 border border-amber-100 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-amber-50/50">
                                            <th className="px-8 py-6 text-xs font-black text-amber-900 uppercase tracking-widest">Dish Information</th>
                                            <th className="px-8 py-6 text-xs font-black text-amber-900 uppercase tracking-widest hidden md:table-cell">Category</th>
                                            <th className="px-8 py-6 text-xs font-black text-amber-900 uppercase tracking-widest">Price</th>
                                            <th className="px-8 py-6 text-xs font-black text-amber-900 uppercase tracking-widest">Availability</th>
                                            <th className="px-8 py-6 text-xs font-black text-amber-900 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-amber-100/50">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-32 text-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <Loader2 className="animate-spin text-amber-600" size={48} />
                                                        <span className="text-amber-900/50 font-bold uppercase tracking-widest">Loading Kitchen Data...</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : filteredItems.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-16 text-center">
                                                    <div className="flex flex-col items-center gap-4 opacity-50 text-gray-400">
                                                        <ImageIcon size={48} />
                                                        <p className="text-lg font-bold">No dishes found matching your search.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredItems.map((item) => (
                                                <tr key={item.id} className="group hover:bg-amber-50/30 transition-all duration-300">
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-5">
                                                            <div className="h-16 w-16 bg-[#2d251f] rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-900/10 group-hover:scale-105 transition-transform duration-300">
                                                                {item.image || <ImageIcon size={24} className="text-amber-500/30" />}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-black text-lg mb-1">{item.name}</p>
                                                                <p className="text-sm text-gray-700 line-clamp-1 font-medium italic">{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6 text-sm font-bold text-amber-800 uppercase tracking-wide hidden md:table-cell">
                                                        <span className="bg-amber-100 px-3 py-1 rounded-lg">{item.category}</span>
                                                    </td>
                                                    <td className="px-8 py-6 text-xl font-black text-black">
                                                        <span className="text-amber-600 text-sm font-bold mr-1">$</span>
                                                        {item.price}
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <button
                                                            onClick={() => toggleAvailability(item)}
                                                            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all ${
                                                                item.available 
                                                                ? "bg-green-100 text-green-700 hover:bg-green-200" 
                                                                : "bg-red-100 text-red-700 hover:bg-red-200"
                                                            }`}
                                                        >
                                                            {item.available ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                                                            {item.available ? "Active" : "Hidden"}
                                                        </button>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center justify-end gap-3">
                                                            <button
                                                                onClick={() => openEditModal(item)}
                                                                className="p-3 text-gray-400 hover:text-amber-600 bg-gray-50 hover:bg-amber-50 rounded-xl transition-all"
                                                            >
                                                                <Edit2 size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => item.id && handleDelete(item.id)}
                                                                className="p-3 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
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
                                className="absolute inset-0 bg-[#2d251f]/80 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-amber-100"
                            >
                                <div className="px-10 py-8 border-b border-amber-50 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-black text-black font-[family-name:var(--font-playfair)]">
                                            {editingItem ? "Edit Recipe" : "New Creation"}
                                        </h2>
                                        <p className="text-sm text-gray-700 font-medium">Define your dish details below.</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gray-50 hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all">
                                        <X size={24} strokeWidth={3} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-amber-900 uppercase tracking-widest pl-1">Dish Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-amber-900 uppercase tracking-widest pl-1">Category</label>
                                            <div className="relative">
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full appearance-none px-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-bold cursor-pointer"
                                                >
                                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                                </select>
                                                <Filter className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" size={18} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-amber-900 uppercase tracking-widest pl-1">Story & Description</label>
                                        <textarea
                                            rows={4}
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full px-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-medium resize-none"
                                            placeholder="Tell the story of this dish..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-amber-900 uppercase tracking-widest pl-1">Price</label>
                                            <div className="relative">
                                                <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-amber-600">$</span>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    value={formData.price}
                                                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                                    className="w-full pl-10 pr-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all font-black"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-amber-900 uppercase tracking-widest pl-1">Representative Emoji</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. 🍗"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                className="w-full px-5 py-4 bg-amber-50/50 border border-amber-100 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all text-2xl text-center"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 bg-amber-50 p-6 rounded-2xl border border-amber-100">
                                        <input
                                            type="checkbox"
                                            id="available"
                                            checked={formData.available}
                                            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                                            className="h-6 w-6 text-amber-600 focus:ring-amber-500/20 border-amber-200 rounded-lg cursor-pointer transition-all"
                                        />
                                        <div>
                                            <label htmlFor="available" className="text-sm font-black text-amber-900 uppercase tracking-widest cursor-pointer">Live Availability</label>
                                            <p className="text-xs text-amber-700/60 font-medium">Uncheck to mark as &apos;Sold Out&apos; on the public site.</p>
                                        </div>
                                    </div>
                                </form>

                                <div className="px-10 py-8 border-t bg-amber-50/30 flex justify-end gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-8 py-4 text-xs font-black uppercase tracking-widest text-amber-900/40 hover:text-amber-900 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-10 py-4 bg-[#2d251f] hover:bg-black text-amber-500 rounded-2xl transition-all font-black uppercase tracking-widest shadow-xl shadow-amber-900/10"
                                    >
                                        {editingItem ? "Update Recipe" : "Commit to Menu"}
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(224, 123, 34, 0.1);
                        border-radius: 20px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: rgba(224, 123, 34, 0.2);
                    }
                `}</style>
            </div>
        </AdminAuthGuard>
    );
}
