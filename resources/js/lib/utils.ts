import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function asCurrency(number: number | string) {
    return 'R$ ' + new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, currency: 'BRL' }).format(
        number
    );
}

export function asDate(str: string | null | undefined) {
    if (!str) return null;

    const safeDate = str.replace(/-/g, '/');
    const date = new Date(safeDate);

    return date.toLocaleDateString('pt-BR');
}

export function asMonthYear(str: string | null | undefined) {
    if (!str) return null;

    // Validate YYYY-mm
    if (!str.match(/^\d{4}-\d{2}$/)) return null;

    // Workaround to avoid timezone
    const [year, month] = str.split('-');
    const date = new Date(Number(year), Number(month) - 1);

    return date.toLocaleDateString('pt-BR', { month: '2-digit', year: 'numeric' });
}
