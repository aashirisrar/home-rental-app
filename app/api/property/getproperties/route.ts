import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // find the properties
        const fetchedProperties = await prisma.property.findMany({});

        return NextResponse.json(
            { success: "Properties Found!", properties: fetchedProperties },
            { status: 200 }
        );
    } catch (e) {
        return NextResponse.json({ error: e }, { status: 500 });
    }
}