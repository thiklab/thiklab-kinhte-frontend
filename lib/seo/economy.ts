import type { EconomyEvent } from "@/lib/constants/economy-data";
import { slugify } from "./slug";

export const economyEventSlug = (event: EconomyEvent) => slugify(event[2]);

export const economyEventHref = (event: EconomyEvent) =>
  `/economy/${event[1]}/${economyEventSlug(event)}`;
