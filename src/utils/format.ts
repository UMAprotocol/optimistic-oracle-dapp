// this actually will round up in some cases
export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
}).format;

export function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const addCommasOnly = new Intl.NumberFormat("en-US").format;
