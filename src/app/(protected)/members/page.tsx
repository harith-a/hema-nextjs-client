import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { DataTable } from '@/components/DataTable';
import { CardHeader, CardTitle, CardDescription, CardContent, Card } from '@/components/ui/card';
import { getMembers } from '@/lib/db-context';

const MembersPage = async () => {
	const session = await getServerSession();

	if (!session?.user) {
		redirect('/login');
	}

    const data = await getMembers(20, 10);
    console.log('length', data.length);
    

	return (

        <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card>
                    <CardHeader className='px-7'>
                        <CardTitle>Members</CardTitle>
                        <CardDescription>
                        Ahli Pertubuhan IKRAM Malaysia
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable/>
                    </CardContent>
                    </Card>
            </main>
        </div>
    );
};

export default MembersPage;


