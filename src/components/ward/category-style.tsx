import {
  Syringe,
  ScanLine,
  Stethoscope,
  Share2,
  Pill,
  FileText,
  PackageCheck,
  MessagesSquare,
} from "lucide-react";
import type { ComponentType } from "react";

import type { JobCategory } from "@/lib/ward-data";

type CatStyle = {
  icon: ComponentType<{ className?: string }>;
  /** text colour class */
  text: string;
  /** soft tinted background */
  soft: string;
  /** solid background for strong chips */
  solid: string;
  /** left accent border */
  border: string;
  dot: string;
};

export const CATEGORY_STYLE: Record<JobCategory, CatStyle> = {
  bedside: {
    icon: Syringe,
    text: "text-cat-bedside",
    soft: "bg-cat-bedside/12 text-cat-bedside ring-1 ring-cat-bedside/30",
    solid: "bg-cat-bedside text-background",
    border: "border-cat-bedside/40",
    dot: "bg-cat-bedside",
  },
  imaging: {
    icon: ScanLine,
    text: "text-cat-imaging",
    soft: "bg-cat-imaging/12 text-cat-imaging ring-1 ring-cat-imaging/30",
    solid: "bg-cat-imaging text-background",
    border: "border-cat-imaging/40",
    dot: "bg-cat-imaging",
  },
  review: {
    icon: Stethoscope,
    text: "text-cat-review",
    soft: "bg-cat-review/12 text-cat-review ring-1 ring-cat-review/30",
    solid: "bg-cat-review text-background",
    border: "border-cat-review/40",
    dot: "bg-cat-review",
  },
  referral: {
    icon: Share2,
    text: "text-cat-referral",
    soft: "bg-cat-referral/12 text-cat-referral ring-1 ring-cat-referral/30",
    solid: "bg-cat-referral text-background",
    border: "border-cat-referral/40",
    dot: "bg-cat-referral",
  },
  prescribing: {
    icon: Pill,
    text: "text-cat-prescribing",
    soft: "bg-cat-prescribing/12 text-cat-prescribing ring-1 ring-cat-prescribing/30",
    solid: "bg-cat-prescribing text-background",
    border: "border-cat-prescribing/40",
    dot: "bg-cat-prescribing",
  },
  discharge: {
    icon: FileText,
    text: "text-cat-discharge",
    soft: "bg-cat-discharge/12 text-cat-discharge ring-1 ring-cat-discharge/30",
    solid: "bg-cat-discharge text-background",
    border: "border-cat-discharge/40",
    dot: "bg-cat-discharge",
  },
  tto: {
    icon: PackageCheck,
    text: "text-cat-tto",
    soft: "bg-cat-tto/12 text-cat-tto ring-1 ring-cat-tto/30",
    solid: "bg-cat-tto text-background",
    border: "border-cat-tto/40",
    dot: "bg-cat-tto",
  },
  communication: {
    icon: MessagesSquare,
    text: "text-cat-communication",
    soft: "bg-cat-communication/12 text-cat-communication ring-1 ring-cat-communication/30",
    solid: "bg-cat-communication text-background",
    border: "border-cat-communication/40",
    dot: "bg-cat-communication",
  },
};
