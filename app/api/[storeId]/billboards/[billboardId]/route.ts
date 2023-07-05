import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth();
		const { label, imageUrl } = await req.json();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!label) {
			return new NextResponse("Label is required", { status: 400 });
		}

		if (!imageUrl) {
			return new NextResponse("Image is required", { status: 400 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard ID is required", { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthorized action for this store", {
				status: 400,
			});
		}

		const billboard = await prismadb.billboard.updateMany({
			where: {
				id: params.billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("BILLBOARD_PATCH_REQUEST_ERROR: ", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string; billboardId: string } }
) {
	try {
		const { userId } = auth();

		if (!userId) {
			return new NextResponse("Unauthorized", { status: 403 });
		}

		if (!params.billboardId) {
			return new NextResponse("Billboard ID is required", { status: 400 });
		}

		const storeByUserId = await prismadb.store.findFirst({
			where: {
				id: params.storeId,
				userId,
			},
		});

		if (!storeByUserId) {
			return new NextResponse("Unauthorized action for this store", {
				status: 400,
			});
		}

		const billboard = await prismadb.billboard.deleteMany({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("BILLBOARD_DELETE_REQUEST_ERROR: ", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}

export async function GET(
	req: Request,
	{ params }: { params: { billboardId: string } }
) {
	try {
		if (!params.billboardId) {
			return new NextResponse("Billboard ID is required", { status: 400 });
		}

		const billboard = await prismadb.billboard.findUnique({
			where: {
				id: params.billboardId,
			},
		});

		return NextResponse.json(billboard);
	} catch (error) {
		console.log("BILLBOARD_GET_REQUEST_ERROR: ", error);
		return new NextResponse("Internal server error", { status: 500 });
	}
}
