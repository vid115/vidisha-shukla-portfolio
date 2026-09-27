/**
 * Whole months between an ISO "YYYY-MM" start date and now — used only for
 * the current role, since "Present" is the one duration in this resume
 * that's genuinely a moving target. Fixed-length roles (e.g. the 6-month
 * internship, as the resume itself states) pass their duration explicitly
 * instead of relying on calendar arithmetic that could drift from what was
 * actually written.
 */
export function monthsSince(isoStart: string): number {
  const start = new Date(`${isoStart}-01T00:00:00`);
  const now = new Date();
  return (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth()) + 1;
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  if (years === 0) return `${remainder} mo`;
  if (remainder === 0) return `${years} yr`;
  return `${years} yr ${remainder} mo`;
}
