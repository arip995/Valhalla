export const StatusArray = [0, 1, 5, 6, 4, 3];
export const StatusMapping = {
  0: 'Draft',
  1: 'Published',
  //   2: 'Deleted',
  5: 'Unpublished',
  6: 'Sale disabled',
  4: 'Under review',
  3: 'Rejected',
};
export const StatusColorMapping = {
  0: 'yellow',
  1: 'green',
  2: 'red',
  3: 'red',
  4: 'yellow',
  5: 'red',
  6: 'red',
};
export const statusErrorTextMapping = {
  0: 'Page is in draft',
  6: 'Sale ended',
  4: 'Page is under review',
  3: 'Page is fraudlent',
};
