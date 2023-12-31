import getCurrentUser from "@/libs/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb'
export async function POST(requset: Request) {
    try {
        const currentUser = await getCurrentUser()
        const body = await requset.json()
        const { image, name } = body

        if (!currentUser?.id) return new NextResponse('Unauthorized', { status: 401 })

        const updateUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                image,
                name
            }
        })
        return NextResponse.json(updateUser)
    } catch (error: any) {
        console.log(error, "ERROR_SETTINGS");
        return new NextResponse("Internal Error", { status: 500 })
    }
}