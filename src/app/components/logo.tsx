import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-default">
      <Image src="/logo.svg" width={48} height={48} alt="1. FCN Logo" />
      <div className="flex items-center gap-8">
        <p className="text-4xl">
          <b>Mitglieder</b>
          <i>umfrage</i>
        </p>
      </div>
    </div>
  );
}
