import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical } from 'lucide-react';
import React, { FormEventHandler } from 'react';
import { asCurrency, asDate, asMonthYear } from '@/lib/utils';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export default function Index({ ...props }) {

    const { delete: destroy, get } = useForm();

    const handleDelete = (id: number) => {
        destroy(route('bills.destroy', id));
    };

    const handleMonthSearch = (month: string) => {
        get(route('bills.index', { month }), { preserveScroll: true, preserveState: true });
    };

    const handlerClear = () => {
        get(route('bills.index'), {
            preserveScroll: true,
            preserveState: true
        });
    };

    return (
        <GuestLayout>
            <Head title="Listar contas" />
            <main className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
                <header className="flex">
                    <h1 className="font-bold text-lg flex-1">Listar contas</h1>
                    <Link
                        href={route('bills.create')}
                        className="w-[180px] rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Cadastrar
                    </Link>
                </header>
                <section className="flex gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                        {props.bills.length > 0 ?
                            props.bills.map(bill => (
                                <div className="flex p-4 gap-5 rounded border" key={bill.id}>
                                    <div className="text-left">
                                        <div
                                            className={`font-bold ${bill.payment_date ? 'text-sky-500' : 'text-red-500'}`}>
                                            <span>{asCurrency(bill.amount)}</span>
                                        </div>
                                        <div className="flex items-center">
                                    <span className="relative flex size-3">
                                      <span
                                          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${bill.payment_date ? 'bg-sky-400' : 'bg-red-400'} opacity-75`}></span>
                                      <span
                                          className={`relative inline-flex size-3 rounded-full ${bill.payment_date ? 'bg-sky-500' : 'bg-red-500'}`}></span>
                                    </span>
                                            <span className="ml-1">
                                        {bill.payment_date ? `Pago` : 'Pendente'}
                                    </span>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h1 className={`${bill.payment_date ? 'text-sky-500' : 'text-red-500'}`}>{bill.name}</h1>
                                        <span className="text-sm italic">
                                    {bill.payment_date ? `Pago em ${asDate(bill.payment_date)}` : `Vence em ${asDate(bill.expiration_date)}`}
                                </span>
                                    </div>

                                    <div className="flex items-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <EllipsisVertical className="ml-auto size-4 cursor-pointer" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                                align="end"
                                            >
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onSelect={() => router.visit(route('bills.edit', bill.id))}
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
                                    </div>
                                </div>
                            ))
                            : 'Nenhuma conta foi cadastrada'}
                    </div>
                    <div className="flex flex-col gap-3 w-1/4 p-3 border rounded max-h-fit">
                        <Select onValueChange={handleMonthSearch}>
                            <SelectTrigger>
                                <SelectValue placeholder="Vencimento" />
                            </SelectTrigger>
                            <SelectContent>
                                {props.months.map((month) => <SelectItem key={month}
                                                                         value={month}>{asMonthYear(month)}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button className="w-full cursor-pointer mt-3" type="button" variant="outline"
                                onClick={handlerClear}>
                            Redefinir
                        </Button>
                    </div>
                </section>
            </main>
        </GuestLayout>
    );
}
