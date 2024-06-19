import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RentalsComponent({
    propertyId,
    title,
    details,
    address,
    type,
    image,
    price,
    rent,
    rooms,
}: any) {
    return (
        <Card className="space-y-2 px-6 mb-4 w-[80%] mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <p className="font-bold text-muted-foreground">{title}</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col items-start gap-4">
                    <div className="w-full">
                        <Image
                            width={400}
                            className="w-full"
                            style={{ objectFit: "contain" }}
                            height={400}
                            alt={propertyId}
                            src={image}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">{details}</p>
                    <p className="text-sm text-primary">Rs. {price}</p>
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <Link href={"/property/" + propertyId}>
                            <Button className="w-full">View</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
