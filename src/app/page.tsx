"use client";
import { Button, Checkbox, Paper } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [digitalId, setDigitalId] = useState(false);
  const [invitation, setInvitation] = useState(false);

  return (
    <div className="flex justify-center items-center p-8">
      <Paper
        p="xl"
        radius="md"
        w="666"
        bg="rgba(0, 0, 0, 0.5)"
        className="flex flex-col items-start gap-8"
      >
        <header className="w-full flex justify-between items-center pb-4">
          <div className="flex justify-center items-center gap-1 ">
            <Image src="/logo.svg" alt="1. FCN Logo" width={48} height={48} />
            <p className="text-2xl">
              <b>Mitglieder</b>
              <i>umfrage</i>
            </p>
          </div>
          <p className="muted">2025 Q1</p>
        </header>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(
              JSON.stringify({ token, digitalId, invitation }, null, 2)
            );
          }}
        >
          <Checkbox
            label="Ich möchte den Mitgliedsausweis digital erhalten."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus, ligula at fermentum egestas, sapien sem placerat tellus, et tristique lacus mauris in purus. Donec ac eros sodales nibh dapibus semper. Aliquam vulputate massa ut metus dapibus ullamcorper. Nunc sed volutpat ex. Aenean et nisl pretium magna auctor porta in ac quam."
            size="lg"
            checked={digitalId}
            onChange={(e) => setDigitalId(e.currentTarget.checked)}
          />
          <Checkbox
            label="Ich möchte die Einladung zur Jahreshauptversammlung digital erhalten."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus, ligula at fermentum egestas, sapien sem placerat tellus, et tristique lacus mauris in purus. Donec ac eros sodales nibh dapibus semper. Aliquam vulputate massa ut metus dapibus ullamcorper. Nunc sed volutpat ex. Aenean et nisl pretium magna auctor porta in ac quam."
            size="lg"
            checked={invitation}
            onChange={(e) => setInvitation(e.currentTarget.checked)}
          />
        </form>
        <p className="small">
          Ich bin damit einverstanden, dass der 1. Fußball-Club Nürnberg e.V.
          mir regelmäßig Informationen zu den oben genannten Themen per E-Mail
          an die angegebene E-Mail-Adresse zukommen lässt. Meine Einwilligung
          kann ich jederzeit mit Wirkung für die Zukunft widerrufen.
        </p>
        <Button
          type="submit"
          fullWidth
          leftSection={<IconDeviceFloppy size={16} />}
        >
          Speichern
        </Button>
      </Paper>
    </div>
  );
}
