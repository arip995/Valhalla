import { Divider, NavLink, rem } from '@mantine/core';
import Link from 'next/link';

export default function NavbarLink({
  Icon,
  label,
  active,
  path,
  onClick,
  showLabel = false,
  apps = false,
}) {
  return (
    <>
      {apps ? (
        <>
          <Divider
            label={`Apps`}
            labelPosition="center"
            my="sm"
          />
        </>
      ) : (
        <>
          <Link href={path}>
            {showLabel ? (
              <NavLink
                style={{ borderRadius: '6px' }}
                onClick={onClick}
                label={label}
                leftSection={
                  <Icon
                    style={{
                      width: rem(20),
                      height: rem(20),
                    }}
                    stroke={1.5}
                  />
                }
                active={active}
              />
            ) : (
              <NavLink
                style={{ borderRadius: '6px' }}
                onClick={onClick}
                label={
                  <div className="flex flex-col items-center break-words text-center text-[10px]">
                    <Icon
                      style={{
                        width: rem(20),
                        height: rem(20),
                      }}
                      stroke={1.5}
                    />
                    {label}
                  </div>
                }
                active={active}
              />
            )}
          </Link>
        </>
      )}
    </>
  );
}
