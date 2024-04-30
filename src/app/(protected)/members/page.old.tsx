import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function getData(): Promise<Payment[]> {
	// Fetch data from your API here.
	return [
	  {
		id: "728ed52f",
		amount: 100,
		status: "pending",
		email: "m@a.com",
	  },
	  {
		id: "728ed522",
		amount: 100,
		status: "pending",
		email: "m@b.com",
	  },
	  {
		id: "728ed521",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed52f",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed522",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed521",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed52f",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed522",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed521",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed52f",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed522",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	  {
		id: "728ed521",
		amount: 100,
		status: "pending",
		email: "m@example.com",
	  },
	]
  }

const MembersPage = async () => {
	const session = await getServerSession();

	if (!session?.user) {
		redirect('/login');
	}

	console.log(session.user)
	const data = await getData();

	return (
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default MembersPage;
