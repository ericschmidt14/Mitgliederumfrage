export interface Result {
  token: string;
  Vorname: string;
  Nachname: string;
  Email: string;
  MitgliedID: number;
  KundeID: number;
  survey: Survey;
}

export interface Survey {
  titel: string;
  ausweis: boolean;
  jhv: boolean;
  magazin: boolean;
}

export interface Payload {
  token: string | null;
  email?: string | null;
  survey: string;
  ausweis: boolean;
  jhv: boolean;
  magazin: boolean;
}
