import { Grid, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import classNames from 'classnames';
import { PriceTypes } from '../useCreateTelegram';

const PricingTypeSelector = ({
  periodLabel,
  onSetLifetime,
}) => {
  if (!PriceTypes?.length) return null;

  return (
    <Grid>
      <Grid.Col
        span={{ base: 12, md: 6 }}
        onClick={() => {
          periodLabel !== 'Lifetime' && onSetLifetime(true);
        }}
      >
        <div
          className={classNames('price-type-card', {
            'price-type-card-active':
              periodLabel == 'Lifetime',
          })}
        >
          <div className="price-type-info">
            <div className="price-type__heading">
              Lifetime
            </div>
            <div>Charge a one-time fixed fee</div>
          </div>
          <div className="price-type-indicator">
            <IconCheck
              style={{
                width: rem(16),
                height: rem(16),
              }}
              stroke={1.5}
              color="white"
            />
          </div>
        </div>
      </Grid.Col>
      <Grid.Col
        span={{ base: 12, md: 6 }}
        onClick={() => {
          periodLabel == 'Lifetime' && onSetLifetime(false);
        }}
      >
        <div
          className={classNames('price-type-card', {
            'price-type-card-active':
              periodLabel !== 'Lifetime',
          })}
        >
          <div className="price-type-info">
            <div className="price-type__heading">
              Subscription
            </div>
            <div>Charge weekly, monthly, annually</div>
          </div>
          <div className="price-type-indicator">
            <IconCheck
              style={{
                width: rem(16),
                height: rem(16),
              }}
              stroke={1.5}
              color="white"
            />
          </div>
        </div>
      </Grid.Col>
    </Grid>
  );
};

export default PricingTypeSelector;
