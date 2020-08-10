export default function (number) {
  const cases = [2, 0, 1, 1, 1, 2];
  const title = ['товар', 'товара', 'товаров'][
    (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]
  ];
  return `${number} ${title}`;
}
