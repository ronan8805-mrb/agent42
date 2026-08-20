import { Badge } from "@/components/ui/badge";
import type { CallOutcome } from "@/lib/types";
import { outcomeLabel } from "@/lib/utils";

const map: Record<CallOutcome, "success" | "default" | "warning" | "danger"> = {
  booked: "success",
  message: "default",
  transferred: "warning",
  missed: "danger",
};

export function OutcomePill({ outcome }: { outcome: CallOutcome }) {
  return <Badge variant={map[outcome]}>{outcomeLabel(outcome)}</Badge>;
}
