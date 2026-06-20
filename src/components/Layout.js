import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { LayoutDashboard, Timer, Target, PiggyBank, Heart, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTodayFormatted } from '../utils';
const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'focus', label: 'Focus', icon: Timer },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'finance', label: 'Finance', icon: PiggyBank },
    { id: 'wellbeing', label: 'Wellbeing', icon: Heart },
];
export function Layout({ children, activeSection, onSectionChange, onSignOut }) {
    const [isMobile, setIsMobile] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const showSidebar = sidebarOpen || isHovered;
    return (_jsxs("div", { className: "min-h-screen flex flex-col md:flex-row bg-surface dark:bg-surface-dark", children: [!isMobile && (_jsxs("aside", { className: `relative border-r border-border dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out ${showSidebar ? 'w-64' : 'w-14'}`, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsxs("div", { className: "p-6 border-b border-border dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: `text-2xl font-bold text-[#1a1a1a] dark:text-white transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`, children: "LifeOS" }), _jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-1 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150", title: sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar', children: showSidebar ? _jsx(ChevronLeft, { size: 20 }) : _jsx(ChevronRight, { size: 20 }) })] }), _jsx("p", { className: `text-sm text-gray-500 dark:text-gray-400 mt-1 transition-opacity duration-300 ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`, children: getTodayFormatted() })] }), _jsx("nav", { className: "flex-1 p-4", children: _jsx("ul", { className: "space-y-1", children: navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (_jsx("li", { children: _jsxs("button", { onClick: () => onSectionChange(item.id), className: `w-full flex items-center gap-3 px-2 py-3 rounded-lg transition-all duration-150 ${isActive
                                            ? 'bg-accent/10 text-accent'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`, children: [_jsx(Icon, { size: 20, className: "flex-shrink-0" }), _jsx("span", { className: `font-medium transition-opacity duration-300 whitespace-nowrap ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`, children: item.label })] }) }, item.id));
                            }) }) }), onSignOut && (_jsx("div", { className: "p-4 border-t border-border dark:border-gray-800", children: _jsxs("button", { onClick: onSignOut, className: "w-full flex items-center gap-3 px-2 py-3 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-150", children: [_jsx(LogOut, { size: 20, className: "flex-shrink-0" }), _jsx("span", { className: `font-medium transition-opacity duration-300 whitespace-nowrap ${showSidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`, children: "Sign Out" })] }) }))] })), _jsxs("main", { className: "flex-1 pb-20 md:pb-0", children: [_jsx("header", { className: "md:hidden sticky top-0 z-40 bg-surface dark:bg-surface-dark border-b border-border dark:border-gray-800 px-4 py-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h1", { className: "text-xl font-bold text-[#1a1a1a] dark:text-white", children: "LifeOS" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: getTodayFormatted() }), onSignOut && (_jsx("button", { onClick: onSignOut, className: "p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300", children: _jsx(LogOut, { size: 20 }) }))] })] }) }), _jsx("div", { className: "p-6 md:p-8", children: children })] }), isMobile && (_jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-white dark:bg-surface-dark border-t border-border dark:border-gray-800 z-50", children: _jsx("ul", { className: "flex justify-around py-2", children: navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (_jsx("li", { children: _jsxs("button", { onClick: () => onSectionChange(item.id), className: `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-150 ${isActive
                                    ? 'text-accent'
                                    : 'text-gray-500 dark:text-gray-400'}`, children: [_jsx(Icon, { size: 22 }), _jsx("span", { className: "text-xs font-medium", children: item.label })] }) }, item.id));
                    }) }) }))] }));
}
//# sourceMappingURL=Layout.js.map