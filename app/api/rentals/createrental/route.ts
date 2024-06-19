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

        const { propertyId, startDate, endDate, totalRent } = await req.json();
        console.log(propertyId, startDate, endDate, totalRent);

        const user = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!,
            }
        });

        const createdRental = await prisma.rental.create({
            data: {
                userId: user?.id!,
                propertyId,
                totalRent: parseInt(totalRent),
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            }
        });

        return NextResponse.json(
            { success: "Rental Created!", createdRental: createdRental },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}