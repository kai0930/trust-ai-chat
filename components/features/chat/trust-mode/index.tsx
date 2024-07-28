import { Button } from "@/components/ui/button";
import useTrustMode from "@/hooks/use-trust-mode";
import { cn } from "@/lib/utils";
import { CircleAlert, Handshake } from "lucide-react";
import { useState } from "react";

export default function TrustMode() {
  const { data, mutate } = useTrustMode();
  const [isLoading, setIsLoading] = useState(false);
  const isTrusting = () => {
    if (data?.start_time && data?.end_time) {
      const now = new Date();
      const start = new Date(data.start_time);
      const end = new Date(data.end_time);
      return now >= start && now <= end;
    }
    return false;
  };

  const handleClick = async () => {
    setIsLoading(true);
    mutate();
    if (isTrusting()) return;
    const res = await fetch("/api/trust-mode", {
      method: "PATCH",
    });
    mutate();
    setIsLoading(false);
  };

  if (isTrusting())
    return (
      <div
        className={cn(
          "fixed bottom-[60px] right-[20px] z-[20] flex items-center justify-center bg-[#ed5ce8] animate-bounce text-white px-4 py-2 rounded-md"
        )}
      >
        <Handshake className='w-4 h-4 mr-1' />
        <p>きびだんご使用中</p>
      </div>
    );

  return (
    <Button
      variant='default'
      className={cn(
        "fixed bottom-[60px] right-[20px] z-[20] flex items-center justify-center bg-secondary text-secondary-foreground",
        {
          "bg-[#BA80F4] animate-bounce text-white": isTrusting(),
        },
        {
          "animate-pulse": !isTrusting(),
        },
        {
          "opacity-50": isLoading,
        }
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      <CircleAlert className='w-4 h-4 mr-1' />
      {isTrusting() ? <p>きびだんご使用中</p> : <p>きびだんごを使用する</p>}
    </Button>
  );
}
