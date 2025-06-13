import { default as CarDetailDialog } from '@/components/modal/car-detail';
import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Welcome() {
    const { auth, cars } = usePage<SharedData>().props;
    const [selectedCar, setSelectedCar] = useState<any | null>(null);
    const [open, setOpen] = useState(false);

    const handleOpenDialog = (car: any) => {
        setSelectedCar(car);
        setOpen(true);
    };

    console.log('Cars data:', cars);
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="flex h-full min-h-screen flex-col gap-6 dark:bg-black">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-2xl">
                        <img className="h-[70vh] w-full object-cover" src={`storage/${cars![0].image}`} alt="Hero Car" />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-r from-black/70 via-black/40 to-transparent p-8">
                            <h1 className="text-4xl font-bold text-white md:text-6xl">{cars![0].name}</h1>
                            <p className="max-w-md text-sm text-gray-200 md:text-lg">{cars![0].description}</p>
                            <Link
                                href="#cars"
                                className="mt-6 w-max rounded-lg bg-white px-6 py-2 font-semibold text-black transition-all hover:bg-gray-200"
                            >
                                View Collection
                            </Link>
                        </div>
                    </div>
                    {/* Catalog Section */}
                    <section id="cars" className="w-fullpx-4 pt-10 pb-20">
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">Car Collection</h2>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {cars?.map((car) => (
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
                            ))}
                        </div>
                    </section>
                </div>
                <CarDetailDialog open={open} onOpenChange={setOpen} car={selectedCar} />
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
