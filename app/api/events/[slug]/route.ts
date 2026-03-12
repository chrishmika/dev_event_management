import { Event } from "@/database";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params:Promise<{
        slug:string
    }>
}

export async function GET(req:NextRequest,{params}:RouteParams):Promise<NextResponse>{
    try {
        await connectToDatabase();
        
        const { slug } = await params;

        if(typeof slug !== 'string' || slug.trim() === '' || !slug){
            return NextResponse.json({message:'Invalid slug'},{status:400})
        }

        const sanitizedSlug = slug.trim().toLowerCase()        

        const event = await Event.findOne({slug:sanitizedSlug});

        if(!event){
            return NextResponse.json({message:'No event found'},{status:404})
        }

        return NextResponse.json({message:'Event fetched successfully', event},{status:200})
    } catch (e) {
        console.log(e);
        return NextResponse.json({message:'Failed to fetch event'},{status:500})
    }
} 