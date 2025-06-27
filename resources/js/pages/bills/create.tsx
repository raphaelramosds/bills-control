import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { InputNumberFormat, unformat } from '@react-input/number-format';
import { FormEventHandler } from 'react';
import { LoaderCircle } from 'lucide-react';

type BillForm = {
    name: string,
    amount: number,
    expiration_date: string,
    payment_date?: string,
    notes?: string
};

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<BillForm>>({
        name: '',
        amount: 0.0,
        expiration_date: '',
        payment_date: '',
        notes: ''
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('bills.store'), {
            onFinish: () => console.log('Dados da conta submetidos')
        });
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
                    />

                    <Label htmlFor="amount">Valor</Label>
                    <InputNumberFormat
                        id="amount"
                        locales="pt-BR"
                        maximumFractionDigits={2}
                        format="currency"
                        currency="BRL"
                        onChange={(e) => setData('amount', unformat(e.target.value))}
                    />

                    <Label htmlFor="expiration_date">Vencimento</Label>
                    <Input
                        id="expiration_date"
                        type="date"
                        onChange={(e) => setData('expiration_date', e.target.value)}
                    />

                    <Label htmlFor="payment_date">Data de pagamento</Label>
                    <Input
                        id="payment_date"
                        type="date"
                        onChange={(e) => setData('payment_date', e.target.value)}
                    />

                    <Label htmlFor="notes">Anotações</Label>
                    <Textarea
                        id="notes"
                        onChange={(e) => setData('notes', e.target.value)}
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
