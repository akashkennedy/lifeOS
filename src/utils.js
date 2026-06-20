export function generateId() {
    return Math.random().toString(36).substring(2, 11);
}
export function getDateString(date = new Date()) {
    return date.toISOString().split('T')[0];
}
export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
export function formatPercent(value, total) {
    if (total === 0)
        return '0%';
    return Math.round((value / total) * 100) + '%';
}
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
export function formatRupees(amount) {
    return `₹${amount.toLocaleString()}`;
}
export function getTodayFormatted() {
    const today = new Date();
    return today.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
}
//# sourceMappingURL=utils.js.map