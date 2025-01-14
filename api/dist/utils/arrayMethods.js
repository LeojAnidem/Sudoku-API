// Elige un numero aleatorio entre un rango de numeros
export const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
// Reordenar el array de forma aleatoria
export const randomSort = (arr) => {
    return arr.sort(() => 0.5 - Math.random());
};
// Crea un array que contiene numeros del 1 al 9 y los mezcla
// sin repeticion
export const generateNumsArr = () => {
    const nums = new Array(9).fill(0).map((e, i) => e + i + 1);
    return randomSort(nums);
};
// De forma aleatoria rellenara un array con nueve elementos, cada elemento puede
// tener un valor el rango(range) definido, la suma de todos los elementos debe ser
// igual a 'amountDel'
export const getSrictArr = (total, range, length = 9) => {
    const arr = new Array(length).fill(0);
    const [min, max] = range;
    // Funcion recursiva para verificar si los numeros en el array
    // cumplen con las restricciones dadas
    const setValues = (count, arr) => {
        const newArr = arr.map(() => getRandomInRange(min, max));
        const isValidArr = newArr.reduce((a, b) => a + b) === count;
        return isValidArr ? randomSort(newArr) : setValues(count, newArr);
    };
    return setValues(total, arr);
};
