import { ColorPicker } from '@mantine/core';
// import classNames from 'classnames';
// import DarkThemeImage from '../../../../public/icons/dark.svg';
// import LightThemeImage from '../../../../public/icons/light.svg';
import { useDebouncedCallback } from '@mantine/hooks';

const Theme = ({ form }) => {
  const onChangeTheme = useDebouncedCallback(value => {
    form.setFieldValue('themeColor', value);
  }, 200);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="mb-2 text-xl font-bold">
        Select Template
      </div>

      {/* <div className="mb-3 flex cursor-pointer gap-4">
        <div
          onClick={() => {
            form.setFieldValue('isDarkTheme', false);
          }}
          className={classNames(
            'flex cursor-pointer flex-col items-center gap-2 rounded-sm p-2 text-sm',
            {
              'border border-violet-700':
                !form.values.isDarkTheme,
            }
          )}
        >
          <img src={LightThemeImage.src} />
          Light (default)
        </div>
        <div
          onClick={() => {
            form.setFieldValue('isDarkTheme', true);
          }}
          className={classNames(
            'flex cursor-pointer flex-col items-center gap-2 rounded-sm p-2 text-sm',
            {
              'border border-violet-700':
                form.values.isDarkTheme,
            }
          )}
        >
          <img src={DarkThemeImage.src} />
          Dark
        </div>
      </div> */}

      <ColorPicker
        format="hex"
        value={form.values.themeColor}
        swatches={[
          '#2e2e2e',
          '#868e96',
          '#fa5252',
          '#e64980',
          '#be4bdb',
          '#7950f2',
          '#4c6ef5',
          '#228be6',
          '#15aabf',
          '#12b886',
          '#40c057',
          '#82c91e',
          '#fab005',
          '#fd7e14',
        ]}
        onChange={onChangeTheme}
      />
    </div>
  );
};

export default Theme;
