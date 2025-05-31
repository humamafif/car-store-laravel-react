import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
        title: 'Add New Brand',
        href: '/admin/brands/create',
    },
];

const formSchema = z.object({
    name: z.string().min(1, 'Brand name is required'),
});

export default function CreateBrand() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
        },
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        router.post(route('brands.store'), values);
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Brand" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/700 dark:border-sidebar-border rounded-xl border p-8 md:p-8">
                    <h1 className="text-2xl font-semibold">Add Brand</h1>
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
