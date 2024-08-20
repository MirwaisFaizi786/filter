import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

function Navbar() {
  return (
    <nav className="w-full bg-gray-100">
      <div className="bg-gray-100 max-w-screen-xl flex flex-wrap p-4 items-center justify-between mx-auto">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-100">Home</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-gray-100 p-2 ">
                <p>hello</p>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* about */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-100">Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <p>hello</p>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* contact */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-gray-100">Home</NavigationMenuTrigger>
              <NavigationMenuContent>
                <p>hello</p>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}

export default Navbar;
