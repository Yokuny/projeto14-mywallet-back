const dataValidation = (schema) => {
  return (req, res, next) => {
    const error = schema.validate(req.body, { abortEarly: false });
    if (error.error) {
      const errorsMessages = error.error.details.map((detail) => ({ message: detail.message }));
      return res.status(422).send(errorsMessages);
    }
    next();
  };
};
export default dataValidation;
