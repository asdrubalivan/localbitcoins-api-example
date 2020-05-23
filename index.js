const fetch = require('node-fetch');
const LOCALBITCOINS_ALL_CURRENCIES = "https://localbitcoins.com/bitcoinaverage/ticker-all-currencies/";

const main = async () => {
    const data = await fetch(LOCALBITCOINS_ALL_CURRENCIES).then(res => res.json());
    const times = [24, 12, 6, 1]

    times.forEach(time => console.log(`Rate with average ${time} hours: ${(data.ARS[`avg_${time}h`] / data.USD[`avg_${time}h`]).toFixed(2)} ARS/$`))
}

main().catch(console.log).then(() => process.exit(0))