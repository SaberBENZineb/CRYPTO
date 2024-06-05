import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./allcp.css";

const AllCrypto = () => {
  const [crypto, setCrypto] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [totalPages, setTotalPages] = useState(0);
  // eslint-disable-next-line
  //const [cryptoKeys, setcryptoKeys] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://openapiv1.coinstats.app/coins?page=${currentPage}&limit=10`, {
          method: 'GET',
          headers:{
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
        setTotalPages(Math.ceil(data.meta.itemCount / 10));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="cp-cont">
      <h2>Today's Crypto Money Prices</h2>
      <div className="all-cp">
        <table height="500" cellPadding="5">
          <thead>
            <tr>
              <th></th>
              <th align="left">Coin</th>
              <th align="right">Price $</th>
              <th align="right">Market Cap</th>
              <th align="right">Daily Change</th>
            </tr>
          </thead>
          <tbody>
            {crypto.map((item) => (
              <tr key={item.id}>
                <td align="right">
                  <Button style={{ height: '100%' }}>
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src="https://cdn-icons-png.flaticon.com/512/4208/4208420.png"
                      alt="fav"
                    />
                  </Button>
                </td>
                <td>
                  <Button href={`cryptos/${item.id}`} style={{ height: '100%', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.icon} alt={item.name} />
                      <div style={{ marginLeft: '20px', width: '150px' }}>
                        <div>{item.symbol.toUpperCase()}</div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                  </Button>
                </td>
                <td align="right">${item.price.toFixed(2)}</td>
                <td align="right">
                  {numberWithCommas(item.marketCap.toString().slice(0, -6))}M
                </td>
                <td align="right">
                  {item.priceChange1d < 0 ? (
                    <p className="red">{item.priceChange1d.toFixed(2)}%</p>
                  ) : (
                    <p className="green">{item.priceChange1d.toFixed(2)}%</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btnn" style={{ color: 'white', marginTop: '15px' }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Önceki
        </button>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Sonraki
        </button>
      </div>
    </div>
  );
};

export default AllCrypto;
