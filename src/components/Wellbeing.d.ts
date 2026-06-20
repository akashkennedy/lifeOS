import type { WellbeingEntry } from '../types';
interface WellbeingProps {
    entries: WellbeingEntry[];
    onSave: (entry: Omit<WellbeingEntry, 'id'>) => void;
}
export declare function Wellbeing({ entries, onSave }: WellbeingProps): import("react").JSX.Element;
export {};
