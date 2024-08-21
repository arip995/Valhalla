import { Divider, NavLink, rem } from '@mantine/core';
import Link from 'next/link';

export default function NavbarLink({
  Icon,
  label,
  active,
  path,
  onClick,
  create = false,
}) {
  return (
    <>
      {create ? (
        <Divider
          label={`Create`}
          labelPosition="center"
          my="sm"
        />
      ) : (
        <Link href={path}>
          <NavLink
            style={{ borderRadius: '20px' }}
            onClick={onClick}
            label={label}
            leftSection={
              <Icon
                style={{ width: rem(15), height: rem(15) }}
                stroke={1.5}
              />
            }
            active={active}
          />
        </Link>
      )}
    </>
  );
}
