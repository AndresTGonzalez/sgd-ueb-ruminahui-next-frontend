import Logo from "../Misc/Logo";
import NavigationOption from "./NavigationOption";
import User from "./User";
import { navigationOptions } from "@/utils/navigationOptions";

export default function Sidenav() {
  return (
    <aside className="w-60 h-full flex flex-col justify-between bg-blue-950">
      <div>
        <div>
          <Logo size={100} />
        </div>
        <div className="mt-2">
          {navigationOptions.map((option) => (
            <NavigationOption option={option} key={option.label} />
          ))}
        </div>
      </div>
      <div>
        <User />
      </div>
    </aside>
  );
}
