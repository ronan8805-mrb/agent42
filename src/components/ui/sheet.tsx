import type { ReactNode } from "react";
import { Drawer } from "vaul";
import { cn } from "@/lib/utils";

export function Sheet({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: ReactNode;
}) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange} direction="right">
      {children}
    </Drawer.Root>
  );
}

export function SheetContent({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-50 bg-ink/50" />
      <Drawer.Content
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-background text-foreground outline-none",
          className,
        )}
      >
        {children}
      </Drawer.Content>
    </Drawer.Portal>
  );
}

export const SheetTitle = Drawer.Title;
