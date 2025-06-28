import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function asCurrency(number: number) {
    return 'R$ ' + new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 , currency: 'BRL' }).format(
        number
    );
}

export function asDate(str: string) {
    if (!str) return null;
    const date = new Date(str);
    return date.toLocaleDateString("pt-BR");
}
