import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
	return (
		<main>
			<h1>Home</h1>
			<UserButton afterSignOutUrl="/sign-in" />
		</main>
	);
}
