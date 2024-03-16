"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { IoIosLogOut } from "react-icons/io";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function User() {
  return (
    <div className="w-full h-fit py-4 px-5 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-3">
        <Avatar className="w-fit h-fit">
          {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
          <AvatarFallback className="text-xs p-1">AD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-white text-xs">
          <span>Administrador</span>
          <span>admin@admin.com</span>
        </div>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <ChevronDownIcon className="h-4 w-4 text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                console.log("Cerrar sesión");
              }}
            >
              <div className="flex flex-row space-x-2">
                <span className="ml-2">Cerrar sesión</span>
                <IoIosLogOut className="h-5 w-5 text-red-800" />
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
