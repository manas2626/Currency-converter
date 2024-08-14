
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  const fromCurr = document.querySelector(".from select").value;
  const toCurr = document.querySelector(".to select").value;
  let amount = document.querySelector(".amount input").value;
  
  if (amount === "" || amount < 1) {
    amount = 1;
    document.querySelector(".amount input").value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.toLowerCase()}.json`;
  // const URL=`${BASE_URL}/${fromCurr.value.tolowerCase()}/${toCurr.value.tolowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];

  if (rate) {
    let finalAmount = amount * rate;
    msg.innerText = `${amount} ${fromCurr} = ${finalAmount.toFixed(2)} ${toCurr}`;
  } else {
    msg.innerText = "Exchange rate not available.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", async () => {
  updateExchangeRate();
});
