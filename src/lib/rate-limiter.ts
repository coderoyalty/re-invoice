import { RateLimitError } from "@/use-cases/errors";
import { getIp } from "./get-ip";

const PRUNE_INTERVAL = 60 * 1000;

const trackers = new Map<
  string,
  {
    count: number;
    expiresAt: number;
  }
>();

function pruneTrackers() {
  const now = Date.now();

  trackers.forEach((value, key) => {
    if (value.expiresAt < now) {
      trackers.delete(key);
    }
  });
}

setInterval(pruneTrackers, PRUNE_INTERVAL);

export async function rateLimitByIp({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  const ip = getIp();

  if (!ip) {
    throw new RateLimitError();
  }

  await rateLimitByKey({
    key: `${ip}-${key}`,
    limit,
    window,
  });
}

export async function rateLimitByKey({
  key = "global",
  limit = 1,
  window = 10000,
}: {
  key: string;
  limit: number;
  window: number;
}) {
  let tracker = trackers.get(key) || { count: 0, expiresAt: 0 };

  if (tracker.expiresAt < Date.now()) {
    tracker.count = 0;
    tracker.expiresAt = Date.now() + window;
  }

  tracker.count++;

  if (tracker.count > limit) {
    throw new RateLimitError();
  }

  trackers.set(key, tracker);
}
