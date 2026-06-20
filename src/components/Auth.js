import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { LogIn, UserPlus, Loader as Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { signUp, signIn } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        const { error } = isSignUp
            ? await signUp(email, password)
            : await signIn(email, password);
        if (error) {
            setError(error.message);
        }
        setLoading(false);
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-surface dark:bg-surface-dark p-4", children: _jsxs("div", { className: "w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("h1", { className: "text-3xl font-bold text-[#1a1a1a] dark:text-white mb-2", children: "LifeOS" }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: "Your personal operating system" })] }), _jsxs("div", { className: "bg-white dark:bg-gray-900 rounded-2xl p-6 border border-border dark:border-gray-800 shadow-lg", children: [_jsxs("div", { className: "flex mb-6", children: [_jsx("button", { onClick: () => setIsSignUp(false), className: `flex-1 py-2 text-center font-medium transition-all duration-150 ${!isSignUp
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-gray-500 dark:text-gray-400 border-b-2 border-transparent'}`, children: "Sign In" }), _jsx("button", { onClick: () => setIsSignUp(true), className: `flex-1 py-2 text-center font-medium transition-all duration-150 ${isSignUp
                                        ? 'text-accent border-b-2 border-accent'
                                        : 'text-gray-500 dark:text-gray-400 border-b-2 border-transparent'}`, children: "Sign Up" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Email" }), _jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, placeholder: "you@example.com", className: "w-full px-4 py-2 rounded-lg border border-border dark:border-gray-700 bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, minLength: 6, placeholder: "Enter your password", className: "w-full px-4 py-2 rounded-lg border border-border dark:border-gray-700 bg-transparent outline-none focus:border-accent text-[#1a1a1a] dark:text-white placeholder-gray-400" })] }), error && (_jsx("p", { className: "text-red-500 text-sm", children: error })), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 disabled:opacity-50 transition-all duration-150 flex items-center justify-center gap-2", children: loading ? (_jsx(Loader2, { size: 20, className: "animate-spin" })) : isSignUp ? (_jsxs(_Fragment, { children: [_jsx(UserPlus, { size: 20 }), "Create Account"] })) : (_jsxs(_Fragment, { children: [_jsx(LogIn, { size: 20 }), "Sign In"] })) })] })] })] }) }));
}
//# sourceMappingURL=Auth.js.map