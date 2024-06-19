"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { SkeletonCard } from "./skeleton-card";
import { useParams } from "next/navigation";

const formSchema = z.object({
    propertyId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    totalRent: z.string(),
});

export default function PropertyRentalForm() {
    const params = useParams();
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(true);
    const [property, setProperty] = useState([]);
    const [rent, setRent] = useState("0");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            propertyId: "",
            totalRent: "",
            startDate: "",
            endDate: "",
        },
    });

    async function fetchPropertyDetails() {
        try {
            const response = await axios.post("/api/property/getproperty", {
                propertyId: params.propertyid,
            });
            setProperty(response.data.property);
            const property = response.data.property;

            // Set default values for form fields using fetched user data
            form.setValue("propertyId", property.propertyId || "");
        } catch (error) {
            console.error("Error fetching user profile:", error);
        }
    }

    // calculate rent
    useEffect(() => {
        const startDate = form.watch("startDate");
        const endDate = form.watch("endDate");
        const diffTime = Math.abs(new Date(endDate).getTime() - new Date(startDate).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const res = (diffDays * property.rent).toString()
        if (res !== "NaN") setRent(res);
        else setRent("0");

    }, [form.watch("startDate"), form.watch("endDate")]);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        fetchPropertyDetails();
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {
                values.totalRent = rent;
                const resp = await axios.post("/api/rentals/createrental", values);
                // setError(resp.data.error);
                // setSuccess(resp.data.success);
            } catch (error) {
                console.log(error);
            }
        });
    }

    if (isLoading) {
        return <SkeletonCard />;
    }

    return (
        <div className=" grid w-[350px] gap-6 cen">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4">
                        <FormField
                            control={form.control}
                            name="propertyId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property ID:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={true}
                                            type="text"
                                            placeholder="e.g Max"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="Date"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date:</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="Date"
                                            required
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div>Total Rent: {rent}</div>

                        <Button type="submit" className="w-full">
                            Rent
                        </Button>
                    </div>
                </form>
            </Form>
        </div >
    );
}
