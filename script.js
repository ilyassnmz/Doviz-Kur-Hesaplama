const currencyFirst = document.getElementById('currencyFirst');
const currencySecond = document.getElementById('currencySecond');
const count = document.getElementById('count');
const equal = document.getElementById('equal');
const exchangeRate = document.getElementById('exchangeRate');
const lastUpdate = document.getElementById('lastUpdate');

async function updateRate() {
    exchangeRate.textContent = "Yükleniyor...";
    equal.textContent = "-";

    try {
        const res = await fetch(`https://v6.exchangerate-api.com/v6/9c77bce280853a71c8b016d3/latest/${currencyFirst.value}`);
        if (!res.ok) throw new Error("API bağlantı hatası");

        const data = await res.json();
        const rate = data.conversion_rates[currencySecond.value];

        exchangeRate.textContent = `1 ${currencyFirst.value} = ${rate} ${currencySecond.value}`;
        lastUpdate.textContent = `Son güncelleme: ${data.time_last_update_utc}`;

        const formatted = new Intl.NumberFormat('tr-TR', {
            style: 'currency',
            currency: currencySecond.value
        }).format(count.value * rate);

        equal.textContent = formatted;
    } catch (err) {
        exchangeRate.textContent = "Kur bilgisi alınamadı. Lütfen tekrar deneyin.";
        lastUpdate.textContent = "";
        equal.textContent = "-";
        console.error(err);
    }
}

currencyFirst.addEventListener('change', updateRate);
currencySecond.addEventListener('change', updateRate);
count.addEventListener('input', updateRate);

updateRate();
