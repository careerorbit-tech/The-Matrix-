import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Mail, Lock, Image as ImageIcon, Hash,
    AtSign, Calendar, Eye, EyeOff, LogOut, CheckCircle,
    AlertCircle, Edit2, Hexagon, UserCircle, Rocket,
    Briefcase, Users
} from "lucide-react";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Helper: Generate UUID
const generateId = () => {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
};

export default function AuthPage() {
    const [view, setView] = useState<'login' | 'register' | 'dashboard'>('login');
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Handle deep linking via query params
        const params = new URLSearchParams(window.location.search);
        const mode = params.get('mode');
        if (mode === 'register') setView('register');
        else if (mode === 'login') setView('login');
    }, []);

    // Auth State
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        // Initialization
        const loadState = async () => {
            try {
                // 1. Load from localStorage first for instant UI
                const session = localStorage.getItem("auth_session");
                const storedUsers = localStorage.getItem("users");
                if (storedUsers) {
                    setUsers(JSON.parse(storedUsers));
                }

                if (session) {
                    const parsed = JSON.parse(session);
                    setCurrentUser(parsed);
                    setView('dashboard');
                }

                // 2. Sync with backend (Vercel KV)
                const res = await fetch("/api/users");
                if (res.ok) {
                    const cloudUsers = await res.json();
                    if (cloudUsers.length > 0) {
                        setUsers(cloudUsers);
                        localStorage.setItem("users", JSON.stringify(cloudUsers));

                        // Sync current user if logged in
                        if (session) {
                            const parsed = JSON.parse(session);
                            const updated = cloudUsers.find((u: any) => u.username === parsed.username);
                            if (updated) {
                                setCurrentUser(updated);
                                localStorage.setItem("auth_session", JSON.stringify(updated));
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Failed to load auth state", err);
            } finally {
                setIsLoading(false);
            }
        };

        loadState();
    }, []);

    const saveUserToLocalStorage = async (newUsers: any[]) => {
        localStorage.setItem("users", JSON.stringify(newUsers));
        setUsers(newUsers);

        // Push to cloud
        try {
            await fetch("/api/sync-users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ users: newUsers })
            });
        } catch (e) {
            console.warn("Cloud sync deferred", e);
        }
    };

    const setSession = (user: any) => {
        localStorage.setItem("auth_session", JSON.stringify(user));
        setCurrentUser(user);
        setView('dashboard');
    };

    const clearSession = () => {
        localStorage.removeItem("auth_session");
        setCurrentUser(null);
        setView('login');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-primary border-t-accent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
            <ParticleBackground />
            <Navbar />

            {/* Content wrapper with fixed Navbar spacing */}
            <main className="relative z-10 pt-24 pb-20 px-4 flex flex-col items-center min-h-[calc(100vh-100px)]">
                <AnimatePresence mode="wait">
                    {view === 'login' && (
                        <LoginView
                            key="login"
                            users={users}
                            onLogin={setSession}
                            onGoToSignUp={() => setView('register')}
                        />
                    )}
                    {view === 'register' && (
                        <RegisterView
                            key="register"
                            users={users}
                            setUsers={saveUserToLocalStorage}
                            onRegister={setSession}
                            onGoToLogin={() => setView('login')}
                        />
                    )}
                    {view === 'dashboard' && (
                        <DashboardView
                            key="dashboard"
                            user={currentUser}
                            users={users}
                            setUsers={saveUserToLocalStorage}
                            onUpdateUser={(u: any) => {
                                setSession(u);
                            }}
                            onLogout={clearSession}
                        />
                    )}
                </AnimatePresence>
            </main>

            <Footer />
        </div>
    );
}

const UIInput = ({ icon: Icon, type, placeholder, value, onChange, error, name }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="mb-4">
            <div className={`relative flex items-center group transition-all duration-300 ${isFocused ? 'scale-[1.01]' : ''}`}>
                <div className={`absolute left-0 bottom-0 w-full h-[1px] transition-all duration-300 ${isFocused ? 'bg-gradient-to-r from-primary to-accent shadow-[0_0_10px_rgba(123,47,255,0.3)]' : 'bg-white/10'}`}></div>

                <Icon className={`absolute left-3 w-4 h-4 transition-colors duration-300 ${isFocused ? 'text-primary' : 'text-white/30 group-hover:text-white/50'}`} />

                <input
                    type={inputType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-white/[0.03] border-none outline-none text-white pl-10 pr-10 py-3 placeholder:text-white/20 font-sans text-sm rounded-t-lg transition-colors border-b-2 border-transparent"
                />

                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-white/30 hover:text-primary transition-colors outline-none"
                    >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                )}
            </div>
            {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex items-center gap-1 mt-1.5 text-red-500/80 text-[11px] uppercase tracking-wide px-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{error}</span>
                </motion.div>
            )}
        </div>
    );
};

