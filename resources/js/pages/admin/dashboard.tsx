import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="m-4 rounded-xl bg-gradient-to-r from-black to-white p-8 shadow-lg">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-white md:text-4xl">Welcome to Admin Dashboard</h1>
                        <p className="max-w-2xl text-blue-100">
                            Manage your inventory, track sales, and analyze performance all in one place. Your powerful command center for the entire
                            shoe store.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Button className="bg-white text-black hover:bg-white/60 hover:text-white" asChild>
                                <Link href={route('admin.dashboard')}>Manage Cars</Link>
                            </Button>
                            <Button className="bg-blue-800 text-white hover:bg-blue-700" asChild>
                                <Link href={route('admin.dashboard')}>View Orders</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-black/90 p-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-16 w-16 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
