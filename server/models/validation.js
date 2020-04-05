const { isURL, isEmail } = require("validator");

const urlSchema = () => {
  return {
    validate: {
      validator: isURL,
      message: (props) => `${props.value} isn't a valid URL`,
    },
  };
};

const emailSchema = () => {
  return {
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} isn't a valid email`,
    },
  };
};

module.exports = {
  urlSchema,
  emailSchema,
};
