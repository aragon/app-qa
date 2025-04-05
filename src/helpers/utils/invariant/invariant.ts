export function invariant(condition: boolean, message: string): asserts condition {
    if (!condition) {
        const error = new Error(message);
        error.name = 'invariant';

        throw error;
    }

    return;
}
