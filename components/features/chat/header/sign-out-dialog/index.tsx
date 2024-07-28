import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

import { useState } from "react";

export default function SignOutDialog({ isOpen, onOpenChange }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signOut = async () => {
    setIsLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    onOpenChange(false);
    setIsLoading(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-[300px]'>
        <DialogTitle>ログアウト</DialogTitle>
        <DialogDescription>本当にログアウトしますか？</DialogDescription>
        <div className='w-full flex justify-between mt-4'>
          <Button variant='destructive' onClick={signOut} disabled={isLoading}>
            {isLoading ? "ログアウト中..." : "ログアウト"}
          </Button>
          <Button variant='outline' onClick={() => onOpenChange(false)}>
            キャンセル
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
