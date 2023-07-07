"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

import { Billboard, Category } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	initialData: Category | null;
	billboards: Billboard[];
}

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1),
});

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<Props> = ({ initialData, billboards }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? "Edit Category" : "Create Category";
	const description = initialData ? "Edit a Category" : "Add a new Category";
	const toastMessage = initialData ? "Category updated" : "Category created";
	const action = initialData ? "Save Changes" : "Create Category";

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: "",
			billboardId: "",
		},
	});

	async function onSubmit(values: CategoryFormValues) {
		try {
			setIsLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/categories/${params.categoryId}`,
					values
				);
			} else {
				await axios.post(`/api/${params.storeId}/categories`, values);
			}
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setIsLoading(false);
		}
	}

	const onDelete = async () => {
		try {
			setIsLoading(true);
			await axios.delete(
				`/api/${params.storeId}/categories/${params.categoryId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success("Category deleted.");
		} catch (error: any) {
			toast.error("Make sure you removed all products for this category first.");
		} finally {
			setIsLoading(false);
			setIsOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				onConfirm={onDelete}
				isLoading={isLoading}
			/>
			<div className="flex items-center justify-between">
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={isLoading}
						variant="destructive"
						size="sm"
						onClick={() => setIsOpen(true)}
					>
						<Trash className="h-4 w-4" />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isLoading}
											placeholder="Enter category name here"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="billboardId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									<Select
										disabled={isLoading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a billboard"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{billboards.map((billboard) => (
												<SelectItem key={billboard.id} value={billboard.id}>
													{billboard.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={isLoading} className="ml-auto" type="submit">
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};

export default CategoryForm;
