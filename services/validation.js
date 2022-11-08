const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const message = {
  require: "Обов'язкове поле",
  notCorrect: "Некоректні дані"
};

export { EMAIL_REGEX, message };