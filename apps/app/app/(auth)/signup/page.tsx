import { Metadata } from "next";
import { AuthForm } from "../components/auth-form";

export const metadata: Metadata = {
  title: "Signup - EverSub",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex-center">
      <AuthForm mode="signup" className="w-full max-w-md" />
    </div>
  );
}
