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
                <h1 className="font-bold text-lg">Listar contas</h1>
                <section className="flex gap-2">
                    <Select onValueChange={handleMonthSearch}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Vencimento" />
                        </SelectTrigger>
                        <SelectContent>
                            {props.months.map((month) => <SelectItem key={month}
                                                                     value={month}>{asMonthYear(month)}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Button className="cursor-pointer" type="button" variant="outline" onClick={handlerClear}>
                        Redefinir
                    </Button>
                    <Link
                        href={route('bills.create')}
                        className="w-[180px] rounded-sm border text-center px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                    >
                        Cadastrar
                    </Link>
                </section>

                {props.bills.length > 0 ?
                    props.bills.map(bill => (
                        <div className="flex p-4 gap-5 rounded border" key={bill.id}>
                            <div className="flex items-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <EllipsisVertical className="ml-auto size-4 cursor-pointer" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                        align="center"
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
                            <div className="flex-1">
                                <h1>{bill.name}</h1>
                                <span className="text-sm italic">Vence em {asDate(bill.expiration_date)}</span>
                            </div>
                            <div className="text-right">
                                <div className={`font-bold ${bill.payment_date ? 'text-sky-500' : 'text-red-500'}`}>
                                    <span>{asCurrency(bill.amount)}</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="relative flex size-3">
                                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full bg-${bill.payment_date ? 'sky' : 'red'}-400 opacity-75`}></span>
                                      <span className={`relative inline-flex size-3 rounded-full bg-${bill.payment_date ? 'sky' : 'red'}-500`}></span>
                                    </span>
                                    <span className='ml-1'>
                                        {bill.payment_date ? `Pago em ${asDate(bill.payment_date)}` : 'Pendente'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                    : 'Nenhuma conta foi cadastrada'}
            </main>
        </GuestLayout>
    );
}
