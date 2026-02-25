"use client";

import { useState } from "react";
import { 
    Settings, 
    Save, 
    Bell, 
    Utensils, 
    Users, 
    CreditCard, 
    Info,
    Clock,
    ShieldCheck,
    Globe,
    Lock
} from "lucide-react";
import { motion } from "framer-motion";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

export default function SettingsPage() {
    const [formData, setFormData] = useState({
        restaurantName: "Kiston Highway Restaurant",
        email: "info@kistonhighway.com",
        phone: "+256 700 102281",
        address: "Magamaga, along Jinja-Busia Highway",
        operatingHours: "Open 24/7, 365 days a year",
        alcoholDisclaimer: "Age-restricted: 21+ for alcoholic beverages"
    });

    const [saving, setSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Simulate save
        setTimeout(() => {
            setSaving(false);
            alert("Administrative parameters updated successfully.");
        }, 1500);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const sections = [
        {
            id: 'general',
            title: 'General Information',
            icon: <Info className="w-5 h-5" />,
            fields: [
                { name: 'restaurantName', label: 'Restaurant Name', type: 'text' },
                { name: 'email', label: 'Contact Email', type: 'email' },
                { name: 'phone', label: 'Contact Phone', type: 'text' },
                { name: 'address', label: 'Physical Address', type: 'textarea' }
            ]
        },
        {
            id: 'operations',
            title: 'Operations',
            icon: <Clock className="w-5 h-5" />,
            fields: [
                { name: 'operatingHours', label: 'Operating Hours', type: 'text' },
                { name: 'alcoholDisclaimer', label: 'Alcohol Disclaimer', type: 'textarea' }
            ]
        }
    ];

    return (
        <AdminAuthGuard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
                        <p className="text-gray-600">Manage basic restaurant parameters and information</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl">
                    <div className="space-y-6">
                        {sections.map((section) => (
                            <motion.div
                                key={section.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                            >
                                <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
                                    {section.icon}
                                    <h2 className="font-semibold text-gray-800">{section.title}</h2>
                                </div>
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {section.fields.map((field) => (
                                        <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                {field.label}
                                            </label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    name={field.name}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleInputChange}
                                                    rows={3}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                />
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={formData[field.name as keyof typeof formData]}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}

                        {/* Additional Mock Settings Sections */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                        <Bell className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold">Notifications</h3>
                                </div>
                                <div className="space-y-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">Email for new bookings</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">Push notifications for inquiries</span>
                                    </label>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-semibold">Security</h3>
                                </div>
                                <div className="space-y-4">
                                    <button type="button" className="text-sm text-blue-600 hover:underline">
                                        Change administrative password
                                    </button>
                                    <div className="text-xs text-gray-500">
                                        Last password change: 3 months ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all disabled:opacity-50"
                        >
                            <Save className={`${saving ? 'animate-spin' : ''} w-5 h-5`} />
                            {saving ? 'Saving Changes...' : 'Save All Settings'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminAuthGuard>
    );
}
