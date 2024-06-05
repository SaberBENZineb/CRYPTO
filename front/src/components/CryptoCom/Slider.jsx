import React, { useEffect, useState } from "react";
const Slider = () => {
  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://openapiv1.coinstats.app/coins?page=0&limit=10`, {
          method: 'GET',
          headers: {
            'Accept': process.env.REACT_APP_ACCEPT,
            'X-Api-Key': process.env.REACT_APP_X_API_KEY,
            'Host': process.env.REACT_APP_HOST
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        
        setCrypto(data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display:'flex',justifyContent:'center', alignItems:'center'}}>
      <div style={{width:'80%'}}>
        
          {crypto.map((coin) => {
            return (
              <div key={coin.id} className="coin-row">
                <div>
                  <img src={coin.icon} alt={coin.name} className="coin-image" />
                </div>
                <div className="coin">
                  <div className="coin-symbol"> {coin.symbol} </div>
                  <div> {coin.name} </div>
                </div>
                <div className="coin-data">
                  {coin.priceChange1d < 0 ? (
                    <p className="coin-percent red">
                      {coin.priceChange1d.toFixed(2)}%
                    </p>
                  ) : (
                    <p className="coin-percent green">
                      {coin.priceChange1d.toFixed(2)}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Slider;