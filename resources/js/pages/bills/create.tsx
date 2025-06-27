import GuestLayout from '@/layouts/guest-layout';
import { Head } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@headlessui/react';
import { Button } from '@/components/ui/button';

export default function Create() {
    return (
        <GuestLayout>
            <Head title="Cadastrar conta"/>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Label htmlFor="name">Descrição</Label>
                <Input id="name" type="text" required placeholder="Descreva esta conta"/>

                <Label htmlFor="amount">Valor</Label>
                <Input id="amount" required/>

                <Label htmlFor="expiration_date">Valor</Label>
                <Input id="expiration_date" type="date" required/>

                <Label htmlFor="payment_date">Valor</Label>
                <Input id="payment_date" type="date" required/>

                <Label htmlFor="notes">Anotações</Label>
                <Textarea id="notes"/>

                <Button type="submit">
                    Salvar
                </Button>
            </div>
        </GuestLayout>
    );
}
