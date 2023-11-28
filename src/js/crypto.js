fetch('https://api.coinlore.net/api/ticker/?id=90,80,58,1,2321')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    })
    .then ((data)=> {
        let data1="";

        data.map((item)=> {
            data1 +=`
                <div class="crypto">
                    <div class="crypto-name">
                        <img src="../img/${item.symbol.toLowerCase()}.svg" width="34" height="34" alt=${item.name} />
                        <span class="crypto-symbol">${item.symbol}</span>
                        <span class="badge text-bg-warning text-uppercase">${item.name}</span>
                    </div>
                    <hr />
                    <div class="crypto-price">$${item.price_usd}</div>
                    <div class="crypto-percent ${ parseFloat(item.percent_change_24h) < 0 ? 'text-danger' : 'text-success' }">${Math.abs(item.percent_change_24h)}%</div>
                </div>
            `;
        });
        document.getElementById("crypto-stats").innerHTML = data1;
    })
    .catch(error => console.error('Fetch error: ', error))