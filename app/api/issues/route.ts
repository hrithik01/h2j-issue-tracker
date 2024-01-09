import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/client'
import { createIssueSchema } from '../../validationSchema'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = createIssueSchema.safeParse(body)
    console.log('validation', validation)
    if(!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
   const newIssue = await prisma.issue.create({
        data: { title: body.title, description: body.description, priority: body.priority }
    })
    return NextResponse.json(newIssue, { status: 201})
}
