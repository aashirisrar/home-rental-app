import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RentalsComponent({
    rentalId,
    startDate,
    endDate,
    totalRent
}: any) {
    return (
        <Card className="space-y-2 px-6 mb-4 mx-auto">
            <CardContent className="space-y-4">
                <div className="flex flex-col items-start gap-4">
                    <p className="font-bold text-muted-foreground">{rentalId}</p>
                    {/* <div className="w-full">
                        <Image
                            width={400}
                            className="w-full"
                            style={{ objectFit: "contain" }}
                            height={400}
                            alt={propertyId}
                            src={image}
                        />
                    </div> */}
                    <p className="text-sm text-muted-foreground">From: {startDate}</p>
                    <p className="text-sm text-muted-foreground">To: {endDate}</p>
                    <p className="text-sm text-primary">Total Rent: Rs. {totalRent}</p>
                </div>
                <div className="flex gap-2">
                    <div className="w-full">
                        <Link href={"/property/" + rentalId}>
                            <Button className="w-full">Details</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
