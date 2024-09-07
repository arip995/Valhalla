export const restrictedChars = /[^a-zA-Z0-9]/;

export const validateEmail = email => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (!phoneNumber || !phoneNumber.length === 10)
    return false;

  return false;
};

export const checkRestrictedChars = val => {
  return !restrictedChars.test(val);
};

export const validateEditorContent = content => {
  let textContent = content?.trim();
  textContent = content
    ?.replace(/&nbsp;/g, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();
  console.log(textContent);
  if (!textContent) {
    return 'Content is required';
  }
  if (textContent.length > 10000) {
    return 'Content should be less than 10000 characters';
  }
  return null;
};
