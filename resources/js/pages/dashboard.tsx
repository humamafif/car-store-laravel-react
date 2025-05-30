import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <img
                        className="h-[50vh] w-full object-cover transition-transform duration-700 hover:scale-105"
                        src="https://www.supervettura.com/blobs/Cars/69/c46edc49-82fe-4aca-bf90-9f8719bde185.jpg?width=1920&height=1080&mode=crop"
                        alt="Koenigsegg Agera"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col items-start justify-end bg-gradient-to-r from-black/70 via-black/40 to-transparent p-8">
                        <h3 className="text-3xl font-bold text-white md:text-7xl">Koenigsegg</h3>
                        <h3 className="text-3xl font-bold text-white md:text-7xl">Agera</h3>
                        <p className="mt-2 max-w-md text-sm text-gray-200 md:text-xl">
                            High-performance sports car with exceptional engineering and breathtaking design
                        </p>
                        <button className="mt-6 rounded-lg bg-white px-6 py-2 font-semibold text-black transition-all hover:bg-gray-200">
                            View Details
                        </button>
                    </div>
                </div>

                {/* Featured Collection */}
                <div className="mb-4">
                    <h2 className="mb-4 text-2xl font-bold">Popular Models</h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="group overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:shadow-xl">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="assets/images/nissan 350z.jpg"
                                    alt="Nissan 350z"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <button className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
                                    Details
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold">Nissan 350Z</h3>
                                <p className="text-sm text-gray-600">Sports coupe with iconic styling</p>
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:shadow-xl">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="assets/images/nissan gtr.jpg"
                                    alt="Nissan GTR"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <button className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
                                    Details
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold">Nissan GTR</h3>
                                <p className="text-sm text-gray-600">High-performance supercar killer</p>
                            </div>
                        </div>

                        <div className="group overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:shadow-xl">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    src="assets/images/Porsche_911.jpg"
                                    alt="Porsche 911"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                <button className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 font-medium text-black opacity-0 transition-opacity group-hover:opacity-100">
                                    Details
                                </button>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold">Porsche 911</h3>
                                <p className="text-sm text-gray-600">Legendary performance and handling</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
