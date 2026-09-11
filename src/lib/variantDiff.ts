export type VariantDiffLine = {
  kind: 'same' | 'added' | 'removed';
  text: string;
};

const MAX_DIFF_LINES = 800;

export function diffMarkdown(before: string, after: string): VariantDiffLine[] {
  const left = before.split(/\r?\n/);
  const right = after.split(/\r?\n/);
  // ponytail: bounded LCS keeps the public comparison predictable; large documents use a readable replace-all view.
  if (left.length > MAX_DIFF_LINES || right.length > MAX_DIFF_LINES) {
    return [
      ...left.map((text) => ({ kind: 'removed' as const, text })),
      ...right.map((text) => ({ kind: 'added' as const, text })),
    ];
  }

  const table = Array.from({ length: left.length + 1 }, () => new Uint16Array(right.length + 1));
  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      table[i][j] = left[i] === right[j]
        ? table[i + 1][j + 1] + 1
        : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const result: VariantDiffLine[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      result.push({ kind: 'same', text: left[i] });
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      result.push({ kind: 'removed', text: left[i++] });
    } else {
      result.push({ kind: 'added', text: right[j++] });
    }
  }
  while (i < left.length) result.push({ kind: 'removed', text: left[i++] });
  while (j < right.length) result.push({ kind: 'added', text: right[j++] });
  return result;
}
