"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Loader2, KeyRound, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [resetMode, setResetMode] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            let message = "Failed to login. Please check your credentials.";
            if (err.code === "auth/user-not-found") message = "No account found with this email.";
            if (err.code === "auth/wrong-password") message = "Incorrect password.";
            if (err.code === "auth/too-many-requests") message = "Too many failed attempts. Try again later.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email address first.");
            return;
        }
        setLoading(true);
        setError("");

        try {
            await sendPasswordResetEmail(auth, email);
            setResetSent(true);
        } catch (err: any) {
            setError(err.message || "Failed to send reset email.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f172a] relative overflow-hidden px-4 font-montserrat">
            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-900/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full relative z-10"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">
                    <div className="text-center mb-10">
                        <motion.div 
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="bg-gradient-to-br from-amber-500 to-amber-700 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-900/20 rotate-3"
                        >
                            {resetMode ? (
                                <KeyRound className="text-white" size={40} />
                            ) : (
                                <Lock className="text-white" size={40} />
                            )}
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            {resetMode ? "Reset Password" : "Admin Portal"}
                        </h1>
                        <p className="text-gray-400 mt-2">
                            {resetMode 
                                ? "We'll send you a secure link to your email" 
                                : "Secure access to Kiston Highway CMS"}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {resetSent ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-center py-6"
                            >
                                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                    <CheckCircle2 className="text-green-500" size={32} />
                                </div>
                                <h2 className="text-xl font-semibold text-white mb-2">Email Sent!</h2>
                                <p className="text-gray-400 mb-8">Please check your inbox for instructions to reset your password.</p>
                                <button
                                    onClick={() => { setResetSent(false); setResetMode(false); }}
                                    className="text-amber-500 hover:text-amber-400 font-medium flex items-center justify-center gap-2 mx-auto"
                                >
                                    <ArrowLeft size={18} /> Back to Login
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form 
                                key={resetMode ? "reset" : "login"}
                                initial={{ opacity: 0, x: resetMode ? 20 : -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: resetMode ? -20 : 20 }}
                                onSubmit={resetMode ? handleResetPassword : handleLogin} 
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-sm font-medium text-gray-300 mb-2 ml-1">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-amber-500 transition-colors" size={20} />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-gray-600"
                                                placeholder="admin@kiston.site"
                                            />
                                        </div>
                                    </div>

                                    {!resetMode && (
                                        <div className="group">
                                            <div className="flex items-center justify-between mb-2 ml-1">
                                                <label className="text-sm font-medium text-gray-300">
                                                    Password
                                                </label>
                                                <button 
                                                    type="button"
                                                    onClick={() => setResetMode(true)}
                                                    className="text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors"
                                                >
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <div className="relative">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-12 py-3.5 rounded-2xl focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none transition-all placeholder:text-gray-600"
                                                    placeholder="••••••••"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amber-500 transition-colors"
                                                >
                                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-red-500/10 text-red-400 text-sm p-4 rounded-2xl border border-red-500/20 flex items-start gap-3"
                                    >
                                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                        <p>{error}</p>
                                    </motion.div>
                                )}

                                <div className="space-y-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-900/20 transition-all flex items-center justify-center gap-3 disabled:opacity-70 transform active:scale-[0.98]"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={22} />
                                                {resetMode ? "Processing..." : "Authenticating..."}
                                            </>
                                        ) : (
                                            <>{resetMode ? "Send Reset Link" : "Sign In to Dashboard"}</>
                                        )}
                                    </button>

                                    {resetMode && (
                                        <button
                                            type="button"
                                            onClick={() => setResetMode(false)}
                                            className="w-full text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ArrowLeft size={16} /> Nevermind, I remember it
                                        </button>
                                    )}
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <p className="text-center text-gray-500 text-xs mt-8">
                    &copy; {new Date().getFullYear()} Kiston Highway Restaurant. Admin Access Only.
                </p>
            </motion.div>
        </div>
    );
}
