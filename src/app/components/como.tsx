import Image from "next/image";

export default function CoMo() {
  return (
    <a href="https://como-solution.de" target="_blank">
      <p className="text-xs flex items-center gap-1 opacity-75">
        Ein Produkt der
        <Image src="/como.svg" width={20} height={20} alt="CoMo Logo" />
        CoMo Solution GmbH
      </p>
    </a>
  );
}
