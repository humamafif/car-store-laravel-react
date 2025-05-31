import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Brand } from '../brands/columns';
import { Car, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Cars',
        href: '/admin/cars',
    },
];

export default function Cars({ cars, brands }: { cars: Car[]; brands: Brand[] }) {
    console.log('Cars data:', cars);

    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    console.log('Flash messages:', flash);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumb}>
            <Head title="Cars" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
                        <p className="text-muted-foreground mt-1">Manage your car inventory here</p>
                    </div>
                    <Button asChild className="whitespace-nowrap">
                        <Link href={route('cars.create')}>
                            <span className="flex items-center gap-2">Add Car</span>
                        </Link>
                    </Button>
                </div>
                <DataTable columns={columns} data={cars} />
            </div>
        </AppLayout>
    );
}
