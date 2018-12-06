import { isPromise, setIn } from 'sling-helpers/src';
import { FormValidator } from './FormValidator.js';

const formValidator = new FormValidator();

const treatError = error =>
  (error && error.constructor === Error ? error.message : error);

const atLevel = wrapperFn => async (validatorFn, value, path) => {
  if (validatorFn == null) {
    return {};
  }

  const error = validatorFn(value);

  return (isPromise(error))
    ? error.catch(treatError).then(wrapperFn(path))
    : Promise.resolve(wrapperFn(path)(treatError(error)));
};

const atFieldLevel = (...args) => {
  const wrapperFn = path => errorStr => setIn({}, path, errorStr || null);
  return atLevel(wrapperFn)(...args);
};

const atFormLevel = (...args) => {
  const wrapperFn = () => errorObj => errorObj || {};
  return atLevel(wrapperFn)(...args);
};

export const validateField = (validatorFn, valueStr, path) =>
  formValidator.validate(() => atFieldLevel(validatorFn, valueStr, path), path);

export const validateForm = (validatorFn, valueObj) =>
  formValidator.validate(() => atFormLevel(validatorFn, valueObj));

export const onFormValidation = (fn) => {
  formValidator.onValidation = fn;
};
