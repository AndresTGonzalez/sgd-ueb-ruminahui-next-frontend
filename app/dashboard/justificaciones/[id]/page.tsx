import { Separator } from "@/components/ui/separator";
import { DocumentIcon } from "@heroicons/react/24/solid";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="w-full h-full flex flex-col justify-between mx-auto py-10">
      <div className="flex flex-col space-y-3">
        {/* Titulo */}
        <div className="flex flex-row space-x-3 px-8">
          <DocumentIcon className="w-8 h-8 text-gray-900" />
          {params.id === "0" ? (
            <h2 className="text-2xl">Agregar un nuevo campus</h2>
          ) : (
            <h2 className="text-2xl">Justificación de inasistencia</h2>
          )}
        </div>
        <Separator />
        {/* Inicia la parte de la pagina de informacion */}
        <div>
          <h2>Información personal</h2>
          <div className="grid grid-cols-1">
            <div className="flex flex-row">
              <label>Fecha de justificación: </label>
              <span>12/12/2021</span>
            </div>
          </div>
          {/* Nombres y apellidos */}
          <div className="grid grid-cols-2 gap-20">
            <div className="flex flex-row">
              <label>Nombres: </label>
              <span>Andres Patricio</span>
            </div>
            <div className="flex flex-row">
              <label>Apellidos: </label>
              <span>Tapia Gonzalez</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
