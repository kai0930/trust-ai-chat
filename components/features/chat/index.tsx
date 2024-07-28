import ChatHeader from "./header";
import Messages from "./messages";
import UserInput from "./user-input";

export default function ChatPage() {
  return (
    <div className='w-screen min-h-screen flex flex-col justify-center items-center'>
      <ChatHeader />
      <Messages className='w-full mt-20' />
      <UserInput />
    </div>
  );
}
