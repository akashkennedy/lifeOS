import type { WellbeingEntry } from '../types';
export declare function useWellbeing(): {
    entries: WellbeingEntry[];
    loading: boolean;
    saveEntry: (entry: Omit<WellbeingEntry, "id">) => Promise<void>;
};
