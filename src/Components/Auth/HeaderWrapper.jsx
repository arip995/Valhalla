import { Title } from '@mantine/core';

const HeaderWrapper = ({
  titleOne,
  titleOneAlternative,
  titleTwo,
}) => {
  return (
    <>
      {!!titleOne && (
        <Title
          ta="center"
          mb={15}
          className={'container-wrapper-title'}
        >
          {titleOne}
        </Title>
      )}
      {!!titleOneAlternative && (
        <Title
          ta="center"
          mb={15}
          className={'container-wrapper-title-alter'}
        >
          {titleOneAlternative}
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
