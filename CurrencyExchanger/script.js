const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCode;
    newOptions.value = currCode;

    // Pre-select USD for 'from' and INR for 'to'
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }

  // Add event listener to update flag when a currency is selected
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update the country flag
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode] || "unknown"; // Fallback if country code not found
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  img.alt = `Flag for ${currCode}`;
};

// Fetch and display the exchange rate
async function fetchExchangeRate(event) {
  try {
    event.preventDefault();

    // Get amount and validate input
    let amount = document.querySelector("#val");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
      alert("Please enter a valid amount.");
      return;
    }

    // Fetch exchange rate data
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rate.");

    let data = await response.json();
    let exchangeRate = data[toCurr.value.toLowerCase()];
    if (!exchangeRate) throw new Error("Exchange rate data not available.");

    // Display the result
    let convertedValue = (amtValue * exchangeRate).toFixed(2);
    alert(
      `${amtValue} ${fromCurr.value} = ${convertedValue} ${toCurr.value}`
    );
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    alert("An error occurred while fetching the exchange rate. Please try again.");
  }
}

// Add event listener to the button
btn.addEventListener("click", fetchExchangeRate);
