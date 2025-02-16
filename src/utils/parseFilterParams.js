// src/utils/parseFilterParams.js

// Cinsiyet parametresini kontrol eden fonksiyon
const parseGender = (gender) => {
    const isString = typeof gender === 'string';
    if (!isString) return;
    const isGender = ['male', 'female', 'other'].includes(gender); // Geçerli cinsiyetler
    if (isGender) return gender;
  };
  
  // Sayı parametrelerini kontrol eden fonksiyon
  const parseNumber = (number) => {
    const isString = typeof number === 'string';
    if (!isString) return;
    
    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return;
    }
    
    return parsedNumber;
  };
  
  // Filtre parametrelerini çözümlenmesi için ana fonksiyon
  export const parseFilterParams = (query) => {
    const { gender, contactType, maxAge, minAge, isFavourite } = query;
  
    const parsedGender = parseGender(gender);              // Cinsiyet filtresi
    const parsedContactType = contactType;                  // İletişim türü filtresi
    const parsedMaxAge = parseNumber(maxAge);               // Maksimum yaş filtresi (isteğe bağlı)
    const parsedMinAge = parseNumber(minAge);               // Minimum yaş filtresi (isteğe bağlı)
    const parsedIsFavourite = isFavourite === 'true';       // Favori olup olmadığı filtresi (boolean)
  
    return {
      gender: parsedGender,        // Filtrelenmiş cinsiyet
      contactType: parsedContactType, // Filtrelenmiş iletişim türü
      maxAge: parsedMaxAge,        // Maksimum yaş
      minAge: parsedMinAge,        // Minimum yaş
      isFavourite: parsedIsFavourite,  // Favori olup olmadığı
    };
  };
  