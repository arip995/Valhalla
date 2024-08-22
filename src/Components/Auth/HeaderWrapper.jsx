import { Title } from '@mantine/core';

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
        <div className="mb-10 text-center text-sm">
          {titleTwo}
        </div>
      )}
    </>
  );
};

export default HeaderWrapper;
