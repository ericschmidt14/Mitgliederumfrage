export default function Footer() {
  return (
    <footer className="px-8 py-4 justify-between items-center flex flex-col-reverse md:flex-row gap-4">
      <div className="justify-start items-start gap-8 flex">
        <p className="hidden md:block">© 1. FC Nürnberg e.V.</p>
        <nav className="flex gap-8">
          <a href="https://www.fcn.de/standards/impressum/" target="_blank">
            Impressum
          </a>
          <a
            href="https://www.fcn.de/standards/datenschutzerklaerung/"
            target="_blank"
          >
            Datenschutz
          </a>
        </nav>
      </div>
    </footer>
  );
}
