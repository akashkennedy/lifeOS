import { useState } from 'react';
export function useLocalStorage(key, initial) {
    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initial;
        }
        catch {
            return initial;
        }
    });
    const set = (v) => {
        const next = typeof v === 'function' ? v(value) : v;
        setValue(next);
        localStorage.setItem(key, JSON.stringify(next));
    };
    return [value, set];
}
//# sourceMappingURL=useLocalStorage.js.map