import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

// Handles the OAuth redirect back from Apple / Google.
// Clerk completes the session, then redirects to redirectUrlComplete.
export default function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />;
}
