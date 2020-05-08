const fetch = require('node-fetch');
const LOCALBITCOINS_AR = "https://localbitcoins.com/sell-bitcoins-online/ARS//.json";
const USD_RATE = "https://api.coindesk.com/v1/bpi/currentprice.json";

const getUSDRate = async () => {
    const data = await fetch(USD_RATE).then(res => res.json());
    return data.bpi.USD.rate_float;
}

const getARSRate = async () => {
    const data = await fetch(LOCALBITCOINS_AR).then(res => res.json());
    const list = data.data.ad_list.slice(0, 30)
    const sum = list.map(d => parseFloat(d.data.temp_price));
    return sum.reduce((acc, d) => acc + d, 0) / list.length;
}

const main = async () => {
    const [ usdRate, arsRate ] = await Promise.all([
        getUSDRate(),
        getARSRate()
    ]);
    const rate = (arsRate / usdRate).toFixed(2)
    console.log('Current rate is', rate);
}

main().catch(console.log).then(() => process.exit(0))