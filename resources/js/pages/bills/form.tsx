import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

type BillForm = {
    name: string,
    amount: number,
    expiration_date: string,
    payment_date?: string,
    notes?: string
};

export default function Form({ ...props }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm<Required<BillForm>>({
        name: props.bill?.name ?? '',
        amount: props.bill?.amount ?? '',
        expiration_date: props.bill?.expiration_date ?? '',
        payment_date: props.bill?.payment_date ?? '',
        notes: props.bill?.notes ?? ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (props.bill) {
            patch(route('bills.update', props.bill.id), {
                onFinish: () => console.log('Dados da conta atualizados')
            });
        } else {
            post(route('bills.store'), {
                onFinish: () => console.log('Dados da conta submetidos')
            });
        }
    };

    return (
        <AppLayout>
            <Head title="Cadastrar conta" />
            <main className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
                <form className="flex flex-col" onSubmit={submit}>
                    <div className="grid gap-6 grid-cols-2 grid-rows-3">

                        <div className="grid gap-2">
                            <Label htmlFor="name">Descrição</Label>
                            <input
                                id="name"
                                type="text"
                                className="rounded border pl-2"
                                required
                                placeholder="Descreva esta conta"
                                onChange={(e) => setData('name', e.target.value)}
                                value={data.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="amount">Valor</Label>
                            <NumericFormat
                                id="amount"
                                required
                                placeholder="0,00"
                                className="rounded border pl-2"
                                thousandSeparator="."
                                decimalSeparator=","
                                allowLeadingZeros
                                allowNegative={false}
                                decimalScale={2}
                                value={data.amount}
                                onValueChange={(values) => setData('amount', values.floatValue)}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="expiration_date">Vencimento</Label>
                            <input id="expiration_date"
                                   type="date"
                                   className="rounded border pl-2"
                                   onChange={(e) => setData('expiration_date', e.target.value)}
                                   value={data.expiration_date}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="payment_date">Data de pagamento</Label>
                            <input id="payment_date"
                                   type="date"
                                   className="rounded border pl-2"
                                   onChange={(e) => setData('payment_date', e.target.value)}
                                   value={data.payment_date}
                            />
                        </div>

                        <div className="grid gap-2 col-span-2">
                            <Label htmlFor="notes">Anotações</Label>
                            <textarea id="notes"
                                      className="border rounded p-1"
                                      onChange={(e) => setData('notes', e.target.value)}
                                      value={data.notes}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className={`
                            w-[180px] cursor-pointer mt-4 rounded border p-1
                            ${processing ? 'flex items-center justify-center' : ''}
                        `}
                    >
                        {processing ? (
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                        ) : (
                            'Salvar'
                        )}
                    </button>

                </form>
            </main>
        </AppLayout>
    );
}
