import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Ellipsis } from 'lucide-react';
import React, { FormEventHandler } from 'react';
import { asCurrency, asDate } from '@/lib/utils';

export default function Index({ ...props }) {

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        destroy(route('bills.destroy', id));
    };

    return (
        <GuestLayout>
            <Head title="Listar contas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Listar contas
                <Link
                    href={route('bills.create')}
                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                >
                    Cadastrar
                </Link>
                {props.bills.length > 0 ?
                    <table>
                        <tbody>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Data de pagamento</th>
                            <th>Anotações</th>
                            <th></th>
                        </tr>
                        {props.bills.map(bill => (
                            <tr key={bill.id}>
                                <td>{bill.name}</td>
                                <td>{asCurrency(bill.amount)}</td>
                                <td>{asDate(bill.expiration_date)}</td>
                                <td>{asDate(bill.payment_date)}</td>
                                <td>{bill.notes}</td>
                                <td>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Ellipsis className="ml-auto size-4" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                            align="end"
                                        >
                                            <DropdownMenuItem
                                                onSelect={() => router.visit(route('bills.edit', bill.id))}
                                            >
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                onSelect={() => handleDelete(bill.id)}
                                            >
                                                Excluir
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    : 'Nenhuma conta foi cadastrada'}

            </div>
        </GuestLayout>
    );
}
