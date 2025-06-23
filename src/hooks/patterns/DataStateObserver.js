/**
 * Observer Pattern: Data state observer
 * Manages subscriptions and notifications for data changes
 */
export class DataStateObserver {
    constructor() {
        this.observers = new Map();
    }
    
    /**
     * Subscribe to data changes for a specific ID
     * @param {string} id - Unique identifier for the subscription
     * @param {Function} callback - Function to call when data changes
     * @returns {Function} Unsubscribe function
     */
    subscribe(id, callback) {
        if (!this.observers.has(id)) {
            this.observers.set(id, new Set());
        }
        this.observers.get(id).add(callback);
        
        return () => {
            const callbacks = this.observers.get(id);
            if (callbacks) {
                callbacks.delete(callback);
                if (callbacks.size === 0) {
                    this.observers.delete(id);
                }
            }
        };
    }
    
    /**
     * Notify all subscribers for a specific ID
     * @param {string} id - Unique identifier for the subscription
     * @param {*} data - Data to send to subscribers
     */
    notify(id, data) {
        const callbacks = this.observers.get(id);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
}

// Global observer instance
export const dataObserver = new DataStateObserver(); 