"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { SkeletonCard } from "@/components/skeleton-card";
import PropertyRentalForm from "@/components/rental-form";

export default function UserProfilePage() {
    const [property, setProperty] = useState({});
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);

    async function fetchProperty() {
        try {
            const response = await axios.post("/api/property/getproperty", {
                propertyId: params.propertyid,
            });
            setProperty(response.data.property);
        } catch (error) {
            console.error("Error fetching properties", error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        fetchProperty();
    }, []);

    if (isLoading) {
        return <SkeletonCard />;
    }

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Rent the Property</h1>
            </div>
            <div>
                <PropertyRentalForm />
            </div>
            {/* <div
        className="flex justify-between gap-4 rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div>
      </div> */}
        </>
    );
}
