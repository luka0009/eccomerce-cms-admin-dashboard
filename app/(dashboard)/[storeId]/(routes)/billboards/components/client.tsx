"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

const BillboardClient = () => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Billboards (0)"
					description="Manage billboards for your store"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/billboards/new`)}
				>
					<Plus />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	);
};

export default BillboardClient;
