export function getRandomItemFromArray(array: string[]) {
    // Generate a random index within the range of the array length
    const randomIndex = Math.floor(Math.random() * array.length);

    // Return the random item from the array
    return array[randomIndex];
}
