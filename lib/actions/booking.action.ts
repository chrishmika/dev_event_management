'use server'

import connectToDatabase from '../mongodb';
import { Booking } from '@/database';

export const createBooking = async({eventId, slug, email}:{eventId:string; slug:string; email:string}) => {
try {
    await connectToDatabase();
    (await Booking.create({eventId, slug, email})).lean()
    return {success:true}
} catch (e) {
    console.log('create booking failed : ', e)
    return {success:false}
}
  
}

