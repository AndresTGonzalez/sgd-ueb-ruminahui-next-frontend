import { NavigationItem } from "@/models/uiModels";

import {
  AcademicCapIcon,
  CalendarDaysIcon,
  HomeIcon,
  BuildingOfficeIcon,
  KeyIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

export const navigationOptions: NavigationItem[] = [
  {
    label: "Inicio",
    icon: <HomeIcon width={20} />,
    href: "/dashboard",
  },
  {
    label: "Asistencia",
    icon: <CalendarDaysIcon width={20} />,
    href: "/dashboard/asistencia",
  },
  {
    label: "Docentes",
    icon: <AcademicCapIcon width={20} />,
    href: "/dashboard/docentes",
  },
  {
    label: "Administrativos",
    icon: <KeyIcon width={20} />,
    href: "/dashboard/administrativos",
  },
  {
    label: "Logística",
    icon: <UserGroupIcon width={20} />,
    href: "/dashboard/logistica",
  },
  {
    label: "Sedes",
    icon: <BuildingOfficeIcon width={20} />,
    href: "/dashboard/sedes",
  },
];
