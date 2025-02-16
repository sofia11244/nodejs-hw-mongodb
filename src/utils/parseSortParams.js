// src/utils/parseSortParams.js

import { SORT_ORDER } from "../constants/index.js";

// Sıralama yönünü doğrulayan fonksiyon
const parseSortOrder = (sortOrder) => {
  const isKnownOrder = [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder);
  if (isKnownOrder) return sortOrder;
  return SORT_ORDER.ASC; // Varsayılan sıralama ASC (Artan)
};

// Sıralama yapılacak alanları doğrulayan fonksiyon
const parseSortBy = (sortBy) => {
  const keysOfContact = [
    '_id',            // ID alanı
    'name',           // İsim
    'phoneNumber',    // Telefon numarası
    'email',          // E-posta
    'isFavourite',    // Favori olup olmadığı
    'contactType',    // İletişim tipi (personal, home, work)
    'createdAt',      // Oluşturulma tarihi
    'updatedAt',      // Güncellenme tarihi
  ];

  if (keysOfContact.includes(sortBy)) {
    return sortBy;
  }

  return '_id'; // Eğer belirtilen alan geçerli değilse, varsayılan olarak _id
};

// Sıralama parametrelerini çözümleyen ana fonksiyon
export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
