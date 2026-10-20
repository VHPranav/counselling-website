"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";

export function ChipDemo({ labels }: { labels: string[] }) {
  const [selected, setSelected] = useState<number | null>(0);
  return (
    <div className="flex flex-wrap gap-3">
      {labels.map((label, i) => (
        <Chip key={label} selected={selected === i} onClick={() => setSelected(selected === i ? null : i)}>
          {label}
        </Chip>
      ))}
    </div>
  );
}
