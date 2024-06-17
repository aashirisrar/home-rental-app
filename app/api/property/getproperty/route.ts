import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const propertyId = await req.json();
        // update the user's profile
        const property = await prisma.property.findUnique({
            where: {
                propertyId
            },
        })

        // find the owner of property
        const foundUser = await prisma.user.findUnique({
            where: {
                id: property?.userId
            }
        });

        return NextResponse.json(
            { success: "Property Found!", property: property, user: foundUser },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}