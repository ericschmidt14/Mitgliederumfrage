"use client";

import {
  ActionIcon,
  Button,
  Checkbox,
  CopyButton,
  Popover,
  Table,
} from "@mantine/core";
import { IconCheck, IconClipboard, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { Result } from "../lib/interfaces";

export default function Row({
  data,
  fetchData,
}: {
  data: Result;
  fetchData: () => void;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <Table.Tr>
      <Table.Td>{data.MitgliedID}</Table.Td>
      <Table.Td>
        {data.Vorname} {data.Nachname}
      </Table.Td>
      <Table.Td>{data.Email}</Table.Td>
      {[data.survey.ausweis, data.survey.jhv, data.survey.magazin].map(
        (s, i) => (
          <Table.Td key={i}>
            <Checkbox checked={s} readOnly />
          </Table.Td>
        )
      )}
      <Table.Td>{data.token}</Table.Td>
      <Table.Td className="flex justify-end">
        <ActionIcon.Group>
          <CopyButton
            value={
              typeof window !== "undefined"
                ? `${window.location.origin}?token=${data.token}`
                : data.token
            }
          >
            {({ copied, copy }) => (
              <ActionIcon color="dark" onClick={copy}>
                {copied ? <IconCheck size={16} /> : <IconClipboard size={16} />}
              </ActionIcon>
            )}
          </CopyButton>
          <Popover
            opened={opened}
            onChange={setOpened}
            withArrow
            position="left"
          >
            <Popover.Target>
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => setOpened((o) => !o)}
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown>
              <div className="flex items-baseline gap-4">
                <p>Datensatz endgültig löschen?</p>
                <Button
                  onClick={() =>
                    fetch(`/api/token/${data.token}`, {
                      method: "DELETE",
                    })
                      .then((res) => res.text())
                      .then(() => {
                        setOpened(false);
                        fetchData();
                      })
                      .catch((error) => console.error(error))
                  }
                >
                  Ja
                </Button>
                <Button variant="transparent" onClick={() => setOpened(false)}>
                  Nein
                </Button>
              </div>
            </Popover.Dropdown>
          </Popover>
        </ActionIcon.Group>
      </Table.Td>
    </Table.Tr>
  );
}
