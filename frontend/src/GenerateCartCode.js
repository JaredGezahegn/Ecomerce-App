function generateRandomAlphanumeric(length = 10) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuv01234567890';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Maths.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}

export const randomValue = generateRandomAlphanumeric();