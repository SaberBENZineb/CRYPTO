import React, { useEffect, useState } from "react";
import "./bottom.css";

const Bottom = () => {
  const [crypto, setCrypto] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://openapiv1.coinstats.app/coins?limit=15`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-Api-Key': 'S7PGjAyEX14J4AlktnGT/uPKsqU+3jgpdcQie0lKJWA=',
            'Host': 'openapiv1.coinstats.app',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        let top10Crypto=null;
        if (Array.isArray(data.result) && data.result.length > 0) {
          const sortedCryptoList = data.result.sort((a, b) => b.price - a.price);
          top10Crypto = sortedCryptoList.slice(0, 10);
        } else {
          console.error("Invalid or empty cryptocurrency data.");
        }
        setCrypto(top10Crypto);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="bottom">
      <br />
      <div>
        <h3> Top 10 Crypto List</h3>
      </div>
      <div className="crypto-header">
        <div className="data">
          <table height="500" cellPadding="5" cellSpacing="50">
            <tr>
              <th align="left">Coin</th>
              <th align="right">price $</th>
              <th align="right">Market Cap</th>
              <th align="right">Daily Change</th>
            </tr>

            <tbody>
              {crypto.slice(0, 10).map((coin, index) => (
                <tr key={index}>
                  <td>
                    <div>
                      <img src={coin.icon} alt={coin.name} />
                      <div>
                        <div>{coin.symbol}</div>
                        <div>{coin.name}</div>
                      </div>
                    </div>
                  </td>
                  <td align="right">${coin.price.toFixed(2)}</td>
                  <td align="right">
                    {numberWithCommas(coin.marketCap.toString().slice(0, -6))}M
                  </td>
                  <td align="right">
                    {coin.priceChange1d < 0 ? (
                      <p className="red">{coin.priceChange1d.toFixed(2)}%</p>
                    ) : (
                      <p className="green">{coin.priceChange1d.toFixed(2)}%</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bottom;
