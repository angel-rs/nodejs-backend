import { TAX_META, ROUND_BY } from "./constants";
import { isFood, isMedicine, isBook } from "./category-checkers";

function roundToNearest(num) {
  return Math.ceil(num / ROUND_BY) * ROUND_BY;
}

function isBasicTaxApplicable(item: Item) {
  if (isFood(item) || isBook(item) || isMedicine(item)) return false;
  return true;
}

export function retrieveItemTaxMeta(item: Item) {
  let salesTax = 0;

  let appliedTaxes: string[] = [];

  if (isBasicTaxApplicable(item)) {
    salesTax += roundToNearest(item.price * TAX_META.BASIC_TAX);
    appliedTaxes.push("Basic tax");
  }

  if (item.isImported) {
    salesTax += roundToNearest(item.price * TAX_META.IMPORT_DUTY);
    appliedTaxes.push("Import duty");
  }

  const total = item.price * item.qty;
  const totalSalesTax = salesTax * item.qty;
  const totalWithTax = Number((item.price + salesTax).toFixed(2)) * item.qty;
  return {
    totalSalesTax,
    salesTax,
    appliedTaxes,
    totalWithTax,
    total,
  };
}

export function normalizeReceiptString(receipt: string) {
  const lines = receipt.trim().split("\n");

  const items = lines.map((line) => {
    const text = line.trim();
    // NOTE: if we require to process receipts in other languages
    // we'd need to use a regex to segment the lines, instead of relying the
    // "at" keyword, which can result in wrong results
    const [product, inputPrice] = text.split("at ");
    const price = Number(inputPrice);
    const isImported = text.toLowerCase().includes("imported");
    const match = product.match(/(?<qty>\d+)(?<name>.*)/)?.groups;
    const name = match?.name.trim() || "N/A";
    const qty = Number(match?.qty);
    const item: Item = {
      isImported,
      name,
      price,
      qty,
    };

    const itemMeta = retrieveItemTaxMeta(item);

    return { ...item, ...itemMeta };
  });

  return items;
}

export function computeOrderMeta(items: Item[]): OrderMeta {
  let total = 0;
  let salesTaxes = 0;

  items.forEach((item) => {
    if (item?.totalWithTax) total += item.totalWithTax;
    if (item?.totalSalesTax) salesTaxes += item.totalSalesTax;
  });

  return {
    salesTaxes,
    total,
  };
}
