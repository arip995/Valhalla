export const StatusArray = [0, 1, 5, 6, 4, 3];
export const StatusPaymentArray = [1, 2];
export const StatusMapping = {
  0: 'Draft',
  1: 'Published',
  2: 'Deleted',
  5: 'Unpublished',
  6: 'Sale disabled',
  4: 'Under review',
  3: 'Rejected',
};
export const ReverseStatusMapping = {
  draft: 0,
  published: 1,
  deleted: 2,
  unpublished: 5,
  sale_disabled: 6,
  under_review: 4,
  rejected: 3,
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
export const StatusErrorTextMapping = {
  0: 'Page is in draft',
  6: 'Sale ended',
  4: 'Page is under review',
  3: 'Page is fraudlent',
};

export const StatusPaymentMapping = {
  1: 'Success',
  2: 'Failed',
  3: 'Dropped',
  0: 'Pending',
};
export const StatusPaymentColorMapping = {
  1: 'green',
  2: 'red',
  3: 'blue',
  0: 'yellow',
};

export const ProductTypemapping = {
  tg: 'Telegram',
  lc: 'Locked content',
  course: 'Course',
};
