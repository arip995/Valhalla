import React from 'react';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconShoppingCart,
  IconCurrencyDollar,
} from '@tabler/icons-react';

const AudienceDetails = ({ audience }) => {
  if (!audience) {
    return <div>No data available</div>;
  }

  const {
    name,
    email,
    phoneNumber,
    adDetails = {},
    products = [],
    purchaseCount = {},
    amountSpent = {},
  } = audience;

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '1rem',
        border: '1px solid #eaeaea',
        borderRadius: '8px',
      }}
    >
      <h2
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <IconUser size={24} />
        Audience Details
      </h2>

      <div style={{ marginTop: '1rem', lineHeight: '1.5' }}>
        <p>
          <IconUser
            size={18}
            style={{
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          <strong>Name:</strong> {name || 'N/A'}
        </p>
        <p>
          <IconMail
            size={18}
            style={{
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          <strong>Email:</strong> {email || 'N/A'}
        </p>
        <p>
          <IconPhone
            size={18}
            style={{
              marginRight: '8px',
              verticalAlign: 'middle',
            }}
          />
          <strong>Phone:</strong> {phoneNumber || 'N/A'}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <IconShoppingCart size={20} />
          Purchase Details
        </h3>
        <p>
          <strong>Total Purchases:</strong>{' '}
          {purchaseCount.total || 0}
        </p>
        <p>
          <strong>Total Spent:</strong> $
          {amountSpent.total || 0}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <IconCurrencyDollar size={20} />
          Ad Details
        </h3>
        <p>
          <strong>Source:</strong>{' '}
          {adDetails.source || 'N/A'}
        </p>
        <p>
          <strong>Medium:</strong>{' '}
          {adDetails.medium || 'N/A'}
        </p>
        <p>
          <strong>Campaign:</strong>{' '}
          {adDetails.campaign || 'N/A'}
        </p>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h3
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <IconShoppingCart size={20} />
          Products
        </h3>
        {products.length > 0 ? (
          <ul style={{ paddingLeft: '20px' }}>
            {products.map((product, index) => (
              <li key={index}>
                <strong>{product.title}</strong> (Type:{' '}
                {product.productType || 'N/A'})
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default AudienceDetails;
