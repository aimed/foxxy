/**
 * Create a random number between min and max.
 * 
 * @param {number} min
 * @param {number} max 
 * @returns {number} 
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

/**
 * Utility function to randomly select an element in an array.
 * 
 * @template T 
 * @param {T[]} items 
 * @returns {(T | null)}
 */
export function randomInArray<T>(items: T[]): T | null {
    if (items.length === 0) {
        return null;
    }
    const max = items.length - 1;
    const rnd = randomInt(0, max);
    return items[rnd];
}
