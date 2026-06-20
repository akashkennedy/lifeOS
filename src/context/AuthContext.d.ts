import { type ReactNode } from 'react';
import type { User, Session } from '@supabase/supabase-js';
interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (email: string, password: string) => Promise<{
        error: Error | null;
    }>;
    signIn: (email: string, password: string) => Promise<{
        error: Error | null;
    }>;
    signOut: () => Promise<void>;
}
export declare function AuthProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export declare function useAuth(): AuthContextType;
export {};
