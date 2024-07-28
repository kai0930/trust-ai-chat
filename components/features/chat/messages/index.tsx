import { cn } from "@/lib/utils";
import MessageItem from "./message-item";
import { useMessages } from "@/hooks/use-messages";
import { Loader } from "lucide-react";

interface Props {
  className?: string;
  ref: React.RefObject<HTMLDivElement>;
}

export default function Messages({ className, ref }: Props) {
  const { data: messages, error, isLoading, mutate } = useMessages();

  return (
    <div className={cn(className, "flex flex-col min-h-screen px-4")}>
      <div className='flex-1 w-full flex flex-col items-center gap-4 pb-32'>
        {isLoading ? (
          <div>
            <Loader className='w-4 h-4 animate-spin' />
          </div>
        ) : error || !messages ? (
          <div>エラーが発生しました</div>
        ) : (
          messages.map((message, index) => (
            <MessageItem key={message.id} message={message} />
          ))
        )}
        <div ref={ref} />
      </div>
    </div>
  );
}
