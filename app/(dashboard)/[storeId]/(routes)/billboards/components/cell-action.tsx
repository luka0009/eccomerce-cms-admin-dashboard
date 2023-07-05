"use client";

import { Button } from "@/components/ui/button";
import { BillboardColumn } from "./columns";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash, Trash2, Trash2Icon } from "lucide-react";

interface Props {
	data: BillboardColumn;
}

const CellAction: React.FC<Props> = ({ data }) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open Menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<Edit className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Copy className="mr-2 h-4 w-4" />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem>
                        <Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CellAction;
