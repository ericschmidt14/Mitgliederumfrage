"use client";
import { Button, Paper } from "@mantine/core";
import { IconBrandWindows } from "@tabler/icons-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CoMo from "./como";
import Logo from "./logo";

export default function Login() {
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const errorFromQuery = searchParams.get("error");
    if (errorFromQuery === "CredentialsSignin") {
      setError("Wrong password. Please try again.");
    } else if (errorFromQuery) {
      setError("An unknown error occurred. Please try again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", { redirect: false, password });

    if (result?.error) {
      setError("Wrong password. Please try again.");
    }
  };
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center bg-[length:300%_300%] bg-gradient-to-r from-[#b3193e] via-[#aa1124] via-30% to-[#220407] bg-right">
      <Paper
        radius="md"
        shadow="xl"
        bg="rgba(0,0,0,0.6)"
        className="w-[480px] relative z-50 p-8 flex flex-col items-center gap-8 backdrop-blur-md shadow-2xl shadow-black/60"
      >
        <Logo />
        <Button
          color="red"
          onClick={() => signIn("azure-ad")}
          leftSection={<IconBrandWindows size={16} />}
          className="w-full"
        >
          Mit Azure AD anmelden
        </Button>
        <CoMo />
      </Paper>
    </div>
  );
}
