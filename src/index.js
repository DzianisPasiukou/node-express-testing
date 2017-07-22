let fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];

exports.fortunes = fortunes;
exports.getRandomFortune = () => {
    let randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    return randomFortune;
};
