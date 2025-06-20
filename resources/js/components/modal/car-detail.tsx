import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Car } from '@/types';
import { useState } from 'react';

interface CarDetailDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddToCart?: (car_id: number, item: number) => void;
    car: Car | null;
}

export default function CarDetailDialog({ open, onOpenChange, car, onAddToCart }: CarDetailDialogProps) {
    const [itemCount, setItemCount] = useState(1);
    if (!car) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex h-[90vh] w-full !max-w-7xl overflow-hidden rounded-xl shadow-lg">
                <div className="grid h-full w-full grid-cols-1 md:grid-cols-2">
                    <div className="relative h-64 md:h-auto">
                        <img src={`/storage/${car.image}`} alt={car.name} className="h-full w-full rounded-xl object-cover" />
                    </div>

                    <div className="space-y-4 overflow-y-auto p-6 md:p-10">
                        <DialogTitle className="text-3xl font-bold text-gray-900 md:text-5xl dark:text-white">{car.name}</DialogTitle>
                        <DialogDescription className="text-md text-gray-600 dark:text-gray-300">{car.brand?.name}</DialogDescription>

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Deskripsi</h3>
                            <p className="text-gray-700 dark:text-gray-300">{car.description}</p>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            Stok tersedia: <span className="font-medium">{car.stock}</span>
                        </div>

                        <div className="text-xl font-bold text-green-700 dark:text-green-400">Rp {Number(car.price).toLocaleString('id-ID')}</div>

                        <div className="flex gap-3 pt-4">
                            <button className="rounded-lg bg-black px-6 py-2 text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300">
                                Pesan Sekarang
                            </button>
                            <input
                                className="rounded-lg border border-black"
                                type="number"
                                value={itemCount}
                                onChange={(value) => setItemCount(Number(value.target.value))}
                            />
                            <button
                                onClick={() => onAddToCart && car && onAddToCart(car.id, itemCount)}
                                className="rounded-lg bg-black px-6 py-2 text-white transition-all hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
