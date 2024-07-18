import cx from 'clsx';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
  rem,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from '../../../styles/common/theme-toggle.module.css';

export function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme(
    'light',
    { getInitialValueInEffect: true }
  );

  return (
    <Group justify="center">
      <ActionIcon
        className={cx(classes.actionIcon)}
        onClick={() =>
          setColorScheme(
            computedColorScheme === 'light'
              ? 'dark'
              : 'light'
          )
        }
        variant="default"
        size="sm"
        radius="lg"
        aria-label="Toggle color scheme"
      >
        <IconSun
          className={cx(classes.icon, classes.light)}
          stroke={1.3}
        />
        <IconMoon
          className={cx(classes.icon, classes.dark)}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  );
}
