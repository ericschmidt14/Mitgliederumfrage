"use client";
import { DonutChart } from "@mantine/charts";
import { Checkbox, Paper, Table, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Login from "../components/login";
import { Result } from "../lib/interfaces";

export default function Page() {
  const { data: session, status } = useSession();
  const [results, setResults] = useState<Result[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (session) {
      fetch("/api", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        });
    }
  }, [session]);

  if (status === "loading") {
    return <></>;
  }

  if (!session) {
    return <Login />;
  }

  const stats = [
    {
      name: "Ausweis",
      amount: results.filter((r) => r.survey.ausweis).length,
    },
    {
      name: "JHV",
      amount: results.filter((r) => r.survey.jhv).length,
    },
    {
      name: "Magazin",
      amount: results.filter((r) => r.survey.magazin).length,
    },
  ];

  const filteredResults =
    results &&
    results
      .filter((r) =>
        [r.Vorname, r.Nachname, r.MitgliedID.toString(), r.Email].some(
          (value) => value.toLowerCase().includes(search.toLowerCase())
        )
      )
      .reverse();

  const rows = filteredResults.map((r) => {
    return (
      <Table.Tr key={r.token}>
        <Table.Td>{r.MitgliedID}</Table.Td>
        <Table.Td>
          {r.Vorname} {r.Nachname}
        </Table.Td>
        <Table.Td>{r.Email}</Table.Td>
        {[r.survey.ausweis, r.survey.jhv, r.survey.magazin].map((s, i) => (
          <Table.Td key={i}>
            <Checkbox checked={s} readOnly />
          </Table.Td>
        ))}
        <Table.Td>{r.token}</Table.Td>
      </Table.Tr>
    );
  });

  const table = (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Nr</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>E-Mail</Table.Th>
          <Table.Th>Ausweis</Table.Th>
          <Table.Th>JHV</Table.Th>
          <Table.Th>Magazin</Table.Th>
          <Table.Th>Token</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );

  return (
    <>
      <Header />
      <Paper
        className="relative m-8 p-4 flex flex-col gap-4"
        radius="md"
        bg="rgba(0, 0, 0, 0.5)"
      >
        <div className="grid grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex justify-between items-end gap-2 px-4 py-2 bg-black/50 rounded-md"
            >
              <div>
                <h3>{s.name}</h3>
                <p className="flex items-center gap-1 muted">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: "var(--mantine-color-red-6)" }}
                  />
                  {s.amount} von {results.length}
                </p>
              </div>
              <DonutChart
                data={[
                  { name: "Ja", value: s.amount, color: "red.6" },
                  {
                    name: "Nein",
                    value: results.length - s.amount,
                    color: "dark.9",
                  },
                ]}
                size={96}
                paddingAngle={4}
              />
            </div>
          ))}
        </div>
        <TextInput
          placeholder="Suchen ..."
          leftSection={<IconSearch size={16} />}
          rightSection={<p>{filteredResults.length}</p>}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          styles={{
            input: {
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgb(66, 66, 66)",
            },
          }}
        />
        {table}
      </Paper>
    </>
  );
}
