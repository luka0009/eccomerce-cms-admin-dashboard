"use client";

import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import React from "react";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";

interface ProductClientProps {
	data: ProductColumn[];
}

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${data?.length})`}
					description="Manage Products for your store"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/products/new`)}
				>
					<Plus />
					Add New
				</Button>
			</div>
			<Separator />
			<DataTable columns={columns} data={data} searchKey="name" />
			<Heading title="API" description="API calls for Products" />
			<Separator />
			<ApiList entityName="products" entityIdName="productId"/>
		</>
	);
};

export default ProductClient;
