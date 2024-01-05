import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'

const createIssueSchema = z.object({ 
    title: z.string().min(1).max(255),
    description: z.string().min(3),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional()
 })

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    console.log('validation', validation)
    if(!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }
   const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description, priority: body.priority }
    })
    return NextResponse.json(newIssue, { status: 201})
}
