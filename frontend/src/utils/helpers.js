export const formatPrice = (number) => {
    return Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number / 100);
}

export const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type])///. item[type] извлекает значение поля type для каждого объекта item в массиве data. Н
    return ['all', ...new Set(unique)]///  получает уникальные значения из массива unique. Объект Set хранит только уникальные значения, все дубликаты будут удалены. В этой части кода создается новый массив, начинающийся с элемента 'all', за которым следует распылитель (spread operator) .... Этот оператор позволяет распылить элементы из объекта Set, так что они добавляются в новый массив как отдельные элементы. 
}