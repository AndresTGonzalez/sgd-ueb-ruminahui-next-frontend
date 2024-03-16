import { NavigationItem } from "@/models/uiModels";
import { FaHome, FaBuilding } from "react-icons/fa";

export const navigationOptions: NavigationItem[] = [
  {
    label: "Inicio",
    icon: <FaHome />,
    href: "/dashboard",
  },
  {
    label: "Sedes",
    icon: <FaBuilding />,
    href: "/dashboard/sedes",
  },
];
