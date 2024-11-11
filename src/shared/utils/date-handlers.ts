export function getYYYYMMDD (date: Date | null): string {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}
