export const restrictedChars = /[^a-zA-Z0-9]/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
export const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
export const bankAccountNumberRegex = /^\d{9,18}$/;

export const validateEmail = email => {
  // Regular expression for email validation

  // Check if the email is defined and not too long
  if (!email || email.length > 254) return false;

  // Use a single regex check for the standard email parts
  if (!emailRegex.test(email)) return false;

  // Split once and perform length checks on the parts
  const parts = email.split('@');
  if (parts[0].length > 64) return false;

  // Perform length checks on domain parts
  const domainParts = parts[1].split('.');
  if (domainParts.some(part => part.length > 63))
    return false;

  return true;
};

export const validatePhoneNumber = phoneNumber => {
  if (!phoneNumber || phoneNumber.toString()?.length !== 10)
    return false;

  return true;
};

export const checkRestrictedChars = val => {
  return !restrictedChars.test(val);
};

export const validateEditorContent = content => {
  let textContent = content?.trim();

  // Check if the content is empty
  if (!textContent) {
    return 'Text or Image content is required';
  }

  // Check for presence of an image
  const hasImage = /<img[^>]+src=["'][^"']+["'][^>]*>/.test(
    textContent
  );

  // Check for presence of text content (excluding empty tags)
  const hasText = /<[^>]+>[^<]+<\/[^>]+>/.test(textContent);

  // Check for presence of list items
  const hasList = /<li>[^<]+<\/li>/.test(textContent);

  // If there's an image, text content, or a list, consider it valid
  if (hasImage || hasText || hasList) {
    return null;
  }

  return 'Text or Image content is required';
};

export const isValidUrl = url => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidPan = value => {
  if (panRegex.test(value)) return true;
};

export const isValidIFSC = value => {
  if (ifscRegex.test(value)) return true;
};

export const isValidBankAccountNumber = value => {
  if (bankAccountNumberRegex.test(value)) return true;
};
