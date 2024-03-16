import { Separator } from "@/components/ui/separator";

export default function InfoCard() {
  return (
    <div className="w-96 h-full p-6 bg-white rounded-3xl shadow-md">
      <div className="flex flex-col space-y-1">
        <h4 className="text-2xl font-medium text-neutral-700">Docentes</h4>
        <Separator />
      </div>
    </div>
  );
}
