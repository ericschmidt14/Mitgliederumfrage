"use client";
import { Button, Checkbox, Paper } from "@mantine/core";
import { IconDeviceFloppy, IconLoader2 } from "@tabler/icons-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SURVEY } from "./constants";

export default function Page() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");
  const [id, setId] = useState(false);
  const [invitation, setInvitation] = useState(false);
  const [magazin, setMagazin] = useState(false);

  useEffect(() => {
    fetch(`/api/token/${token}`, {
      method: "GET",
    })
      .then((res) => res.status)
      .then((data) => {
        if (data === 500) {
          setStatus("error");
        } else if (data === 200) {
          setStatus("alreadyAnswered");
        } else {
          setStatus("unknown");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [token]);

  const handleSubmit = () => {
    fetch("/api", {
      method: "POST",
      body: JSON.stringify(
        {
          token,
          survey: SURVEY,
          ausweis: id,
          jhv: invitation,
          magazin: magazin,
        },
        null,
        2
      ),
    })
      .then((res) => res.status)
      .then((data) => {
        if (data === 200) {
          setStatus("success");
        } else if (data === 404) {
          setStatus("notFound");
        } else if (data === 409) {
          setStatus("alreadyAnswered");
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  };

  const renderContent = () => {
    switch (status) {
      case "loading":
        return (
          <div className="w-full flex justify-center">
            <IconLoader2 size={48} className="animate-spin" />
          </div>
        );
      case "error":
        return (
          <>
            <p>
              Ein Fehler ist aufgetreten:{" "}
              <b>{token ? "Ungültiges Token" : "Kein Token vorhanden"}.</b>
            </p>
            <p>
              Bitte klicke den Link in der E-Mail erneut. Sollte der Fehler
              weiterhin bestehen bleiben, kontaktiere{" "}
              <a href="mitglied@fcn.de">mitglied@fcn.de</a>.
            </p>
          </>
        );
      case "alreadyAnswered":
        return (
          <>
            <p>Die Umfrage wurde bereits beantwortet.</p>
            <p>
              <b>Vielen Dank!</b>
            </p>
          </>
        );
      case "success":
        return (
          <>
            <p>Die Umfrage wurde vollständig beantwortet.</p>
            <p>
              <b>Vielen Dank!</b>
            </p>
          </>
        );
      case "notFound":
        return (
          <>
            <p>
              Ein Fehler ist aufgetreten:{" "}
              <b>
                Dem angegebenen Token konnte kein Mitglied zugeordnet werden.
              </b>
            </p>
            <p>
              Bitte klicke den Link in der E-Mail erneut. Sollte der Fehler
              weiterhin bestehen bleiben, kontaktiere{" "}
              <a href="mitglied@fcn.de">mitglied@fcn.de</a>.
            </p>
          </>
        );
      default:
        return (
          <>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Checkbox
                label="Ich möchte den Mitgliedsausweis digital erhalten."
                size="lg"
                checked={id}
                onChange={(e) => setId(e.currentTarget.checked)}
              />
              <Checkbox
                label="Ich möchte die Einladung zur Jahreshauptversammlung digital erhalten."
                size="lg"
                checked={invitation}
                onChange={(e) => setInvitation(e.currentTarget.checked)}
              />
              <Checkbox
                label="Ich möchte das Mitgliedermagazin digital erhalten."
                size="lg"
                checked={magazin}
                onChange={(e) => setMagazin(e.currentTarget.checked)}
              />
            </form>
            <p className="small">
              Ich bin damit einverstanden, dass der 1. Fußball-Club Nürnberg
              e.V. mir regelmäßig Informationen zu den oben genannten Themen per
              E-Mail an die angegebene E-Mail-Adresse zukommen lässt. Meine
              Einwilligung kann ich jederzeit mit Wirkung für die Zukunft
              widerrufen.
            </p>
            <Button
              type="submit"
              size="md"
              fullWidth
              leftSection={<IconDeviceFloppy size={20} />}
              onClick={() => handleSubmit()}
            >
              Meine Auswahl speichern
            </Button>
          </>
        );
    }
  };

  return (
    <div className="flex justify-center items-center py-16 px-4">
      <Paper
        p="xl"
        radius="md"
        w="680"
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
          <p className="small muted">{SURVEY}</p>
        </header>
        {renderContent()}
      </Paper>
    </div>
  );
}
