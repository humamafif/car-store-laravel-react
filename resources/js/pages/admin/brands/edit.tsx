import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Brand } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'Brands',
        href: '/admin/brands',
    },
    {
        title: 'Edit Brand',
        href: '#',
    },
];

const formSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
});

export default function EditBrand({ brand }: { brand: Brand }) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: brand.name,
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('_method', 'PUT');
        router.post(route('brands.update', { id: brand.id }), formData);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Brand" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/700 dark:border-sidebar-border rounded-xl border p-8 md:p-8">
                    <h1 className="text-2xl font-semibold">Edit Brand</h1>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Input your brand name" {...field} />
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
