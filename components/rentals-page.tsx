
import { useEffect, useState } from "react";
import axios from "axios";
import { SkeletonCard } from "@/components/skeleton-card";
import RentalsComponent from "./rentals-component";

const RentalsPage = () => {
    const [rentals, setRentals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchFriendsPost() {
        try {
            const response = await axios.post("/api/rentals/getuserrentals");
            setRentals(response.data.properties);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        fetchFriendsPost();
    }, []);

    if (isLoading) {
        return <SkeletonCard />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rentals?.map((property: any) => (
                <RentalsComponent key={property.propertyId} {...property} />
            ))}
        </div>
    )
}

export default RentalsPage