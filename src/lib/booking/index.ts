import "server-only";
import { mockProvider } from "./mock-provider";
import type { BookingProvider } from "./types";

/**
 * The active booking backend. To go live, implement BookingProvider (calendar
 * + database) in a new file and return it here, e.g. based on an env variable.
 */
export function getBookingProvider(): BookingProvider {
  return mockProvider;
}
