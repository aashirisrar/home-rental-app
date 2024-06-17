import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { title, details, address, type, image, rent, rooms } = await req.json();

        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Not Authenticated!" },
                { status: 200 }
            );
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user?.email!
            }
        })

        // create the property listing
        const createProperty = await prisma.property.create({
            data: {
                title,
                details,
                address,
                type,
                image,
                rent: parseInt(rent),
                rooms: parseInt(rooms),
                userId: currentUser?.id!,
            },
        })

        return NextResponse.json(
            { success: "Property Created!", property: createProperty },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}