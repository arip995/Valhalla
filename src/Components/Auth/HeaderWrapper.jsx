import { Text, Title } from '@mantine/core';

const HeaderWrapper = ({ titleOne, titleTwo }) => {
  return (
    <>
      {!!titleOne && (
        <Title
          ta="center"
          size="xl"
          mb={15}
          className={'auth-title'}
        >
          {titleOne}
        </Title>
      )}
      {!!titleTwo && (
        <Text size="sm" ta="center" mb={40}>
          {titleTwo}
        </Text>
      )}
    </>
  );
};

export default HeaderWrapper;
