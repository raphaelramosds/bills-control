import GuestLayout from '@/layouts/guest-layout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ ...props }) {

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
                            <>
                                <tr>
                                    <td>{bill.name}</td>
                                    <td>{bill.amount}</td>
                                    <td>{bill.expiration_date}</td>
                                    <td></td>
                                    <td></td>
                                    <td>Ações</td>
                                </tr>
                            </>
                        ))}
                        </tbody>
                    </table>
                    : 'Nenhuma conta foi cadastrada'}

            </div>
        </GuestLayout>
    );
}
