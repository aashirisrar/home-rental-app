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

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!,
            }
        });

        const rentals = await prisma.rental.findMany({
            where: {
                userId: user?.id
            }
        });

        return NextResponse.json(
            { success: "Rentals Found!", rentals: rentals },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}