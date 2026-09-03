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
