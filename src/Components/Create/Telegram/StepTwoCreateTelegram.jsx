import {
  Button,
  CheckIcon,
  Grid,
  Group,
  Radio,
  Select,
  Text,
  TextInput,
} from '@mantine/core';
import classes from '../../../styles/common/RadioCardOne.module.css';

const StepTwoCreateTelegram = ({
  stepTwoForm,
  onStepTwoSubmit,
  existingGroups,
}) => {
  return (
    <div className="ctg-s2-container">
      <div className="ctg-s2-radio-container">
        <Radio.Group
          value={stepTwoForm.values.isOldOrNewChannel}
          onChange={value => {
            stepTwoForm.setFieldValue(
              'isOldOrNewChannel',
              value
            );
          }}
        >
          <Grid gap={'sm'}>
            <Grid.Col span={{ base: 12, md: 6 }}>
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
                      Connect with existing telegram
                      channel.
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
            </Grid.Col>
          </Grid>
        </Radio.Group>
        <form
          className="ctg-s2"
          onSubmit={stepTwoForm.onSubmit(onStepTwoSubmit)}
        >
          {stepTwoForm.values.isOldOrNewChannel ===
          'new' ? (
            <>
              <TextInput
                className="ctg-s1-input"
                label="Channel name"
                placeholder="Bull"
                value={stepTwoForm.values.channelName}
                radius="md"
                {...stepTwoForm.getInputProps(
                  'channelName'
                )}
              />
            </>
          ) : (
            <>
              <Select
                label="Channels"
                placeholder="Select Channel"
                checkIconPosition="right"
                data={existingGroups}
                {...stepTwoForm.getInputProps('groupId')}
                onChange={(val, values) => {
                  stepTwoForm.setValues({
                    groupId: val,
                    superGroup: values.superGroup,
                  });
                }}
              />
            </>
          )}
          <Button
            variant="filled"
            color="black"
            radius="md"
            type="submit"
            fullWidth
            onClick={() =>
              stepTwoForm.setFieldValue(
                'isSaveClickedAtleastOnce',
                true
              )
            }
          >
            Connect
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StepTwoCreateTelegram;