// --- VIEWS ---

function LoginView({ users, onLogin, onGoToSignUp }: any) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState<{ global?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsSubmitting(true);

        await new Promise(r => setTimeout(r, 600));

        const user = users.find((u: any) => u.username === form.username);
        if (!user) {
            setErrors({ global: "Invalid username or password" });
            setIsSubmitting(false);
            return;
        }

        const hashedInput = btoa(form.password);
        if (user.password !== hashedInput) {
            setErrors({ global: "Invalid username or password" });
            setIsSubmitting(false);
            return;
        }

        onLogin(user);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md my-auto"
        >
            <div className="glass-card p-8 rounded-2xl">
                <div className="text-center mb-10">
                    <h2 className="font-heading text-3xl font-bold text-white mb-2 uppercase tracking-tight">Access Horizon</h2>
                    <p className="text-muted-foreground text-sm font-light">Enter your identifiers to re-enter the cosmic network.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <UIInput
                        icon={User}
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e: any) => setForm({ ...form, username: e.target.value })}
                        error={errors.global}
                    />

                    <UIInput
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e: any) => setForm({ ...form, password: e.target.value })}
                    />

                    <button
                        type="submit"
                        disabled={isSubmitting || !form.username || !form.password}
                        className="w-full mt-8 py-3.5 px-6 bg-white text-black hover:bg-primary hover:text-white rounded-full font-heading font-bold transition-all duration-500 tracking-wide hover:shadow-[0_0_30px_rgba(123,47,255,0.4)] disabled:opacity-50 flex justify-center items-center gap-2 group"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>INITIALIZE</span>
                                <Rocket className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        onClick={onGoToSignUp}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                    >
                        Request identity access path →
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function RegisterView({ users, setUsers, onRegister, onGoToLogin }: any) {
    const [form, setForm] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        avatar: '',
        bio: '',
        reason: '',
        interestType: 'club' as 'club' | 'event'
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors: any = {};
        if (!form.fullName.trim()) newErrors.fullName = "Full name required";
        if (!form.username.trim() || form.username.length < 3) newErrors.username = "Min 3 chars";
        if (users.some((u: any) => u.username === form.username)) newErrors.username = "Taken";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
        if (users.some((u: any) => u.email === form.email)) newErrors.email = "Registered";
        if (form.password.length < 6) newErrors.password = "Min 6 chars";
        if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Mismatch";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 800));

        const newUser = {
            id: generateId(),
            fullName: form.fullName.trim(),
            username: form.username.trim(),
            email: form.email.trim(),
            password: btoa(form.password),
            avatar: form.avatar.trim() || "👾",
            bio: form.bio.trim(),
            reason: form.reason.trim(),
            interestType: form.interestType,
            role: 'user',
            createdAt: new Date().toISOString()
        };

        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);

        onRegister(newUser);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-2xl my-auto"
        >
            <div className="glass-card p-10 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[80px] -z-10"></div>

                <div className="text-center mb-10">
                    <h2 className="font-heading text-3xl font-bold text-white mb-2 uppercase tracking-tight">Create Identity</h2>
                    <p className="text-muted-foreground text-sm font-light">Register your coordinates with the Matrix mainframe.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                        <UIInput icon={UserCircle} type="text" placeholder="Full Name" value={form.fullName} onChange={(e: any) => setForm({ ...form, fullName: e.target.value })} error={errors.fullName} />
                        <UIInput icon={AtSign} type="text" placeholder="Username" value={form.username} onChange={(e: any) => setForm({ ...form, username: e.target.value })} error={errors.username} />
                        <UIInput icon={Mail} type="email" placeholder="Email Address" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                        <UIInput icon={ImageIcon} type="text" placeholder="Avatar (URL or Emoji)" value={form.avatar} onChange={(e: any) => setForm({ ...form, avatar: e.target.value })} />
                        <UIInput icon={Lock} type="password" placeholder="Password (min 6)" value={form.password} onChange={(e: any) => setForm({ ...form, password: e.target.value })} error={errors.password} />
                        <UIInput icon={Lock} type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e: any) => setForm({ ...form, confirmPassword: e.target.value })} error={errors.confirmPassword} />
                    </div>

                    <div className="mb-4">
                        <div className="relative group">
                            <Hash className="absolute left-3 top-3 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                            <textarea
                                placeholder="Bio / Technical Notes (Optional)"
                                value={form.bio}
                                onChange={(e: any) => setForm({ ...form, bio: e.target.value })}
                                className="w-full bg-white/[0.03] border-b border-white/10 focus:border-primary transition-all outline-none text-white pl-10 pr-4 py-3 placeholder:text-white/20 font-sans text-sm resize-none h-24 rounded-t-lg"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="relative group">
                            <Rocket className="absolute left-3 top-3 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                            <textarea
                                placeholder="Reason to join the cosmic movement?"
                                value={form.reason}
                                onChange={(e: any) => setForm({ ...form, reason: e.target.value })}
                                className="w-full bg-white/[0.03] border-b border-white/10 focus:border-primary transition-all outline-none text-white pl-10 pr-4 py-3 placeholder:text-white/20 font-sans text-sm resize-none h-20 rounded-t-lg"
                            ></textarea>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs text-muted-foreground flex items-center gap-2 uppercase tracking-widest font-bold"><Users className="w-3.5 h-3.5 text-primary" /> Primary Interest:</span>
                        <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
                            <button type="button" onClick={() => setForm({ ...form, interestType: 'club' })} className={`px-5 py-1.5 text-[10px] uppercase font-bold rounded-full transition-all ${form.interestType === 'club' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-white'}`}>Join Club</button>
                            <button type="button" onClick={() => setForm({ ...form, interestType: 'event' })} className={`px-5 py-1.5 text-[10px] uppercase font-bold rounded-full transition-all ${form.interestType === 'event' ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'text-muted-foreground hover:text-white'}`}>Attend Event</button>
                        </div>
                    </div>

                    <div className="pt-2"></div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-4 py-4 px-8 bg-gradient-to-r from-primary to-accent text-white rounded-full font-heading font-bold transition-all duration-500 tracking-widest hover:shadow-[0_0_40px_rgba(123,47,255,0.5)] active:scale-95 disabled:opacity-50 flex justify-center items-center"
                    >
                        {isSubmitting ? <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "ESTABLISH CONNECT"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <button onClick={onGoToLogin} className="text-xs text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                        Return to access point bridge →
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function DashboardView({ user, users, setUsers, onUpdateUser, onLogout }: any) {
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({
        fullName: user.fullName,
        avatar: user.avatar,
        bio: user.bio,
    });

    const isEmoji = (str: string) => {
        const regex = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        return regex.test(str) && str.length <= 5;
    };

    const isCurrentAvatarEmoji = isEmoji(user.avatar);

    const handleSaveProfile = () => {
        const updatedUser = { ...user, ...editForm };
        const updatedUsersList = users.map((u: any) => u.id === user.id ? updatedUser : u);
        setUsers(updatedUsersList);
        onUpdateUser(updatedUser);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="w-full max-w-4xl"
        >
            <div className="glass-card rounded-3xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-purple-500"></div>

                <div className="p-8 md:p-14 flex flex-col md:flex-row items-center md:items-start gap-10">
                    <button
                        onClick={onLogout}
                        className="absolute top-8 right-8 text-muted-foreground hover:text-red-500 transition-all flex items-center gap-2 group p-2 hover:bg-red-500/10 rounded-lg"
                        title="Terminate Session"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>

                    {/* Avatar Badge */}
                    <div className="relative shrink-0">
                        <div className="w-40 h-40 rounded-full p-1.5 bg-gradient-to-tr from-primary to-accent">
                            <div className="w-full h-full bg-background rounded-full flex items-center justify-center overflow-hidden relative">
                                {isCurrentAvatarEmoji ? (
                                    <span className="text-7xl select-none grayscale-[0.3] hover:grayscale-0 transition-all">{user.avatar}</span>
                                ) : (
                                    <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" onError={(e: any) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                                )}
                                <div className="hidden absolute inset-0 items-center justify-center bg-background"><UserCircle className="w-20 h-20 text-white/10" /></div>
                            </div>
                        </div>
                    </div>

                    {/* Main Info */}
                    <div className="flex-1 text-center md:text-left pt-2">
                        {isEditing ? (
                            <div className="space-y-4 w-full">
                                <input
                                    type="text"
                                    value={editForm.fullName}
                                    onChange={e => setEditForm({ ...editForm, fullName: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg text-3xl font-heading font-bold text-white px-4 py-2 outline-none focus:border-primary transition-colors"
                                    placeholder="Full Name"
                                />
                                <div className="flex bg-white/[0.03] border border-white/10 rounded-lg items-center px-4 py-2 gap-3 group focus-within:border-accent">
                                    <ImageIcon className="w-4 h-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
                                    <input
                                        type="text"
                                        value={editForm.avatar}
                                        onChange={e => setEditForm({ ...editForm, avatar: e.target.value })}
                                        className="w-full bg-transparent outline-none text-xs font-sans text-white/70"
                                        placeholder="Avatar URL or Emoji"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-5xl font-heading font-bold text-white mb-2 leading-tight uppercase tracking-tight">{user.fullName}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
                                    <span className="flex items-center gap-2"><AtSign className="w-3.5 h-3.5" />{user.username}</span>
                                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                                    <span className="flex items-center gap-2 text-green-400"><CheckCircle className="w-3.5 h-3.5" />Verified User</span>
                                </div>
                            </>
                        )}

                        <div className="mt-2">
                            {isEditing ? (
                                <textarea
                                    value={editForm.bio}
                                    onChange={e => setEditForm({ ...editForm, bio: e.target.value })}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg resize-none min-h-[120px] text-sm font-sans text-white/60 p-4 outline-none focus:border-primary transition-colors"
                                    placeholder="Update your cosmic bio..."
                                />
                            ) : (
                                <p className="text-muted-foreground text-sm font-light leading-relaxed max-w-xl italic">
                                    "{user.bio || 'This navigator has not yet synchronized their biological history.'}"
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-8 md:px-14 pb-14">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 border-t border-white/5">
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 group hover:bg-white/[0.05] transition-all">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2"><Mail className="w-3 h-3 text-primary" /> Network Endpoint</span>
                            <span className="font-sans text-sm text-white/80 block truncate">{user.email}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 group hover:bg-white/[0.05] transition-all">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2"><Calendar className="w-3 h-3 text-accent" /> Entry Timestamp</span>
                            <span className="font-sans text-sm text-white/80">{new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 group hover:bg-white/[0.05] transition-all">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2"><Rocket className="w-3 h-3 text-primary" /> Purpose</span>
                            <span className="font-sans text-sm text-white/80 block truncate">{user.reason || "General Exploration"}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 group hover:bg-white/[0.05] transition-all">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2"><Users className="w-3.5 h-3.5 text-accent" /> Engagement</span>
                            <span className="font-sans text-sm text-white/80 uppercase tracking-widest text-[10px]">{user.interestType === 'club' ? "Elite Club Member" : "Event Guardian"}</span>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-5 group hover:bg-white/[0.05] transition-all">
                            <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold flex items-center gap-2 mb-2"><Hexagon className="w-3 h-3 text-white/40" /> Identity GUID</span>
                            <span className="font-mono text-[10px] text-white/40 truncate block">{user.id}</span>
                        </div>
                    </div>

                    <div className="mt-12 flex justify-end gap-4">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-2.5 rounded-full font-heading text-xs font-bold text-muted-foreground hover:text-white transition-all uppercase tracking-widest border border-white/5 hover:border-white/10"
                                >
                                    ABORT
                                </button>
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-8 py-2.5 bg-primary text-white rounded-full font-heading text-xs font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 uppercase tracking-widest"
                                >
                                    COMMIT REDESIGN
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-heading text-xs font-bold transition-all uppercase tracking-widest hover:border-primary/50"
                            >
                                <Edit2 className="w-3.5 h-3.5" /> REDESIGN IDENTITY
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
