import { Button } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center gap-2 px-16 py-2 bg-black/50 backdrop-blur-lg text-white shadow-md">
      <Link href="/admin" className="logo">
        <Logo />
      </Link>
      {session && (
        <Button
          color="dark"
          leftSection={<IconLogout size={16} />}
          onClick={() => signOut()}
        >
          Abmelden
        </Button>
      )}
    </header>
  );
}
