const API_KEY = "5844ab730382372bbcee9cf3";
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

// DOM elements
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const fromFlag = document.getElementById("from-flag");
const toFlag = document.getElementById("to-flag");
const amountInput = document.getElementById("val");
const resultDiv = document.getElementById("result");
const btn = document.getElementById("btn");

// Populate dropdowns
async function populateCurrencies() {
    try {
        const response = await fetch(`${API_URL}/USD`);
        const data = await response.json();

        if (data.result !== "success") throw new Error("API error");

        const currencies = Object.keys(data.conversion_rates);

        // Clear old options
        fromSelect.innerHTML = "";
        toSelect.innerHTML = "";

        currencies.forEach(curr => {
            const option1 = document.createElement("option");
            option1.value = curr;
            option1.text = curr;
            fromSelect.appendChild(option1);

            const option2 = document.createElement("option");
            option2.value = curr;
            option2.text = curr;
            toSelect.appendChild(option2);
        });

        fromSelect.value = "USD";
        toSelect.value = "INR";
        updateFlag(fromSelect);
        updateFlag(toSelect);
    } catch (err) {
        console.error(err);
        resultDiv.innerText = "Error loading currencies";
    }
}

// Update flags
function updateFlag(select) {
    const code = select.value.toLowerCase();
    const countryCode = countryList[code] || "US";
    if (select === fromSelect) fromFlag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    else toFlag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

// Convert currency
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!amount || amount <= 0) {
        alert("Enter a valid amount");
        return;
    }

    if (from === to) {
        resultDiv.innerText = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    resultDiv.innerText = "Converting...";

    try {
        const res = await fetch(`${API_URL}/${from}`);
        const data = await res.json();

        if (data.result !== "success") throw new Error("Failed to fetch rate");

        const rate = data.conversion_rates[to];
        const converted = (amount * rate).toFixed(2);

        resultDiv.innerText = `${amount} ${from} = ${converted} ${to} (Rate: 1 ${from} = ${rate.toFixed(4)} ${to})`;
    } catch (err) {
        console.error(err);
        resultDiv.innerText = "Error fetching exchange rate";
    }
}

// Event listeners
fromSelect.addEventListener("change", () => updateFlag(fromSelect));
toSelect.addEventListener("change", () => updateFlag(toSelect));
btn.addEventListener("click", convertCurrency);

// Initialize
populateCurrencies();
