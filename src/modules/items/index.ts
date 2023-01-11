import { normalizeReceiptString, computeOrderMeta } from "./tax-helpers";

function format(number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
  }).format(number);
}

export function retrieveReceiptDetails(receipt: string) {
  const items = normalizeReceiptString(receipt);
  const orderMeta = computeOrderMeta(items);

  const productLines = items
    .map((item) => `${item.qty} ${item.name}: ${format(item.totalWithTax)}`)
    .join("\n");

  const orderLines = `Sales Taxes: ${format(
    orderMeta.salesTaxes
  )}\nTotal: ${format(orderMeta.total)}`;

  const summary = `${productLines}\n${orderLines}`;

  return summary;
}
