import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { parseRupiah, rupiahFormatter } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Brand } from '../brands/columns';
import { Car } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Cars',
        href: '/admin/cars',
    },
    {
        title: 'Edit Car',
        href: '/admin/cars/edit',
    },
];

const formSchema = z.object({
    image: z.any(),
    name: z.string().min(1, 'Car name is required'),
    brand_id: z.number().min(1, 'Brand is required'),
    description: z.string().min(1, 'Car description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
});

export default function EditCar({ car, brands }: { car: Car; brands: Brand[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            name: car.name,
            brand_id: car.brand?.id || 0,
            description: car.description,
            price: car.price,
            stock: car.stock,
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('brand_id', values.brand_id.toString());
        formData.append('description', values.description);
        formData.append('price', values.price.toString());
        formData.append('stock', values.stock.toString());
        if (values.image && values.image instanceof File) {
            formData.append('image', values.image);
        }
        formData.append('_method', 'PUT');
        router.post(route('cars.update', { id: car.id }), formData);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Car" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/700 dark:border-sidebar-border rounded-xl border p-8 md:p-8">
                    <h1 className="text-2xl font-semibold">Edit Car</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Image</FormLabel>
                                        {car.image && (
                                            <div className="mb-3">
                                                <p className="mb-1 text-sm text-gray-500">Current image:</p>
                                                <img
                                                    src={`/storage/${car.image}`}
                                                    alt={car.name}
                                                    className="h-40 w-40 rounded-md border object-cover"
                                                />
                                            </div>
                                        )}
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        field.onChange(file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <p className="text-sm text-gray-500">Leave empty to keep the current image</p>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your car name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brand_id"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand</FormLabel>
                                        <FormControl>
                                            <Select value={field.value?.toString()} onValueChange={(value) => field.onChange(parseInt(value))}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select a brand" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {brands.map((brand) => (
                                                        <SelectItem key={brand.id} value={brand.id.toString()}>
                                                            {brand.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your car description" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Input your car stock"
                                                type="number"
                                                {...field}
                                                value={field.value}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Price</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                {...field}
                                                placeholder="Input your car price"
                                                value={rupiahFormatter.format(field.value || 0)}
                                                onChange={(e) => field.onChange(parseRupiah(e.target.value))}
                                                autoComplete="off"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}
