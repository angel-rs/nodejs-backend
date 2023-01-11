interface Item {
  name: string;
  qty: number;
  price: number;
  isImported: boolean;
  tax?: number;
  total?: number;
  salesTax?: number;
  totalWithTax?: number;
  appliedTaxes?: string[];
}

interface OrderMeta {
  salesTaxes: number | string;
  total: number | string;
}
