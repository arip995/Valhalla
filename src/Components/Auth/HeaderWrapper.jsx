import { Text, Title } from '@mantine/core';

const HeaderWrapper = ({ titleOne, titleTwo }) => {
  return (
    <>
      {!!titleOne && (
        <Title
          ta="center"
          size="xl"
          className={'auth-title'}
        >
          {titleOne}
        </Title>
      )}
      {!!titleTwo && (
        <Text size="sm" ta="center" mt={5} mb={40}>
          {titleTwo}
        </Text>
      )}
    </>
  );
};

export default HeaderWrapper;
