import {
  CheckIcon,
  Grid,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import '../../../../styles/common/plan-type.css';
import classes from '../../../../styles/common/RadioCard.module.css';

const PricingTypeSelector = ({
  value,
  values,
  onChange = () => {},
}) => {
  if (!values?.length) return null;

  return (
    <Radio.Group
      value={value}
      onChange={value => {
        onChange(value);
      }}
    >
      <Grid gap={'sm'}>
        {values.map(item => {
          return (
            <Grid.Col
              span={{ base: 12, md: 6 }}
              key={item.value}
            >
              <Radio.Card
                className={classes.root}
                radius="md"
                value={item.value}
                key={item.value}
              >
                <Group wrap="nowrap" align="flex-start">
                  <Radio.Indicator icon={CheckIcon} />
                  <div className="flex flex-col gap-2">
                    {item?.label ? (
                      <Text className={classes.label}>
                        {/* Existing Channel */}
                        {item?.label}
                      </Text>
                    ) : null}
                    {item?.description ? (
                      <Text className={classes.description}>
                        {/* Connect with existing telegram
                        channel. */}
                        {item.description}
                      </Text>
                    ) : null}
                  </div>
                </Group>
              </Radio.Card>
            </Grid.Col>
          );
        })}
        {/* <Grid.Col span={{ base: 12, md: 6 }}>
          <Radio.Card
            className={classes.root}
            radius="md"
            value={'old'}
            key={'old'}
          >
            <Group wrap="nowrap" align="flex-start">
              <Radio.Indicator icon={CheckIcon} />
              <div className="flex flex-col gap-2">
                <Text className={classes.label}>
                  Existing Channel
                </Text>
                <Text className={classes.description}>
                  Connect with existing telegram channel.
                </Text>
              </div>
            </Group>
          </Radio.Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Radio.Card
            className={classes.root}
            radius="md"
            value={'new'}
            key={'new'}
          >
            <Group wrap="nowrap" align="flex-start">
              <Radio.Indicator icon={CheckIcon} />
              <div className="flex flex-col gap-2">
                <Text className={classes.label}>
                  Create New
                </Text>
                <Text className={classes.description}>
                  Create new telegram channel.
                </Text>
              </div>
            </Group>
          </Radio.Card>
        </Grid.Col> */}
      </Grid>
    </Radio.Group>
    // <Grid className="price-type-container">
    //   <Grid.Col
    //     span={{ base: 12, md: 6 }}
    //     onClick={() => {
    //       onChange(true); //true for lifetime
    //     }}
    //   >
    //     <div
    //       className={classNames('price-type-card', {
    //         'price-type-card-active': value,
    //       })}
    //     >
    //       <div className="price-type-info">
    //         <div className="price-type__heading">
    //           Lifetime
    //         </div>
    //         <div>Charge a one-time fixed fee</div>
    //       </div>
    //       <div className="price-type-indicator">
    //         <IconCheck
    //           style={{
    //             width: rem(16),
    //             height: rem(16),
    //           }}
    //           stroke={1.5}
    //           color="white"
    //         />
    //       </div>
    //     </div>
    //   </Grid.Col>
    //   <Grid.Col
    //     span={{ base: 12, md: 6 }}
    //     onClick={() => {
    //       onChange(false); //false for subscription
    //     }}
    //   >
    //     <div
    //       className={classNames('price-type-card', {
    //         'price-type-card-active': !value,
    //       })}
    //     >
    //       <div className="price-type-info">
    //         <div className="price-type__heading">
    //           Subscription
    //         </div>
    //         <div>Charge weekly, monthly, annually</div>
    //       </div>
    //       <div className="price-type-indicator">
    //         <IconCheck
    //           style={{
    //             width: rem(16),
    //             height: rem(16),
    //           }}
    //           stroke={1.5}
    //           color="white"
    //         />
    //       </div>
    //     </div>
    //   </Grid.Col>
    // </Grid>
  );
};

export default PricingTypeSelector;
