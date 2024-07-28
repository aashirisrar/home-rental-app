import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Not Authenticated!" },
                { status: 200 }
            );
        }

        const { rentalId } = await req.json();

        const rental = await prisma.rental.findUnique({
            where: {
                rentalId
            },
        });

        return NextResponse.json(
            { success: "Rental Found!", rental: rental },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}
