"use client";

import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/Components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { UpdateUserDialog } from "../Dialog/UpdateUser";
import { useState } from "react";
import { DeleteUserDialog } from "../Dialog/DeleteUser";

export type User = {
    id: string;
    name: string;
    email: string;
    roles: UserRole[];
};

type UserRole = {
    id: string;
    name: string;
};

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const user = row.original;
            return (
                <div className="flex space-x-1">
                    {user.roles.map((role, idx) => (
                        <Badge key={idx}>
                            {role.name.charAt(0).toUpperCase() +
                                role.name.slice(1)}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const user = row.original;
            const [updateUserDialog, setUpdateUserDialog] =
                useState<boolean>(false);
            const [deleteUserDialog, setDeleteUserDialog] =
                useState<boolean>(false);
            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setUpdateUserDialog(true)}
                            >
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setDeleteUserDialog(true)}
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <UpdateUserDialog
                        row={user}
                        open={updateUserDialog}
                        setOpen={setUpdateUserDialog}
                    />
                    <DeleteUserDialog
                        row={user}
                        open={deleteUserDialog}
                        setOpen={setDeleteUserDialog}
                    />
                </>
            );
        },
    },
];
