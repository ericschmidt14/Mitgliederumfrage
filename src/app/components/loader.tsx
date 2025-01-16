import { IconLoader2 } from "@tabler/icons-react";

export default function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <IconLoader2 size={48} className="animate-spin" />
    </div>
  );
}
