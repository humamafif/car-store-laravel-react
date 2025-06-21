import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface InvoiceCar {
    name: string;
    image: string;
}
interface InvoiceItemDetail {
    id: number;
    car: InvoiceCar;
    quantity: number;
    price: number;
}
interface InvoiceItem {
    id: number;
    amount: number;
    status: string;
    invoice_code: string;
    invoice_url: string;
    created_at: string;
    items: InvoiceItemDetail[];
}

interface InvoiceProps {
    invoice: InvoiceItem;
}

export default function InvoiceDetail({ invoice }: InvoiceProps) {
    return (
        <AppLayout>
            <Head title={`Invoice #${invoice.id}`} />
            <div className="p-4">
                <h1 className="mb-4 text-2xl font-bold">Detail Invoice #{invoice.id}</h1>
                <div className="mb-4 flex items-center justify-between">
                    <div className="text-muted-foreground text-sm">{new Date(invoice.created_at).toLocaleString('id-ID')}</div>
                    <Badge>{invoice.status}</Badge>
                </div>
                <div className="rounded-xl border p-4 shadow-sm">
                    <div className="divide-y">
                        {invoice.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 py-2">
                                <img src={`/storage/${item.car.image}`} alt={item.car.name} className="h-12 w-12 rounded border object-cover" />
                                <div className="flex-1">
                                    <div className="font-medium">{item.car.name}</div>
                                    <div className="text-muted-foreground text-xs">
                                        {item.quantity} x Rp{item.price.toLocaleString('id-ID')}
                                    </div>
                                </div>
                                <div className="text-sm font-semibold">Rp{(item.quantity * item.price).toLocaleString('id-ID')}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between font-semibold">
                        <span>Total</span>
                        <span>Rp{invoice.amount.toLocaleString('id-ID')}</span>
                    </div>
                </div>
                <Button className="mt-6" variant={'outline'} asChild>
                    <Link href={route('invoice.index')}>Kembali ke riwayat</Link>
                </Button>
            </div>
        </AppLayout>
    );
}
