import Typography from "@/components/common/typography";
import { cn } from "@/lib/utils";
import { Message, MessageRole } from "@/types/chat-types";
import { Bot, User } from "lucide-react";

interface Props {
  message: Message;
  className?: string;
}

export default function MessageItem({ message, className }: Props) {
  return (
    <div
      className={cn(
        className,
        "w-full flex flex-row",
        message.role === MessageRole.User ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs flex items-start rounded-md py-1 px-2",
          message.role === MessageRole.User
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        )}
      >
        {message.role === MessageRole.Assistant && (
          <Bot className={"w-6 h-6 mr-2 flex-none"} />
        )}
        <Typography variant='p'>{message.content}</Typography>
        {message.role === MessageRole.User && (
          <User className={"w-6 h-6 ml-2 flex-none"} />
        )}
      </div>
    </div>
  );
}
