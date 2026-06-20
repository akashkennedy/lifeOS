import { type ReactNode } from 'react';
interface ToastContextType {
    showToast: (message: string) => void;
}
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useToast(): ToastContextType;
export {};
