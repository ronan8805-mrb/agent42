import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { OutcomePill } from "@/components/app/outcome";
import { UpgradeGate } from "@/components/app/upgrade-gate";
import { Button } from "@/components/ui/button";
import { useAppStore, useSessionUser } from "@/lib/store";
import { formatDateTime, formatDuration } from "@/lib/utils";

export const Route = createFileRoute("/app/calls/$id")({
  component: CallDetail,
});

function CallDetail() {
  const { id } = Route.useParams();
  const user = useSessionUser()!;
  const call = useAppStore((s) => s.calls.find((c) => c.id === id));
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  if (user.plan === "starter") return <UpgradeGate feature="Transcripts" />;
  if (!call || call.clientId !== user.id) throw notFound();

  return (
    <div className="space-y-8">
      <p className="text-xs text-muted">
        <Link to="/app/calls" className="hover:text-foreground">
          Calls
        </Link>
      </p>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-medium tracking-tight">{call.callerName}</h1>
          <p className="mt-1 text-sm text-muted">
            {call.from} → {call.to} · {formatDateTime(call.startedAt)} ·{" "}
            <span className="tabular">{formatDuration(call.durationSec)}</span>
          </p>
        </div>
        <OutcomePill outcome={call.outcome} />
      </div>

      <div className="rounded-2xl border border-line p-5">
        <p className="text-xs text-muted">Recording</p>
        <div className="mt-3 flex items-end gap-1">
          {Array.from({ length: 32 }).map((_, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-accent/70"
              style={{
                height: `${10 + ((i * 17) % 28)}px`,
                animation: playing ? `wave 0.9s ease-in-out ${i * 40}ms infinite` : undefined,
                transformOrigin: "bottom",
              }}
            />
          ))}
        </div>
        <audio
          ref={audio}
          src={call.recordingUrl}
          onEnded={() => setPlaying(false)}
          className="hidden"
        />
        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={() => {
            const el = audio.current;
            if (!el) return;
            if (playing) {
              el.pause();
              setPlaying(false);
            } else {
              void el.play();
              setPlaying(true);
            }
          }}
        >
          {playing ? "Pause" : "Play recording"}
        </Button>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium">Transcript</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const write = navigator.clipboard?.writeText(call.transcript);
              if (write) {
                void write
                  .then(() => toast.success("Transcript copied"))
                  .catch(() => toast.success("Transcript ready"));
              } else {
                toast.success("Transcript ready");
              }
            }}
          >
            Copy transcript
          </Button>
        </div>
        <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-line bg-mist/50 p-5 font-sans text-sm leading-relaxed">
          {call.transcript}
        </pre>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Summary</p>
          <p className="mt-2 text-sm">{call.summary}</p>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <p className="text-xs text-muted">Tools used</p>
          <p className="mt-2 text-sm">{call.tools.join(", ")}</p>
          <p className="mt-3 text-xs text-muted">Sentiment · {call.sentiment}</p>
        </div>
      </div>
    </div>
  );
}
