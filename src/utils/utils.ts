export const toShortAddress = (text: string) => {
  if (!text) return "";
  const first = text.slice(0, 4);
  const last = text.slice(-4);
  return `${first}...${last}`;
};
