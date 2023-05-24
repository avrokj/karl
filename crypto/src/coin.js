import { getCoins, getCoin, getCoinHistory } from "../api/coinservice.js";

const data = await getCoins();    // kui teame et functsioon on async, siis peab ootama
//const datacoin = await getCoin();
//console.log(datacoin.datacoin.coin);

//.then((datacoin) => console.log(datacoin));
const marketTrendsWrapper = document.querySelector("#market_trends");
console.log(marketTrendsWrapper);
//console.log(datacoin.data.coin);


data.data.coins.forEach((coin) => {
  const article = document.createElement("article");

  article.setAttribute("data-uuid", coin.uuid)

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
          <div class="grid grid-cols-2 gap-2 px-4 pt-4 pb-2">
            <div>
              <p class="text-2xl">$${Number(coin.price).toFixed(2)}</p>
              <p class="${String(coin.change).startsWith('-') ? 'text-red-500' : 'text-green-500'}">${coin.change}%</p>
            </div>
            <div>
              <p>${coin.uuid}%</p>
            </div>
          </div>
        `;
  marketTrendsWrapper.append(article);
});

const cards = document.querySelectorAll("#market_trends article")
//console.log(cards);
cards.forEach((node) => {
  node.addEventListener('click', async (event) => {
    const uuid = event.currentTarget.getAttribute("data-uuid");
    await getCoin(uuid); // await küsib eelnevalt, et oleks async eespool olemas!!!
    const response = await getCoin(uuid);
    const history = await getCoinHistory(uuid);
    const result = {...response.data.coin, ... history.data}; // 3 täppi sellesks, et saada kogu data (spread operator). see rida paneb, siis Coini ja history ühte jurasse kokku.
    console.log(result);
  })
}
);