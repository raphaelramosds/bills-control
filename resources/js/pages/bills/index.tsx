import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import React, { FormEventHandler, useState } from 'react';
import { asCurrency, asDate, asMonthYear } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Form from './form';

export default function Index({ ...props }) {

    const { delete: destroy, get } = useForm();

    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [selectedBill, setSelectedBill] = useState({});

    const handleDelete = (id: number) => {
        destroy(route('bills.destroy', id));
    };

    const handleMonthSearch = (month: string) => {
        get(route('bills.index', { month }), { preserveScroll: true, preserveState: true });
    };

    const handleClear = () => {
        get(route('bills.index'), {
            preserveScroll: true,
            preserveState: false
        });
    };

    return (
        <AppLayout>
            <Head title="Listar contas" />
            <main className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
                <header className="flex">
                    <h1 className="font-bold text-lg flex-1">Listar contas</h1>
                </header>
                <section className="flex gap-4 ">
                    <div className="flex flex-col gap-2 flex-1 border rounded-xl">
                        {props.bills.length > 0 ?
                            props.bills.map(bill => (
                                <div className="flex p-3 gap-7 rounded" key={bill.id}>

                                    <div className="text-left">
                                        <div>
                                            <span className="relative">
                                                <span
                                                    className={`absolute inline-flex h-full w-full animate-ping rounded-full ${bill.payment_date ? 'bg-sky-400' : 'bg-red-400'} opacity-75`}></span>
                                                <span
                                                    className={`relative inline-flex size-3 rounded-full ${bill.payment_date ? 'bg-chart-2' : 'bg-red-500'}`}></span>
                                            </span>
                                            <span className='ml-2'>{asCurrency(bill.amount)}</span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h1>{bill.name}</h1>
                                    </div>

                                    <div className="flex items-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className={`cursor-pointer rounded text-sm text-white/80 ${bill.payment_date ? 'bg-chart-2/80' : 'bg-red-500/80'} p-1`}>
                                                    <span>
                                                        {bill.payment_date ? `Pago em ${asDate(bill.payment_date)}` : `Vence em ${asDate(bill.expiration_date)}`}
                                                    </span>
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                                align="end"
                                            >
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onSelect={() => {
                                                        setOpenFormDialog(true);
                                                        setSelectedBill(bill);
                                                    }}
                                                >
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-500 cursor-pointer"
                                                    onSelect={() => handleDelete(bill.id)}
                                                >
                                                    Excluir
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>

                                        <Dialog open={openFormDialog} onOpenChange={setOpenFormDialog}>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>{Object.keys(selectedBill).length === 0 ? 'Cadastrar conta' : 'Modificar conta'}</DialogTitle>
                                                    <DialogDescription>
                                                        <Form bill={selectedBill} />
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            ))
                            : 'Nenhuma conta foi cadastrada'}
                    </div>
                    <aside className="flex flex-col gap-3 w-1/4 max-h-fit">
                        <div className='flex flex-col gap-3 rounded border p-3'>
                            <div>
                                <span className='text-sm'>Filtros</span>
                            </div>
                            <Select onValueChange={handleMonthSearch}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Vencimento" />
                                </SelectTrigger>
                                <SelectContent>
                                    {props.months.map((month) => <SelectItem key={month}
                                        value={month}>{asMonthYear(month)}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            <button className="cursor-pointer w-full rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-white dark:hover:border-[#3E3E3A] dark:bg-input" type="button"
                                onClick={handleClear}>
                                Redefinir
                            </button>
                            <button
                                onClick={() => {
                                    setSelectedBill({});
                                    setOpenFormDialog(true);
                                }}
                                className="cursor-pointer w-full rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-white dark:hover:border-[#3E3E3A] dark:bg-chart-2"
                            >
                                Nova conta
                            </button>
                        </div>
                        <div className='flex gap-3 flex-col rounded border p-3'>
                            <div>
                                <span className='text-sm'>Totais</span>
                            </div>
                            <div className='w-full flex'>
                                <span className='rounded-l-lg flex-1 bg-chart-2 text-sm text-center text-white p-1'>R$ 12,90</span>
                                <span className='rounded-r-lg bg-red-500 text-sm text-center text-white p-1'>R$ 1902,90</span>
                            </div>
                        </div>
                    </aside>
                </section>
            </main>
        </AppLayout>
    );
}
