import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Brand, columns } from './columns';
import { DataTable } from './data-table';

const breadcrumb: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Brands',
        href: '/admin/brands',
    },
];

export default function Brands({ brands }: { brands: Brand[] }) {
    console.log('brands data:', brands);

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
            <Head title="Brands" />
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
                        <p className="text-muted-foreground mt-1">Manage your brand inventory here</p>
                    </div>
                    <Button asChild className="whitespace-nowrap">
                        <Link href={route('brands.create')}>
                            <span className="flex items-center gap-2">Add Brand</span>
                        </Link>
                    </Button>
                </div>
                <DataTable columns={columns} data={brands} />
            </div>
        </AppLayout>
    );
}
