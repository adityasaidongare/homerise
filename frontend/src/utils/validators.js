export const validateRequired = (value, label = 'This field') => {
  if (value === undefined || value === null || String(value).trim() === '') {
    return `${label} is required`;
  }
  return '';
};

export const validateEmail = (email) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
};

export const validatePassword = (password) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);
};

export const validatePhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

export const validatePincode = (pincode) => {
  return /^\d{6}$/.test(pincode);
};

export const validateBudget = (budget) => {
  return Number(budget) >= 10000;
};

export const validatePositiveNumber = (value) => {
  return Number(value) > 0;
};

export const validatePercentage = (value) => {
  const number = Number(value);
  return !Number.isNaN(number) && number >= 0 && number <= 100;
};

export const validateRegisterField = (name, value) => {
  if (name === 'name') return validateRequired(value, 'Name');
  if (name === 'email') {
    return validateRequired(value, 'Email') || (validateEmail(value) ? '' : 'Enter a valid email address');
  }
  if (name === 'password') {
    return validateRequired(value, 'Password') || (validatePassword(value) ? '' : 'Password must be 8+ chars with upper, lower, and number');
  }
  if (name === 'phone') {
    return validateRequired(value, 'Phone') || (validatePhone(value) ? '' : 'Phone number must be exactly 10 digits');
  }
  if (name === 'role') return validateRequired(value, 'Role');
  return '';
};

export const validateLoginField = (name, value) => {
  if (name === 'email') {
    return validateRequired(value, 'Email') || (validateEmail(value) ? '' : 'Enter a valid email address');
  }
  if (name === 'password') return validateRequired(value, 'Password');
  return '';
};

export const validatePropertyField = (name, value) => {
  if (name === 'address') return validateRequired(value, 'Address');
  if (name === 'city') return validateRequired(value, 'City');
  if (name === 'pincode') {
    return validateRequired(value, 'Pincode') || (validatePincode(value) ? '' : 'Pincode must be exactly 6 digits');
  }
  if (name === 'propertyType') return validateRequired(value, 'Property type');
  if (name === 'builtArea') {
    return validateRequired(value, 'Built area') || (validatePositiveNumber(value) ? '' : 'Built area must be greater than 0');
  }
  if (name === 'budget') {
    return validateRequired(value, 'Budget') || (validateBudget(value) ? '' : 'Budget must be at least 10000');
  }
  if (name === 'currentCondition') return validateRequired(value, 'Current condition');
  if (name === 'goals') return validateRequired(value, 'Goals');
  return '';
};

export const validateRecommendationField = (name, value) => {
  if (name === 'title') return validateRequired(value, 'Title');
  if (name === 'category') return validateRequired(value, 'Category');
  if (name === 'description') return validateRequired(value, 'Description');
  if (name === 'estimatedCost') {
    return validateRequired(value, 'Estimated cost') || (validatePositiveNumber(value) ? '' : 'Estimated cost must be greater than 0');
  }
  if (name === 'roiPercentage') {
    return validateRequired(value, 'ROI percentage') || (validatePercentage(value) ? '' : 'ROI percentage must be between 0 and 100');
  }
  if (name === 'difficulty') return validateRequired(value, 'Difficulty');
  return '';
};

export const getFormErrors = (form, fieldValidator) => {
  return Object.keys(form).reduce((acc, key) => {
    const error = fieldValidator(key, form[key]);
    if (error) {
      acc[key] = error;
    }
    return acc;
  }, {});
};

export const isErrorObjectEmpty = (errors) => Object.keys(errors).length === 0;
