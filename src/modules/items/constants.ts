// note: ideally the db would have a "category" field per item
// in this problem decided to derive the category from the item name

export const FOODS = ["chocolate", "chocolates"];
export const MEDICINES = ["headache"];
export const ROUND_BY = 0.05;
export const TAX_META = {
  BASIC_TAX: 0.1, // applied to all goods, except: books, food & medical products
  IMPORT_DUTY: 0.05, // applied to all imported goods
};
