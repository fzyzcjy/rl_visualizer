export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

export const replaceMulti = (text: string, replacementMap: Record<string, string>) => {
  let newText = text;
  for (const [from, to] of Object.entries(replacementMap)) {
    newText = newText.replace(new RegExp(from, 'g'), to);
  }
  return newText;
};
