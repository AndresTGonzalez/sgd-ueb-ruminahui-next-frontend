import InfoCard from "@/components/Dashboard/HomePage/InfoCard";
import { Separator } from "@/components/ui/separator";

export default function Page() {
  return (
    <div className="w-full h-full p-10 bg-neutral-100">
      <div className="flex flex-col space-y-1">
        <h1 className="text-2xl">Sistema de Gestión Docente</h1>
        <Separator />
      </div>
    </div>
  );
}
