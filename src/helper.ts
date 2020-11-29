const monthNames: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export function formatDate(date: Date) {
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatCurrency(amount: number): string {
    if (amount === 0) {
        return "";
    }
    let amountString = String(amount);
    const splits = [amountString.slice(amountString.length - 3)];
    amountString = amountString.substring(0, amountString.length - 3)
    while (amountString.length) {
        splits.unshift(amountString.slice(amountString.length - 2));
        amountString = amountString.substring(0, amountString.length - 2);
    }
    return splits.join(',');
}

export function formatCurrencyWithSymbol(amount: number) {
    if (amount === 0) {
        return "₹ 0";
    }
    if (amount < 0) {
        return "- ₹" + formatCurrency(-amount);
    }
    return "₹ " + formatCurrency(amount);
}