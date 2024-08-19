import {
  CheckIcon,
  Grid,
  Group,
  Radio,
  Text,
} from '@mantine/core';
import '../../../../styles/common/plan-type.css';
import classes from '../../../../styles/common/RadioCardOne.module.css';

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
      </Grid>
    </Radio.Group>
  );
};

export default PricingTypeSelector;
