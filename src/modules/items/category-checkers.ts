import { FOODS, MEDICINES } from "./constants";

export const isFood = (item) => {
  return item.name
    .toLowerCase()
    .split(" ")
    .some((str) => {
      return FOODS.includes(str);
    });
};

export const isMedicine = (item) => {
  return item.name
    .toLowerCase()
    .split(" ")
    .some((str) => {
      return MEDICINES.includes(str);
    });
};

export const isBook = (item) => {
  return item.name.toLowerCase().includes("book");
};
