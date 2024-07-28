import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessages } from "@/hooks/use-messages";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";

interface Props {
  ref: React.RefObject<HTMLDivElement>;
}

export default function UserInput({ ref }: Props) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { mutate } = useMessages();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(message);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ content: message }),
      });
      if (!res.ok) {
        setError("メッセージの送信に失敗しました");
        return;
      }
      const data = await res.json();
      console.log(data);
      mutate();
      setMessage("");
    } catch (error) {
      setError("メッセージの送信に失敗しました");
    } finally {
      setIsLoading(false);
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className={
        "fixed bottom-0 w-full flex flex-col items-center justify-center px-4 py-2 gap-1"
      }
    >
      {error && <p className='text-red-500'>{error}</p>}
      <div className='w-full flex items-center justify-between gap-3'>
        <Input
          placeholder={isLoading ? "送信中..." : "メッセージを入力"}
          value={message}
          onChange={handleChange}
        />
        <Button
          variant='default'
          size='icon'
          onClick={handleSubmit}
          disabled={!message || isLoading}
        >
          {isLoading ? (
            <Loader2 size={20} className='flex-none' />
          ) : (
            <Send size={20} className='flex-none' />
          )}
        </Button>
      </div>
    </div>
  );
}
