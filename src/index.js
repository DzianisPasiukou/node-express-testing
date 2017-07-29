let fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
];
var tours = [
    { id: 0, name: 'Река Худ', price: 99.99 },
    { id: 1, name: 'Орегон Коуст', price: 149.95 },
];

exports.fortunes = fortunes;
exports.tours = tours;
exports.getRandomFortune = () => {
    let randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
    return randomFortune;
};
