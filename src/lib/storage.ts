export interface StorageItem {
  key: string;
  value: any;
  timestamp: number;
}

export class LocalStorage {
  private static prefix = 'swiss-army-knife_';

  static set(key: string, value: any): void {
    if (typeof window === 'undefined') return;
    
    try {
      const item: StorageItem = {
        key: this.prefix + key,
        value,
        timestamp: Date.now()
      };
      localStorage.setItem(item.key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') return defaultValue || null;
    
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return defaultValue || null;
      
      const parsed: StorageItem = JSON.parse(item);
      return parsed.value as T;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue || null;
    }
  }

  static remove(key: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  static clear(): void {
    if (typeof window === 'undefined') return;
    
    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }

  static getAll(): StorageItem[] {
    if (typeof window === 'undefined') return [];
    
    try {
      return Object.keys(localStorage)
        .filter(key => key.startsWith(this.prefix))
        .map(key => {
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        })
        .filter(Boolean);
    } catch (error) {
      console.warn('Failed to get all localStorage items:', error);
      return [];
    }
  }
}
