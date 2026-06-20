import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
const ToastContext = createContext(null);
export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const showToast = useCallback((message) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);
    return (_jsxs(ToastContext.Provider, { value: { showToast }, children: [children, _jsx("div", { className: "fixed bottom-20 left-1/2 -translate-x-1/2 md:bottom-8 flex flex-col gap-2 z-50", children: toasts.map((toast) => (_jsx("div", { className: "bg-accent text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-fade-in", children: toast.message }, toast.id))) })] }));
}
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
//# sourceMappingURL=ToastContext.js.map