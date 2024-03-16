import Logo from "../Misc/Logo";
import User from "./User";

export default function Sidenav() {
  return (
    <aside className="w-72 h-full flex flex-col justify-between bg-blue-950">
      <div>
        {/* Logo de la institucion */}
        <Logo size={100} />
      </div>
      <div>{/* Opciones del menu */}</div>
      <div>
        {/* Icono del usuario */}
        <User />
      </div>
    </aside>
  );
}
