"use client";

import { Button } from "../ui/button";
import { NavigationItem } from "@/models/uiModels";

import { useRouter, usePathname } from "next/navigation";

export default function NavigationOption({
  option,
}: {
  option: NavigationItem;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isSelected =
    pathname.includes(option.href) && option.href !== "/dashboard";

  const handleNavigation = () => {
    router.push(option.href);
  };

  return (
    <Button
      className={`w-full h-12 font-light flex flex-row items-center justify-start space-x-3 rounded-none hover:bg-blue-900 hover:text-white text-white ${
        isSelected ? "bg-blue-900 font-bold" : ""
      }`}
      variant={"ghost"}
      key={option.label}
      onClick={handleNavigation}
    >
      {option.icon}
      <span className="ml-3">{option.label}</span>
    </Button>
  );
}
