// app/api/stats/route.ts

import { connectToDB } from '@/lib/db';
import { TicketModel } from "@/schemas/ticket"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        await connectToDB()

        const tickets = await TicketModel.aggregate([
            {
                $group: {
                    _id: { status: '$status'},
                    count: { $sum: 1}
                }
            }
        ])

        return NextResponse.json(tickets)

    } catch(error) {
        console.log(error)
        return NextResponse.json({
            message: "failed to get ticket stats"
        }, { status: 500 })
    }
}