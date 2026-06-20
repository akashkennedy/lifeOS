export declare function useLocalStorage<T>(key: string, initial: T): readonly [T, (v: T | ((prev: T) => T)) => void];
