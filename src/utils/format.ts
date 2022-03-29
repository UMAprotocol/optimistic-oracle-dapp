// this actually will round up in some cases
export const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
}).format;

export const addCommasOnly = new Intl.NumberFormat("en-US").format;
