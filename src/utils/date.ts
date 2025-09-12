let formatFn: ((date: Date | number, format: string) => string) | null = null;

export async function formatDate(date: Date | number, formatStr: string): Promise<string> {
  if (!formatFn) {
    const { format } = await import('date-fns');
    formatFn = format;
  }
  return formatFn(date, formatStr);
}

// For synchronous formatting when we know format is already loaded
export function formatDateSync(date: Date | number, formatStr: string): string {
  if (!formatFn) {
    // Return a basic fallback if format isn't loaded
    return new Date(date).toLocaleDateString();
  }
  return formatFn(date, formatStr);
} 