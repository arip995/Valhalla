import React from 'react';

const RadioGroup = ({
  value,
  onChange = () => {},
  list = [],
}) => {
  if (!list?.length) return null;

  return (
    <div className="w-full">
      <div
        className="grid auto-rows-fr grid-cols-1 gap-4"
        style={{
          gridTemplateColumns:
            'repeat(auto-fit, minmax(150px, 1fr))',
          width: '100%',
        }}
      >
        {list.map(item => (
          <div key={item.value} className="w-full min-w-0">
            <label
              className={`relative flex h-full w-full cursor-pointer rounded-lg border p-4 transition-colors ${
                value === item.value
                  ? 'border-violet-500 bg-violet-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex w-full min-w-0 items-start gap-3">
                <div className="relative mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                  <input
                    type="radio"
                    className="h-full w-full cursor-pointer appearance-none rounded-full border-2 transition-colors checked:border-violet-500 checked:bg-violet-500"
                    checked={value === item.value}
                    onChange={() => onChange(item.value)}
                  />
                  {value === item.value && (
                    <svg
                      className="pointer-events-none absolute h-3 w-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium text-gray-900">
                    {item.title}
                  </span>
                  {item.description && (
                    <span className="break-words text-sm text-gray-500">
                      {item.description}
                    </span>
                  )}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;

// import {
//     CheckIcon,
//     Grid,
//     Group,
//     Radio,
//     Text,
//   } from '@mantine/core';
//   import classes from '../../../styles/common/RadioCardOne.module.css';

//   const RadioGroup = ({
//     value,
//     onChange = () => {},
//     list = [],
//   }) => {
//     if (!list?.length) return null;
//     return (
//       <Radio.Group
//         value={value}
//         onChange={value => {
//           onChange(value);
//           // form.setFieldValue('isOldOrNewChannel', value);
//         }}
//       >
//         <Grid gap={'sm'}>
//           {list.map(item => {
//             <Grid.Col span={{ base: 12, md: 6 }}>
//               <Radio.Card
//                 className={classes.root}
//                 value={item.value}
//                 key={item.value}
//               >
//                 <Group wrap="nowrap" align="flex-start">
//                   <Radio.Indicator icon={CheckIcon} />
//                   <div className="flex flex-col gap-2">
//                     <Text className={classes.label}>
//                       {item.title}
//                     </Text>
//                     {!!item.description && (
//                       <Text className={classes.description}>
//                         Connect with existing telegram
//                         channel.
//                       </Text>
//                     )}
//                   </div>
//                 </Group>
//               </Radio.Card>
//             </Grid.Col>;
//           })}
//         </Grid>
//       </Radio.Group>
//     );
//   };

//   export default RadioGroup;
