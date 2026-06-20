import { type ReactNode } from 'react';
import type { Section } from '../types';
interface LayoutProps {
    children: ReactNode;
    activeSection: Section;
    onSectionChange: (section: Section) => void;
    onSignOut?: () => void;
}
export declare function Layout({ children, activeSection, onSectionChange, onSignOut }: LayoutProps): import("react").JSX.Element;
export {};
