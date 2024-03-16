"use client";

import { Button } from "../ui/button";
import { NavigationItem } from "@/models/uiModels";

import { useRouter } from "next/navigation";

export default function NavigationOption({
  option,
}: {
  option: NavigationItem;
}) {
  const router = useRouter();

  const handleNavigation = () => {
    console.log("option.href", option.href);
    router.push(option.href);
  };

  return (
    <Button
      className="w-full text-white mb-2 h-14 text-base font-light flex flex-row items-center justify-start text-left"
      size={"lg"}
      variant={"ghost"}
      key={option.label}
      onClick={handleNavigation}
    >
      {option.icon}
      <span className="ml-3">{option.label}</span>
    </Button>
  );
}
