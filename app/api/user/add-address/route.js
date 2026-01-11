
import connectDB from "@/config/db";
import Address from "@/models/Address";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request) {
    try {
        
        const { userId } = getAuth(request);
        const data = await request.json();

        await connectDB();
        const address = data.address || data;
        const newAddress = new Address({
            userId,
            fullName: address.fullName,
            phoneNumber: address.phoneNumber,
            pincode: Number(address.pincode),
            area: address.area,
            city: address.city,
            state: address.state
        });
        await newAddress.save();

        return NextResponse.json({ success: true, message: "Address added successfully", newAddress });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}