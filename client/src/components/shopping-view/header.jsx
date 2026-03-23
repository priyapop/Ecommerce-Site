import React from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "../ui/label";
import { shoppingViewHeaderMenuItems } from "@/config";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { CiShoppingCart } from "react-icons/ci";
import { DropdownMenuTrigger,DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "@/store/auth-slice";


function MenuItems() {
  const navigate = useNavigate();
  return (
    <nav className="flex p-4 flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link className="text-sm font-md" key={menuItem.id} to={menuItem.path}>
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
   const { user } = useSelector((state) => state.auth);
   const navigte = useNavigate();
   const dispatch = useDispatch();
   function handleLogout(){
    dispatch(logoutUser())
   }
  return (
    <div className="flex flex-col p-4 lg:items-center lg:flex-row gap-4">
      <Button variant="outline" size="icon">
        <CiShoppingCart className="w-7 h-7" />
        <span className="sr-only">USer Cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
         <Avatar className="bg-black">
        <AvatarFallback className="bg-black text-white font-extrabold">
          {user?.userName[0].toUpperCase()}
        </AvatarFallback>
         </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as  {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={()=>navigte('/shop/account')}>
          <FaRegUser className="mr-2 h-4 w-4 fill-black" />
          Account
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem onClick={handleLogout}>
          <LuLogOut className="mr-2 h-4 w-4 stroke-black"  />
          Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <IoMdHome className="h-7 w-7" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <RxHamburgerMenu className="h-7 w-7" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full  max-w-xs">
            <MenuItems />
            <HeaderRightContent/>
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>
        
          <div className="hidden lg:block">
            <HeaderRightContent />
          </div>
        
      </div>
    </header>
  );
}

export default ShoppingHeader;
