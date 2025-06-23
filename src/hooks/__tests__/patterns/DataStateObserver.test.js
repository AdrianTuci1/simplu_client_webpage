import { DataStateObserver } from '../../patterns/DataStateObserver.js';

describe('DataStateObserver', () => {
    let observer;

    beforeEach(() => {
        observer = new DataStateObserver();
    });

    test('should create observer with empty observers map', () => {
        expect(observer.observers).toBeInstanceOf(Map);
        expect(observer.observers.size).toBe(0);
    });

    test('should subscribe to an ID and return unsubscribe function', () => {
        const callback = jest.fn();
        const unsubscribe = observer.subscribe('test-id', callback);

        expect(observer.observers.has('test-id')).toBe(true);
        expect(observer.observers.get('test-id')).toBeInstanceOf(Set);
        expect(observer.observers.get('test-id').has(callback)).toBe(true);
        expect(typeof unsubscribe).toBe('function');
    });

    test('should notify all subscribers for an ID', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const testData = { test: 'data' };

        observer.subscribe('test-id', callback1);
        observer.subscribe('test-id', callback2);

        observer.notify('test-id', testData);

        expect(callback1).toHaveBeenCalledWith(testData);
        expect(callback2).toHaveBeenCalledWith(testData);
    });

    test('should not notify subscribers for non-existent ID', () => {
        const callback = jest.fn();
        observer.subscribe('test-id', callback);

        observer.notify('non-existent-id', {});

        expect(callback).not.toHaveBeenCalled();
    });

    test('should unsubscribe callback when unsubscribe function is called', () => {
        const callback = jest.fn();
        const unsubscribe = observer.subscribe('test-id', callback);

        unsubscribe();

        expect(observer.observers.has('test-id')).toBe(false);
    });

    test('should remove ID when last callback is unsubscribed', () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        const unsubscribe1 = observer.subscribe('test-id', callback1);
        const unsubscribe2 = observer.subscribe('test-id', callback2);

        unsubscribe1();
        expect(observer.observers.has('test-id')).toBe(true);

        unsubscribe2();
        expect(observer.observers.has('test-id')).toBe(false);
    });
}); 