
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchInput = searchParams.get('searchInput')

  if (!searchInput) {
    return new Response('No search input provided', { status: 400 });
  }

  const results = await prisma.member.findMany({
    where: {
      Name: {
        contains: searchInput,
      },
    },
    select: {
      Id: true,
      Name: true,
      NomborAhli: true,
    },
    take: 10,
  });

  return new Response(JSON.stringify(results));
}