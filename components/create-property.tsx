"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { PlusCircleIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import UploadBtn from "@/components/upload-button";
import { useState } from "react";
import { FormSuccess } from "@/components/form-success";

const formSchema = z.object({
    title: z.string(),
    details: z.string(),
    address: z.string(),
    type: z.string(),
    image: z.string(),
    rent: z.string(),
    rooms: z.string(),
});


export function CreateProperty() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            details: "",
            address: "",
            type: "",
            image: "",
            rent: "",
            rooms: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        try {
            const resp = await axios.post("api/property/createproperty", values);
            setError(resp.data.error);
            setSuccess(resp.data.success);
            location.reload();
        } catch (error) {
            console.log(error);

        }
    }

    function setLink(link: string) {
        form.setValue("image", link);
    }

    function setMessage(message: string) {
        setSuccess(message);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="gap-x-1"><PlusCircleIcon size={18} />Add Property</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                    <DialogDescription>
                        Add your property details.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid py-1">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g Executive 2 Bedroom Apartment"
                                                className="col-span-3"
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
                                name="details"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Details:</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g Brand New Apartment in a serene environment"
                                                className="col-span-3"
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
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address:</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="e.g 1234, New York Street, New York"
                                                className="col-span-3"
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
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g Residential, Commercial, etc"
                                                className="col-span-3"
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
                                name="rent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rent:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. 1000"
                                                type="number"
                                                className="col-span-3"
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
                                name="rooms"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Rooms:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="e.g. 4"
                                                type="number"
                                                className="col-span-3"
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
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image:</FormLabel>
                                        <FormControl>
                                            <Input
                                                className="hidden"
                                                type="text"
                                                {...field}
                                                required
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-center pb-2">
                                <UploadBtn message={setMessage} returnedLink={setLink} />
                            </div>
                            <FormSuccess message={success} />
                            <div className="flex justify-end">
                                <Button type="submit">Create Property</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}