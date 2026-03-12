'use server';

import { Event } from "@/database";
import connectToDatabase from "../mongodb";

export const getSimilierEventsBySlug = async (slug:string)=>{
    try{
        await connectToDatabase();


        const event = await Event.findOne({slug}).lean()

        if (!event) {
            return []
        }

        return await Event.find(
            {_id: {$ne: event._id}, tags: {$in: event.tags}},
            {slug: 1, title: 1, image: 1, date: 1, time: 1, location: 1, mode: 1, description: 1}
        ).lean()


        
    }catch{
        return []
    }
}