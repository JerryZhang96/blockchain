import React from 'react';

const Transactions = ({ transactions, error }) => {
  //   console.log('error=>', error);
  const commonStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 30,
  };

  const linkStyles = {
    width: 200,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'no-break',
    marginRight: 10,
    textDecoration: 'none',
    color: 'blue',
  };

  const renderFee = (item) => {
    return (
      <div style={commonStyles}>
        <div>Fee</div>
        <div>
          <span style={{ marginRight: 10 }}>{item.fee && item.fee.amount}</span>
          <span>{item.fee && item.fee.unit}</span>
        </div>
      </div>
    );
  };

  const renderHash = (item) => {
    return (
      <div style={commonStyles}>
        <div>Hash</div>
        <div>
          <a href='#' style={linkStyles}>
            {item.transactionHash}
          </a>
        </div>
        <div>{item.timestamp && formatTimeStamp(item.timestamp)}</div>
      </div>
    );
  };

  const formatTimeStamp = (timestamp) => {
    let date = new Date(timestamp).toLocaleString('en-GB', {
      timeZone: 'UTC',
    });

    return date;
  };

  const renderTransaction = () => {
    return (
      <div style={{}}>
        {transactions &&
          transactions.data &&
          transactions.data.items &&
          transactions.data.items.length > 0 &&
          transactions.data.items.map((transaction) => (
            <div key={transaction.transactionId}>
              <div>{renderFee(transaction)}</div>
              <div>{renderHash(transaction)}</div>
              <div style={commonStyles}>
                {/* Sender */}
                <div>
                  {transaction.senders &&
                    transaction.senders.length > 0 &&
                    transaction.senders.map((sender) => (
                      <div key={sender.address} style={{ display: 'flex' }}>
                        <a href='#' style={linkStyles}>
                          {sender.address}
                        </a>
                        <span>{sender.amount} BTC</span>
                      </div>
                    ))}
                </div>
                {/* Recipients */}
                <div>
                  {transaction.recipients &&
                    transaction.recipients.length > 0 &&
                    transaction.recipients.map((recipient) => (
                      <div key={recipient.address} style={{ display: 'flex' }}>
                        <a href='#' style={linkStyles}>
                          {recipient.address}
                        </a>
                        <span>{recipient.amount} BTC</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: 'left' }}>Transactions</h2>
      {error && error.error && error.error.message ? (
        <div style={{ textAlign: 'left' }}>{error.error.message}</div>
      ) : transactions ? (
        renderTransaction()
      ) : (
        <></>
      )}
    </div>
  );
};

export default Transactions;
