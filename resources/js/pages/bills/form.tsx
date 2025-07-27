import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';
import { NumericFormat } from 'react-number-format';
import { Bill } from '@/types';
import InputError from '@/components/input-error';

type BillForm = {
    id?: number,
    name: string,
    amount: number | string,
    expiration_date: string,
    payment_date?: string,
    notes?: string
};

interface FormProps {
    bill: Bill;
}

export default function Form({ bill }: FormProps) {
    const { data, setData, post, patch, processing, errors, reset } = useForm<BillForm>({
        id: bill?.id,
        name: bill.name,
        amount: bill.amount,
        expiration_date: bill.expiration_date,
        payment_date: bill?.payment_date,
        notes: bill?.notes
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (bill.id) {
            patch(route('bills.update', bill.id), {
                onSuccess: () => console.log('Dados da conta atualizados'),
            });
        } else {
            post(route('bills.store'), {
                onSuccess: () => console.log('Dados da conta submetidos'),
            });
        }
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-10">
            <form className="flex flex-col gap-4" onSubmit={submit}>
                <div className="grid gap-2">
                    <Label htmlFor="name">Descrição</Label>
                    <input
                        id="name"
                        type="text"
                        className="rounded border p-2"
                        placeholder="Descreva esta conta"
                        onChange={(e) => setData<string, BillForm>('name', e.target.value)}
                        value={data.name}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="amount">Valor</Label>
                    <NumericFormat
                        id="amount"
                        placeholder="0,00"
                        className="rounded border p-2"
                        thousandSeparator="."
                        decimalSeparator=","
                        allowLeadingZeros
                        allowNegative={false}
                        decimalScale={2}
                        value={data.amount}
                        onValueChange={(values) => setData<number, BillForm>('amount', values.floatValue)}
                    />
                    <InputError message={errors.amount} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="expiration_date">Vencimento</Label>
                    <input id="expiration_date"
                           type="date"
                           className="rounded border p-2"
                           onChange={(e) => setData<string, BillForm>('expiration_date', e.target.value)}
                           value={data.expiration_date}
                    />
                    <InputError message={errors.expiration_date} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="payment_date">Data de pagamento</Label>
                    <input id="payment_date"
                           type="date"
                           className="rounded border p-2"
                           onChange={(e) => setData<string, BillForm>('payment_date', e.target.value)}
                           value={data.payment_date ?? ''}
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="notes">Anotações</Label>
                    <textarea id="notes"
                              className="border rounded p-1"
                              onChange={(e) => setData<string, BillForm>('notes', e.target.value)}
                              value={data.notes ?? ''}
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className={`
                            cursor-pointer mt-4 rounded border p-1
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
        </div>
    );
}
