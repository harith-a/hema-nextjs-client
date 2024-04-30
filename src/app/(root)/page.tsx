import { Dashboard } from '@/components/Dashboard';
import { getServerSession } from 'next-auth';

export default async function Home() {
	const session = await getServerSession();

	return (
		<Dashboard />
	);
}
