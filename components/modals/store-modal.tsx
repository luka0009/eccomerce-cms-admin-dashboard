"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStoreModal } from "@/hooks/useStoreModal";
import Modal from "../ui/modal";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const StoreModal = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const storeModal = useStoreModal();

	const formSchema = z.object({
		name: z.string().min(1),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log(values);
	};

	return (
		<Modal
			title="Create Store"
			description="Add a new store to Manage your products"
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div className="space-y-4 py-2 pb-3">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="e.g: E-Commerce" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="pt-6 space-x-2 flex items-center justify-end w-full">
							<Button variant="outline" onClick={storeModal.onClose}>
								Cancel
							</Button>
							<Button type="submit">Continue</Button>
						</div>
					</form>
				</Form>
			</div>
		</Modal>
	);
};

export default StoreModal;
