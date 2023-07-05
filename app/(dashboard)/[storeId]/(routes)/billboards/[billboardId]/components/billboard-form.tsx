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

import { Billboard } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/image-upload";

interface Props {
	initialData: Billboard | null;
}

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1),
});

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<Props> = ({ initialData }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? "Edit Billboard" : "Create Billboard";
	const description = initialData ? "Edit a Billboard" : "Add a new Billboard";
	const toastMessage = initialData ? "Billboard updated" : "Billboard created";
	const action = initialData ? "Save Changes" : "Create Billboard";

	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: "",
			imageUrl: "",
		},
	});

	async function onSubmit(values: BillboardFormValues) {
		try {
			setIsLoading(true);
			if (initialData) {
				await axios.patch(
					`/api/${params.storeId}/billboards/${params.billboardId}`,
					values
				);
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, values);
			}
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
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
				`/api/${params.storeId}/billboards/${params.billboardId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success("Billboard deleted.");
		} catch (error: any) {
			toast.error("Make sure you removed all categories first.");
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
					<FormField
						control={form.control}
						name="label"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Label</FormLabel>
								<FormControl>
									<Input
										disabled={isLoading}
										placeholder="Enter billboard label here"
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="imageUrl"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image</FormLabel>
									<FormControl>
										<ImageUpload
											disabled={isLoading}
											onChange={(url) => field.onChange(url)}
											onRemove={() => field.onChange("")}
											value={field.value ? [field.value] : []}
										/>
									</FormControl>

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

export default BillboardForm;
