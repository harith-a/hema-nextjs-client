import { db } from "@/lib/db";

export function getMembers() {
    return db.member.findMany();    
}
