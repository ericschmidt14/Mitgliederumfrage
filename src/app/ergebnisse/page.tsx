"use client";
import { DonutChart } from "@mantine/charts";
import { Pagination, Paper, Table, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/header";
import Loader from "../components/loader";
import Login from "../components/login";
import Row from "../components/row";
import { Result } from "../lib/interfaces";

export default function Page() {
  const { data: session, status } = useSession();
  const [results, setResults] = useState<Result[]>([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<string>("");

  const pageLimit = 25;

  const fetchData = () => {
    if (session) {
      fetch("/api", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
        })
        .catch((error) => {
          setResults([]);
          console.error(error);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (status === "loading") {
    return <Loader />;
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
      .filter((r) => {
        const keywords = search.toLowerCase().split(" ");

        return keywords.every((keyword) =>
          [r.Vorname, r.Nachname].some(
            (value) => value.toLowerCase().includes(keyword)
          )
        );
      })
      .reverse();

  const pageSize = pageLimit ? +pageLimit : 25;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPageData = filteredResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredResults.length / pageSize);

  const rows = currentPageData.map((r) => {
    return <Row key={r.token} data={r} fetchData={fetchData} />;
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
          <Table.Th />
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
        {results.length > 0 ? (
          table
        ) : (
          <p className="text-center muted p-8">Keine Ergebnisse vorhanden.</p>
        )}
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          className="flex justify-center"
        />
      </Paper>
    </>
  );
}
