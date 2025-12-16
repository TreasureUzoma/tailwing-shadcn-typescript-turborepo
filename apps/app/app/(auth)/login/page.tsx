import { Metadata } from "next";
import { AuthForm } from "../components/auth-form";

export const metadata: Metadata = {
  title: "Login - EverSub",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex-center">
      <AuthForm mode="login" className="w-full max-w-md" />
    </div>
  );
}
