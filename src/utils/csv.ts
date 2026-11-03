/**
 * CSV export helpers (IKAS-303).
 * Output opens cleanly in Excel (UTF-8 BOM, CRLF) and is safe against
 * spreadsheet formula injection (cells starting with = + - @ are prefixed with ').
 */

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => string | number | null | undefined;
}

export function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '';
  let text = String(value);
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv<T>(rows: readonly T[], columns: readonly CsvColumn<T>[]): string {
  const lines = [columns.map((column) => csvCell(column.header)).join(',')];
  for (const row of rows) lines.push(columns.map((column) => csvCell(column.value(row))).join(','));
  return lines.join('\r\n') + '\r\n';
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(['﻿', csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoke on the next tick so the download has started in every browser.
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}
