import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PublicHeader = ({ link, title }) => {
  return (
    <header className="border-b border-[#222] sticky top-0 bg-black/80 backdrop-blur-sm z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href={link}>
          <Button
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {title}
          </Button>
        </Link>
        <Link href={"/"} className="flex-shrink-0">
          <Image
            src="/creatr-logo.png"
            alt="Creatr Logo"
            width={140}
            height={48}
            className="h-10 sm:h-12 md:h-14 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  );
};

export default PublicHeader;
