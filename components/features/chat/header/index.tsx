"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";
import SignOutDialog from "./sign-out-dialog";

export default function ChatHeader() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full fixed top-0 h-14 bg-primary-500'>
      <div className='flex items-center justify-between px-4 py-2 bg-background/80'>
        <div className='flex items-center gap-2'>信頼チャット</div>
        <Button variant='ghost' size='icon' onClick={() => setIsOpen(true)}>
          <LogOut size={18} />
        </Button>
      </div>
      <SignOutDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
