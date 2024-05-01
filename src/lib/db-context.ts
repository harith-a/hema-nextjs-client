import { prisma } from "./prisma";

export function getMembers(skip: number = 10, take: number = 10) {
    return prisma.member.findMany({ skip, take });    
}