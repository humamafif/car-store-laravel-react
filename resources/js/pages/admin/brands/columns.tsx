'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';

export type Brand = {
    id: number;
    name: string;
};

export const columns: ColumnDef<Brand>[] = [
    {
        accessorKey: 'no',
        header: 'No',
        cell: ({ row }) => {
            const index = row.index + 1;
            return <div className="font-medium">{index}</div>;
        },
    },
    {
        accessorKey: 'name',
        header: 'Brand Name',
    },

    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
            const brand = row.original;
            const brandId = brand.id;
            const brandName = brand.name;
            const handleDelete = (e: React.MouseEvent) => {
                e.preventDefault();
                if (confirm(`Are you sure you want to delete "${brandName}"?`)) {
                    router.delete(route('brands.destroy', brandId));
                }
            };
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Button variant="link" asChild>
                                <Link href={route('brands.edit', brandId)}>
                                    <Edit className="mr-2 h-4 w-4" /> Edit
                                </Link>
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Button variant="link" className="text-destructive hover:text-destructive/90" onClick={handleDelete}>
                                <Trash className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
