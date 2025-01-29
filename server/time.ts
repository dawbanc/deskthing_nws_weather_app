export function runEveryMin(callback: () => void) {
    const now = new Date();
    const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + 1, 0, 0);
    const delay = nextMinute.getTime() - now.getTime();

    setTimeout(() => {
        callback();
        runEveryMin(callback);
    }, delay);
}

export function runEveryHour(callback: () => void) {
    const now = new Date();
    const nextMinute = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, now.getMinutes(), 0, 0);
    const delay = nextMinute.getTime() - now.getTime();

    setTimeout(() => {
        callback();
        runEveryHour(callback);
    }, delay);
}