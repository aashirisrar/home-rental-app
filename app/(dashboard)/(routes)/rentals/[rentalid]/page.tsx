"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "@/components/skeleton-card";
import RentalsPage from "@/components/rentals-page";
import { useParams } from "next/navigation";
import RentalDetailsComponent from "@/components/rental-details-component";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [rentalDetail, setRentalDetails] = useState()
  const params = useParams();

  async function fetchUserProfile() {
    try {
      const response = await axios.post("/api/rentals/getrentaldetails", { rentalId: params.rentalid });
      setRentalDetails(response.data.rental)
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    fetchUserProfile();
  }, []);

  if (isLoading) {
    return <SkeletonCard />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Rentals Details</h1>
        {/* <div className="flex gap-x-3"> */}
        {/* {loggedin && <CreateProperty />} */}
        {/* </div> */}
      </div >
      <div
        className="flex justify-between gap-4 rounded-lg shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        {/* <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                You have no products
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start selling as soon as you add a product.
              </p>
              <Button className="mt-4">Add Product</Button>
            </div> */}
        <div>
          <RentalDetailsComponent {...rentalDetail} />
        </div>
      </div>
    </>
  );
}
