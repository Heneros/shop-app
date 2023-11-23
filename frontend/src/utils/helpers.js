export const formatPrice = (number) => {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 1);
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
  
    return [...new Set(unique)];
  }