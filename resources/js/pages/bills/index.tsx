import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { asCurrency, asDate, asMonthYear, equals } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import Form from './form';
import { Bill } from '@/types';
import { Edit, Trash } from 'lucide-react';

interface IndexProps {
    bills: Array<Bill>;
    months: Array<string>;
    totals: {
        paid: number,
        pending: number
    };
}

interface SearchParams {
    month: string;
    order: string;
}

var defaultSearchParams = {
    month: '',
    order: ''
};

var defaultSelectedBill = {
    name: '',
    amount: 0,
    expiration_date: ''
};

export default function Index({ ...props }: IndexProps) {

    const { delete: destroy, get } = useForm();

    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchParams>(defaultSearchParams);
    const [selectedBill, setSelectedBill] = useState<Bill>(defaultSelectedBill);

    const handleDelete = (id: number | undefined) => {
        destroy(route('bills.destroy', id));
    };

    const handleClear = () => {
        get(route('bills.index'), { preserveScroll: true, preserveState: false });
    };

    useEffect(() => {
        if (equals(searchParams, defaultSearchParams)) return;
        get(route('bills.index', { ...searchParams }), { preserveScroll: true, preserveState: true });
    }, [searchParams]);

    return (
        <AppLayout>
            <Head title="Listar contas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
                <section className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1 border rounded-xl p-4">
                        <table>
                            <thead>
                                <tr>
                                    <th className="py-2 text-left">Descrição</th>
                                    <th className="text-left">Valor</th>
                                    <th className="text-left">Situação</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.bills.length > 0 ?
                                    props.bills.map(bill => (
                                        <tr key={bill.id}>
                                            <td className="py-2">{bill.name}</td>
                                            <td>{asCurrency(bill.amount)}</td>
                                            <td>
                                                <span
                                                    className={`font-bold rounded text-sm ${bill.payment_date ? 'text-chart-2' : 'text-red-500'} p-1`}
                                                >{bill.payment_date ? `Pago em ${asDate(bill.payment_date)}` : `Vence em ${asDate(bill.expiration_date)}`}</span>
                                            </td>
                                            <td>
                                                <div className="grid grid-cols-2">
                                                    <Edit
                                                        className="cursor-pointer"
                                                        size={16}
                                                        onClick={() => {
                                                            setOpenFormDialog(true);
                                                            setSelectedBill(bill);
                                                        }}
                                                    />
                                                    <Trash
                                                        className="cursor-pointer text-red-500"
                                                        size={16}
                                                        onClick={() => handleDelete(bill.id)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : ''}
                            </tbody>
                        </table>
                        <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
                            <DialogContent aria-describedby={undefined}>
                                <DialogHeader>
                                    <DialogTitle>{!selectedBill.id ? 'Cadastrar conta' : 'Modificar conta'}</DialogTitle>
                                </DialogHeader>
                                <Form bill={selectedBill} />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <aside className="flex flex-col gap-3 w-1/4 max-h-fit">
                        <div className="flex flex-col gap-3 rounded border p-3">
                            <div>
                                <span className="text-sm">Filtros</span>
                            </div>
                            <Select onValueChange={(order) => setSearchParams({ ...searchParams, order })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="expiration_date" value="expiration_date">Vencimento</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select onValueChange={(month) => setSearchParams({ ...searchParams, month })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Vencimento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.months.map((month) => <SelectItem key={month}
                                        value={month}>{asMonthYear(month)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <button
                                className="cursor-pointer w-full rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-white dark:hover:border-[#3E3E3A] dark:bg-input"
                                type="button"
                                onClick={handleClear}>
                                Redefinir
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedBill({
                                        name: '',
                                        amount: '',
                                        expiration_date: ''
                                    });
                                    setOpenFormDialog(true);
                                }}
                                className="cursor-pointer w-full rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-white dark:hover:border-[#3E3E3A] dark:bg-chart-2"
                            >
                                Nova conta
                            </button>
                        </div>
                        <div className="flex gap-3 flex-col rounded border p-3">
                            <div>
                                <span className="text-sm">Totais</span>
                            </div>
                            <div className="w-full flex">
                                <span className="rounded-l-lg flex-1 bg-chart-2 text-sm text-center text-white p-1">{asCurrency(props.totals.paid)}</span>
                                <span className="rounded-r-lg flex-1 bg-red-500 text-sm text-center text-white p-1">{asCurrency(props.totals.pending)}</span>
                            </div>
                        </div>
                    </aside>
                </section>
            </div>
        </AppLayout>
    );
}
