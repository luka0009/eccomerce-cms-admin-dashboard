"use client";

import { Button } from "@/components/ui/button";
import { ProductColumn } from "./columns";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface Props {
	data: ProductColumn;
}

const CellAction: React.FC<Props> = ({ data }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const router = useRouter();
	const params = useParams();

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast.success("Copied to clipboard");
	};

	const onDelete = async () => {
		try {
			setIsLoading(true);
			await axios.delete(`/api/${params.storeId}/products/${data.id}`);
			router.refresh();
			toast.success("Product deleted.");
		} catch (error: any) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				isLoading={isLoading}
				onConfirm={onDelete}
				onClose={() => setIsOpen(false)}
			/>
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
					<DropdownMenuItem
						onClick={() =>
							router.push(`/${params.storeId}/products/${data.id}`)
						}
					>
						<Edit className="mr-2 h-4 w-4" />
						Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className="mr-2 h-4 w-4" />
						Copy ID
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setIsOpen(true)}>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};

export default CellAction;
