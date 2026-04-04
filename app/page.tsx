import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import IntroPage from "@/components/intro/IntroPage";

export default async function RootPage() {
  const { userId } = await auth();

  // Authenticated users skip the landing page
  if (userId) redirect("/home");

  return <IntroPage />;
}
