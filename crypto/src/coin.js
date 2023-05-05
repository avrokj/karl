import { getCoins } from "../api/coinservice.js";

const data = await getCoins();    // kui teame et functsioon on async, siis peab ootama
const datacoin = await getCoin();

//  .then((data) => console.log(data));
const marketTrendsWrapper = document.querySelector("#market_trends");
console.log(marketTrendsWrapper);
console.log(data.data.coins);
console.log(data.datacoin.coin);

data.data.coins.forEach((coin) => {
  const article = document.createElement("article");
  const articleClasses = [
    "border-2",
    "p-4",
    "rounded-2xl"
  ];
  const borderColorsWeDontWant = ['#000000', '#00042b'];
  article.style.borderColor = borderColorsWeDontWant.includes(coin.color) ? "#73FDAA" : coin.color;
  article.classList.add(...articleClasses);
  article.innerHTML = `
          <div class="flex mb-2">
            <div class="flex w-4/5 items-center">
              <img class="w-12 h-12 object-cover pr-4 w-15 h-auto" src="${coin.iconUrl}" alt="${coin.name}">
              <p class="pr-4 w-20">${coin.symbol}</p>
              <p class="text-sm bg-slate-800 p-1 rounded-md">${coin.name}</p>
            </div>
            <img class="mx-auto mt-4 h-4 v-4" src="assets/arrow.png" alt="">
          </div>
          <div class="grid gap-2 px-4 pt-4 pb-2">
            <p class="text-2xl">$${Number(coin.price).toFixed(2)}</p>
            <p>${coin.change}%</p>
          </div>
        `;
  marketTrendsWrapper.append(article);
});