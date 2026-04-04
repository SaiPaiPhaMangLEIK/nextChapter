export const dynamic = "force-dynamic";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import BottomNav from "@/components/ui/BottomNav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/onboarding");

  return (
    <div className="relative min-h-screen bg-cream">
      <main>{children}</main>
      <BottomNav />
    </div>
  );
}
