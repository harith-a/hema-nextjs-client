import { Dashboard } from '@/components/Dashboard';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
	const session = await getServerSession();

	if (!session?.user) {
		redirect('/login');
	}

	return <Dashboard />;
};

export default DashboardPage;

