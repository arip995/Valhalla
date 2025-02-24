import { Switch } from '@mantine/core';

const StatusBlock = ({
  label,
  value,
  onChange = () => {},
}) => {
  return (
    <div className="flex w-full justify-between py-4">
      <div className="text-gray-600">{label}</div>
      <Switch
        color="teal"
        checked={value}
        onChange={event =>
          onChange(event.currentTarget.checked)
        }
      />
    </div>
  );
};

export default StatusBlock;
