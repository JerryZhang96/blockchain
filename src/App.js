import { useState } from 'react';
import Input from 'antd/lib/input/Input';

import Address from './components/Address';
import Transactions from './components/Transactions';

import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  let URL = `blockchain-data/bitcoin/mainnet/addresses/${address}/transactions`;

  const options = {
    method: 'GET',
    headers: {
      'X-API-KEY': 'eef662153d7ff3b15345f22312bf430e86f4b6a3',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    if (address) {
      setLoading(true);
      fetch(URL, options)
        .then((res) => {
          // console.log('res=>', res);
          if (!res.ok) {
            return res.text().then((text) => {
              setError(JSON.parse(text));
              // console.log('text=>', JSON.parse(text));
            });
          } else {
            return res.json();
          }
        })
        .then((data) => setData(data))
        .catch((err) => alert(err));
      setLoading(false);
      setError('');
    } else {
      setData([]);
      setError('');
    }
  };

  // console.log('data=>', data);
  // console.log('address=>', address);
  // console.log('error=>', error);

  // 1DBrYbe5U7LGDcHA5tiLCxivZ7JZAGqGhJ

  return (
    <div className='App' style={{ maxWidth: 1000, margin: '0 auto' }}>
      <h1>Blockchain</h1>
      <Input
        placeholder='Please enter bitcoin address'
        style={{ width: 300 }}
        onChange={handleChange}
        onPressEnter={handleSubmit}
      />

      {loading ? (
        <div>Loading....</div>
      ) : (
        <>
          <Address />
          <Transactions transactions={data} error={error} />
        </>
      )}
    </div>
  );
};

export default App;
