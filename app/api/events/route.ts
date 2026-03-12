import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import  Event  from "@/database/event.model";
import {v2 as cloudinary} from 'cloudinary';


export async function POST(req: NextRequest){
    try {
        await connectToDatabase();

        const formData = await req.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
            
        } catch (e) {
            console.log(e)
            return NextResponse.json({message:'Invalid Data formate'},{ status:400} )
        }

        // const eventPayload = payloadResult.data;

        const file = formData.get('image') as File;

        if(!file){
            return NextResponse.json({message:'Image file is required'},{status:400})
        }

        let tags = JSON.parse(formData.get('tags') as string)
        let agenda = JSON.parse(formData.get('agenda') as string)

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);

        const uploadRestult = await new Promise((resolve,reject)=> {
            cloudinary.uploader.upload_stream({resource_type:'image', folder:'events'}, (error:Error| null, result:string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer)
        })

        event.image = (uploadRestult as {secure_url:string}).secure_url;
        
        const createdEvent = await Event.create({...event, tags, agenda});

        return NextResponse.json({message:'Event created successfully', event:createdEvent},{status:201})

    } catch (e) {
        console.log(e)
        return NextResponse.json({message:'Event creation failed', error: e instanceof Error ? e.message : "Unknown"},{status:500})
    }
}


export async function GET(){
    try {
        await connectToDatabase();
        const events = await Event.find().sort({createdAt:-1}) 

        if(events.length === 0){
            return NextResponse.json({message:'NO results were found'}, {status:404})
        }

        return NextResponse.json({message:'Events fetched successfully',events},{status:200});

    } catch (e) {
        return NextResponse.json({message:"Failed to fetch images", error: e instanceof Error ? e.message:"Unknown"},{status:500})
    }
}

