import CarDetailDialog from '@/components/modal/car-detail';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Car, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function Dashboard() {
    const { auth, cars } = usePage<SharedData>().props;
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpenDialog = (car: Car) => {
        setSelectedCar(car);
        setOpen(true);
    };

    const onAddToCart = (car_id: number, item: number) => {
        router.post(
            route('cart.store'),
            {
                car_id: car_id,
                quantity: item,
            },
            {
                onSuccess: () => {
                    toast.success('Item added to cart successfully!');
                    setOpen(false);
                    window.dispatchEvent(new Event('cart-updated'));
                },
                onError: (error) => {
                    toast.error('Failed to add item to cart.');
                    console.error('Error adding to cart:', error);
                },
                preserveScroll: true,
            },
        );
    };
    console.log('Cars data received:', cars);
    console.log('usePage props:', usePage().props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl">
                    <img className="h-[70vh] w-full object-cover" src={`/storage/${cars[0].image}`} alt="Hero Car" />
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-black/70 via-black/40 to-transparent p-8">
                        <h1 className="text-4xl font-bold text-white md:text-6xl">{cars[0].name}</h1>
                        <p className="max-w-md text-sm text-gray-200 md:text-lg">{cars[0].description}</p>
                        <Link
                            href="#cars"
                            className="mt-6 w-max rounded-lg bg-white px-6 py-2 font-semibold text-black transition-all hover:bg-gray-200"
                        >
                            View Collection
                        </Link>
                    </div>
                </div>

                {/* Car Collection Section */}
                <section id="cars" className="w-full pt-10 pb-20">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Car Collection</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cars && cars.length > 0 ? (
                            cars.map((car) => (
                                <div
                                    key={car.id}
                                    className="group overflow-hidden rounded-xl bg-gray-100 shadow-md transition-all hover:shadow-xl dark:bg-gray-800"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            src={`/storage/${car.image}`}
                                            alt={car.name || 'Mobil'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                                        <Button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleOpenDialog(car);
                                            }}
                                            className="absolute bottom-4 left-4 rounded-lg bg-white px-4 py-2 font-medium text-black opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                                        >
                                            Detail
                                        </Button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between">
                                            <h3 className="font-bold text-gray-900 dark:text-white">{car.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300">{car.brand.name}</p>
                                        </div>
                                        <p className="mt-1 text-sm font-semibold text-green-600 dark:text-green-400">
                                            Rp {Number(car.price).toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-gray-500">
                                <p>No cars available at the moment.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Dialog untuk menampilkan detail mobil */}
            <CarDetailDialog open={open} onOpenChange={setOpen} car={selectedCar} onAddToCart={onAddToCart} />
        </AppLayout>
    );
}
