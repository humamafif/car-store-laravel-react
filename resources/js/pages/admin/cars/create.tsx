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
        title: 'Add New Car',
        href: '/admin/cars/create',
    },
];

const formSchema = z.object({
    image: z.any(),
    title: z.string().min(1, 'Car name is required'),
    description: z.string().min(1, 'Car description is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    stock: z.number().int().min(0, 'Stock must be a non-negative integer'),
    brand_id: z.string().min(1, 'Brand is required'),
});

export default function CreateCar({ brands }: { brands: Brand[] }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: null,
            title: '',
            description: '',
            price: 0,
            brand_id: '',
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        router.post(route('cars.store'), values);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Car" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/700 dark:border-sidebar-border rounded-xl border p-8 md:p-8">
                    <h1 className="text-2xl font-semibold">Add Car</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Car Image</FormLabel>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="title"
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
                                            <Select value={field.value} onValueChange={field.onChange}>
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
