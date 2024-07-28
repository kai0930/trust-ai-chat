"use client";

import { useRef } from "react";
import ChatHeader from "./header";
import Messages from "./messages";
import UserInput from "./user-input";
import TrustMode from "./trust-mode";

export default function ChatPage() {
  const endMessageRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className='w-screen min-h-screen flex flex-col justify-center items-center'>
      <ChatHeader />
      <Messages className='w-full mt-20' ref={endMessageRef} />
      <TrustMode />
      <UserInput ref={endMessageRef} />
    </div>
  );
}
