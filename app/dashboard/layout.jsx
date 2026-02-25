"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PenTool,
  FileText,
  Users,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { api } from "@/convex/_generated/api";
import { useConvexQuery } from "@/hooks/use-convex-query";
import Image from "next/image";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Create Post",
    href: "/dashboard/create",
    icon: PenTool,
  },
  {
    title: "My Posts",
    href: "/dashboard/posts",
    icon: FileText,
  },
  {
    title: "Followers",
    href: "/dashboard/followers",
    icon: Users,
  },
];

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Get draft info for badge
  const { data: draftPost } = useConvexQuery(api.posts.getUserDraft);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-black text-white bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-[#050505]/95 backdrop-blur-md border-r border-[#222] z-50 transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#222]">
          <Link href={"/"} className="flex-shrink-0">
            <Image
              src="/creatr-logo.png"
              alt="Creatr Logo"
              width={140}
              height={48}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Mobile Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 rounded-none transition-all duration-200 group border-l-4",
                    isActive
                      ? "bg-[#111] border-l-[#cc0000] text-white"
                      : "border-l-transparent text-gray-500 hover:text-white hover:bg-[#111]"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors",
                      isActive
                        ? "text-[#cc0000]"
                        : "text-gray-600 group-hover:text-white"
                    )}
                  />
                  <span className="font-bold uppercase tracking-tight">{item.title}</span>

                  {/* Badge for Create Post if draft exists */}
                  {item.title === "Create Post" && draftPost && (
                    <Badge
                      className="ml-auto text-xs bg-[#222] text-white rounded-none border-none hover:bg-[#333]"
                    >
                      Draft
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/dashboard/settings">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start text-slate-300 hover:text-white rounded-xl p-4"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-0 lg:ml-64">
        {/* Top Header */}
        <header
          className="fixed w-full top-0 right-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#222]"
        // style={{ left: "auto", width: "calc(100% - 16rem)" }}
        >
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Left Side - Mobile Menu + Search */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {/* Right Side - Notifications + User */}
            <div className="flex items-center space-x-4">
              {/* User Button */}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-none border border-[#444]",
                    userButtonPopoverCard:
                      "shadow-[0_0_20px_rgba(204,0,0,0.1)] backdrop-blur-md bg-[#050505]/95 border border-[#222] rounded-none",
                    userPreviewMainIdentifier: "font-bold text-white uppercase",
                  },
                }}
                afterSignOutUrl="/"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mt-16">{children}</main>
      </div>
    </div>
  );
}
