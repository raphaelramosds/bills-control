import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@headlessui/react';
import { Button } from '@/components/ui/button';
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
            })
        } else {
            post(route('bills.store'), {
                onFinish: () => console.log('Dados da conta submetidos')
            });
        }
    };

    return (
        <GuestLayout>
            <Head title="Cadastrar conta" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form className="flex flex-col" onSubmit={submit}>
                    <Label htmlFor="name">Descrição</Label>
                    <Input id="name"
                           type="text"
                           required
                           placeholder="Descreva esta conta"
                           onChange={(e) => setData('name', e.target.value)}
                           value={data.name}
                    />

                    <Label htmlFor="amount">Valor</Label>
                    <NumericFormat
                        id="amount"
                        thousandSeparator="."
                        decimalSeparator=","
                        allowLeadingZeros
                        allowNegative={false}
                        decimalScale={2}
                        value={data.amount}
                        onValueChange={(values) => setData('amount', values.floatValue)}
                    />

                    <Label htmlFor="expiration_date">Vencimento</Label>
                    <Input
                        id="expiration_date"
                        type="date"
                        onChange={(e) => setData('expiration_date', e.target.value)}
                        value={data.expiration_date}
                    />

                    <Label htmlFor="payment_date">Data de pagamento</Label>
                    <Input
                        id="payment_date"
                        type="date"
                        onChange={(e) => setData('payment_date', e.target.value)}
                        value={data.payment_date}
                    />

                    <Label htmlFor="notes">Anotações</Label>
                    <Textarea
                        id="notes"
                        onChange={(e) => setData('notes', e.target.value)}
                        value={data.notes}
                    />

                    <Button type="submit" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Salvar
                    </Button>
                </form>
            </div>
        </GuestLayout>
    );
}
