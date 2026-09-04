export type EditUiLabels = {
  completed: string;
  unableToSubmit: string;
  status: Record<string, string>;
  error: Record<string, string>;
  unknownStatus: string;
  unknownError: string;
};

export type EditUiResult = {
  ok: boolean;
  status?: string;
  error?: string;
};

export function editResultMessage(result: EditUiResult, labels: EditUiLabels): string {
  if (result.ok) {
    return `${labels.completed}：${labels.status[result.status ?? ''] ?? labels.unknownStatus}`;
  }
  return `${labels.unableToSubmit}：${labels.error[result.error ?? ''] ?? labels.unknownError}`;
}

export function editDiff(before: string, after: string): string {
  const oldLines = before.split('\n');
  const newLines = after.split('\n');
  let start = 0;
  while (start < oldLines.length && start < newLines.length && oldLines[start] === newLines[start]) start += 1;

  let oldEnd = oldLines.length;
  let newEnd = newLines.length;
  while (oldEnd > start && newEnd > start && oldLines[oldEnd - 1] === newLines[newEnd - 1]) {
    oldEnd -= 1;
    newEnd -= 1;
  }

  return [
    ...oldLines.slice(start, oldEnd).map((line) => `- ${line}`),
    ...newLines.slice(start, newEnd).map((line) => `+ ${line}`),
  ].join('\n');
}
