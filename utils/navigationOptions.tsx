import { NavigationItem } from "@/models/navigationItem";

import {
  CalendarDaysIcon,
  HomeIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  DocumentIcon,
} from "@heroicons/react/24/solid";

export const navigationOptions: NavigationItem[] = [
  // {
  //   label: "Inicio",
  //   icon: <HomeIcon width={20} />,
  //   href: "/dashboard",
  // },
  {
    label: "Asistencia",
    icon: <CalendarDaysIcon width={20} />,
    href: "/dashboard/asistencia",
  },
  {
    label: "Personal",
    icon: <UserGroupIcon width={20} />,
    href: "/dashboard/personal",
  },
  {
    label: "Justificaciones",
    icon: <DocumentIcon width={20} />,
    href: "/dashboard/justificaciones",
  },
  {
    label: "Sedes",
    icon: <BuildingOfficeIcon width={20} />,
    href: "/dashboard/sedes",
  },
];
