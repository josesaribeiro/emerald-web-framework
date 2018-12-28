import sinon from 'sinon';

import {
  withForm,
  FORM_TYPES,
  FORM_FIELD_TYPES,
  FORM_FIELD_MESSAGE_TYPES,
  FORM_SUBMIT_TYPES,
} from './withForm.js';

import * as reducer from '../state/formReducer.js';

let MutObserver;
let fromReducer;
let WithForm;
let form;

const shadowRoot = {};
shadowRoot.querySelectorAll = () => [];
shadowRoot.addEventListener = sinon.spy();
shadowRoot.removeEventListener = sinon.spy();

const formElement = {
  nodeName: FORM_TYPES[0],
};

const fieldElement = {
  nodeName: FORM_FIELD_TYPES[0],
};

const messageElement = {
  nodeName: FORM_FIELD_MESSAGE_TYPES[0],
};

const submitButtonElement = {
  nodeName: FORM_SUBMIT_TYPES[0],
  type: 'submit',
};

const resetButtonElement = {
  nodeName: FORM_SUBMIT_TYPES[0],
  type: 'reset',
};

describe('withForm', () => {
  beforeEach(() => {
    MutObserver = sinon.spy();
    MutObserver.prototype.observe = sinon.spy();
    MutObserver.prototype.disconnect = sinon.spy();

    fromReducer = { ...reducer };

    WithForm = withForm(undefined, MutObserver, fromReducer);

    form = new WithForm();
    form.shadowRoot = { ...shadowRoot };
    form.dispatchAction = sinon.spy();
  });

  afterEach(() => {
    MutObserver = undefined;
    fromReducer = undefined;
    WithForm = undefined;
    form = undefined;
  });

  describe('#connectedCallback()', () => {
    it('Should call super.connectedCallback if it exists.', () => {
      class Faker {}
      Faker.prototype.connectedCallback = sinon.spy();

      WithForm = withForm(Faker, MutObserver, fromReducer);
      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };

      form.connectedCallback();

      expect(Faker.prototype.connectedCallback).to.have.been.calledOnce;
    });

    it('Should register a mutation observer that ' +
      'calls handleDomUpdate.', () => {
      form.handleDomUpdate = sinon.spy();
      form.connectedCallback();

      expect(MutObserver.prototype.observe)
        .to.have.been.calledOnceWith(form.shadowRoot, {
          childList: true,
          subtree: true,
        });
    });

    it('Should attach event listeners to the shadowRoot.', () => {
      form.connectedCallback();
      expect(form.shadowRoot.addEventListener).to.have.been.called;
    });

    it('Should call handleDomUpdate without parameters.', () => {
      form.handleDomUpdate = sinon.spy();
      form.connectedCallback();
      expect(form.handleDomUpdate).to.have.been.calledOnceWith();
    });
  });

  describe('#disconnectedCallback()', () => {
    it('Should call super.disconnectedCallback if it exists.', () => {
      class Faker {}
      Faker.prototype.disconnectedCallback = sinon.spy();

      WithForm = withForm(Faker, MutObserver, fromReducer);
      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };

      form.disconnectedCallback();

      expect(Faker.prototype.disconnectedCallback).to.have.been.calledOnce;
    });

    it('Should unregister a mutation observer.', () => {
      form.disconnectedCallback();
      expect(MutObserver.prototype.disconnect).to.have.been.calledOnce;
    });

    it('Should remove event listeners to the shadowRoot.', () => {
      form.disconnectedCallback();
      expect(form.shadowRoot.removeEventListener).to.have.been.called;
    });
  });

  describe('.isForm()', () => {
    it('Should return false if a DOM element is not a form element.', () => {
      expect(WithForm.isForm({})).to.be.false;
    });

    it('Should return true if a DOM element is a form element.', () => {
      expect(WithForm.isForm(formElement)).to.be.true;
    });
  });

  describe('.isFormField()', () => {
    it('Should return false if a DOM element is not a field element.', () => {
      expect(WithForm.isFormField({})).to.be.false;
    });

    it('Should return true if a DOM element is a field element.', () => {
      expect(WithForm.isFormField(fieldElement)).to.be.true;
    });
  });

  describe('.isFormFieldMessage()', () => {
    it('Should return false if a DOM element is not a message element.', () => {
      expect(WithForm.isFormFieldMessage({})).to.be.false;
    });

    it('Should return true if a DOM element is a message element.', () => {
      expect(WithForm.isFormFieldMessage(messageElement)).to.be.true;
    });
  });

  describe('.isSubmitButton()', () => {
    it('Should return false if a DOM element is not a submit button.', () => {
      expect(WithForm.isSubmitButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a submit button.', () => {
      expect(WithForm.isSubmitButton(submitButtonElement)).to.be.true;
    });
  });

  describe('.isResetButton()', () => {
    it('Should return false if a DOM element is not a reset button.', () => {
      expect(WithForm.isResetButton({})).to.be.false;
    });

    it('Should return true if a DOM element is a reset button.', () => {
      expect(WithForm.isResetButton(resetButtonElement)).to.be.true;
    });
  });

  describe('.getFieldId()', () => {
    it('Should return a field id being its ' +
      'name property or id property.', () => {
      let fakeField;

      fakeField = { name: 'stone' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');

      fakeField = { id: 'stone' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');

      fakeField = { name: 'stone', id: 'payments' };
      expect(WithForm.getFieldId(fakeField)).to.equal('stone');
    });
  });

  describe('#form', () => {
    it('Should return a single form element, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      expect(form.form).to.deep.equal(formElement);
    });

    it('Should return undefined if a form element is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [];
      expect(form.form).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.form).to.be.undefined;
    });
  });

  describe('#fields', () => {
    it('Should return an array of form fields, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [fieldElement];
      expect(form.fields).to.deep.equal([fieldElement]);
    });

    it('Should return an empty array if form fields are not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.fields).to.be.empty;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.fields).to.be.empty;
    });
  });

  describe('#fieldMessages', () => {
    it('Should return an array of form messages, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [messageElement];
      expect(form.fieldMessages).to.deep.equal([messageElement]);
    });

    it('Should return an empty array if form messages are not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.fieldMessages).to.be.empty;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.fieldMessages).to.be.empty;
    });
  });

  describe('#submitButton', () => {
    it('Should return a single submit button, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [submitButtonElement];
      expect(form.submitButton).to.deep.equal(submitButtonElement);
    });

    it('Should return undefined if a submit button is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.submitButton).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.submitButton).to.be.undefined;
    });
  });

  describe('#resetButton', () => {
    it('Should return a single reset button, if found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [resetButtonElement];
      expect(form.resetButton).to.deep.equal(resetButtonElement);
    });

    it('Should return undefined if a reset button is not found.', () => {
      form.shadowRoot.querySelectorAll = () => [formElement];
      form.form.querySelectorAll = () => [];
      expect(form.resetButton).to.be.undefined;
    });

    it('Should return undefined if shadowRoot does not exist yet.', () => {
      form.shadowRoot = undefined;
      expect(form.resetButton).to.be.undefined;
    });
  });

  describe('#state', () => {
    it('Should correctly get and set state.', () => {
      form.state = { ub: 40 };
      expect(form.state).to.deep.equal({ ub: 40 });
    });

    it('Should also set formState when setting state, ' +
      'which is the same as state without byId.', () => {
      form.state = {
        byId: {},
        values: {},
      };

      expect(form.formState).to.deep.equal({ values: {} });
    });

    it('Should execute handleStateUpdate when setting state.', () => {
      form.handleStateUpdate = sinon.spy();

      form.state = {
        byId: {},
        values: {},
      };

      expect(form.handleStateUpdate)
        .to.have.been.calledOnceWith({ values: {} });
    });
  });

  describe('#getFieldById()', () => {
    it('Should return a field by its id.', () => {
      Object.defineProperty(form, 'fields', {
        value: [{ name: 'earth' }, { name: 'wind' }, { id: 'fire' }],
      });

      expect(form.getFieldById('earth')).to.deep.equal({ name: 'earth' });
    });
  });

  describe('#addField()', () => {
    it('Should add a field to the state.', () => {
      fromReducer.addField = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.addField('id');

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.addField).to.have.been.calledOnceWith('id');
    });
  });

  describe('#removeFields()', () => {
    it('Should remove a field from the state.', () => {
      fromReducer.removeFields = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.removeFields('path');

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.removeFields).to.have.been.calledOnceWith('path');
    });
  });

  describe('#setValues()', () => {
    it('Should set many state values at once.', () => {
      fromReducer.setValues = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.setValues('values');

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.setValues).to.have.been.calledOnceWith('values');
    });
  });

  describe('#validateFieldByElement()', () => {
    it('Should validate a single field given its dom element.', () => {
      const field = {
        name: 'stone',
        validation: 'validation',
        value: 'value',
      };

      fromReducer.validateField = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.validateFieldByElement(field);

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.validateField)
        .to.have.been.calledOnceWith('stone', 'validation', 'value');
    });
  });

  describe('#validateField()', () => {
    it('Should validate a single field given its id.', () => {
      form.validateFieldByElement = sinon.spy();
      form.getFieldById = sinon.spy();

      form.validateField('id');

      expect(form.validateFieldByElement).to.have.been.calledOnce;
      expect(form.getFieldById).to.have.been.calledOnceWith('id');
    });
  });

  describe('#validateFields()', () => {
    it('Should validate fields.', () => {
      fromReducer.validateFields = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      Object.defineProperties(form, {
        form: {
          value: { validation: 'validation' },
        },
        formState: {
          value: { values: 'values' },
        },
      });

      form.validateFields();

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.validateFields)
        .to.have.been.calledOnceWith('validation', 'values');
    });
  });

  describe('#validateForm()', () => {
    it('Should validate each single field and fields.', () => {
      Object.defineProperty(form, 'fields', {
        value: [{ name: 'earth' }, { name: 'wind' }, { id: 'fire' }],
      });

      form.validateFieldByElement = sinon.spy();
      form.validateFields = sinon.spy();

      form.validateForm();

      expect(form.validateFieldByElement).to.have.been.calledThrice;

      expect(form.validateFieldByElement.args[0][0])
        .to.deep.equal({ name: 'earth' });

      expect(form.validateFieldByElement.args[1][0])
        .to.deep.equal({ name: 'wind' });

      expect(form.validateFieldByElement.args[2][0])
        .to.deep.equal({ id: 'fire' });

      expect(form.validateFields).to.have.been.calledOnceWith();
    });
  });

  describe('#touchAllFields()', () => {
    it('Should touch all field programatically.', () => {
      fromReducer.updateFieldTouched = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      Object.defineProperty(form, 'fields', {
        value: [{ name: 'earth' }, { name: 'wind' }, { id: 'fire' }],
      });

      form.touchAllFields();

      expect(form.dispatchAction).to.have.been.calledThrice;
      expect(fromReducer.updateFieldTouched).to.have.been.calledThrice;

      expect(fromReducer.updateFieldTouched.args[0])
        .to.deep.equal(['earth', true]);

      expect(fromReducer.updateFieldTouched.args[1])
        .to.deep.equal(['wind', true]);

      expect(fromReducer.updateFieldTouched.args[2])
        .to.deep.equal(['fire', true]);
    });
  });

  describe('#submitForm()', () => {
    it('Should start form submission if it has not started yet.', () => {
      fromReducer.startSubmission = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();
      form.touchAllFields = sinon.spy();
      form.validateForm = sinon.spy();

      form.formState.isSubmitting = false;

      form.submitForm();

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(form.touchAllFields).to.have.been.calledOnceWith();
      expect(form.validateForm).to.have.been.calledOnceWith();
      expect(fromReducer.startSubmission).to.have.been.calledOnceWith();
    });

    it('Should ignore form submission if it has already started.', () => {
      fromReducer.startSubmission = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();
      form.touchAllFields = sinon.spy();
      form.validateForm = sinon.spy();

      form.formState.isSubmitting = true;

      form.submitForm();

      expect(form.dispatchAction).not.to.have.been.called;
      expect(form.touchAllFields).not.to.have.been.called;
      expect(form.validateForm).not.to.have.been.called;
      expect(fromReducer.startSubmission).not.to.have.been.called;
    });
  });

  describe('#finishSubmission()', () => {
    it('Should finish form submission if it has already started.', () => {
      fromReducer.finishSubmission = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.formState.isSubmitting = true;

      form.finishSubmission();

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(form.preventNextSubmissionEvent).to.be.false;
      expect(fromReducer.finishSubmission).to.have.been.calledOnceWith();
    });

    it('Should ignore finishing form submission if it has not started.', () => {
      fromReducer.finishSubmission = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.formState.isSubmitting = false;

      form.finishSubmission();

      expect(form.dispatchAction).not.to.have.been.called;
      expect(form.preventNextSubmissionEvent).to.be.undefined;
      expect(fromReducer.finishSubmission).not.to.have.been.called;
    });
  });

  describe('#resetForm()', () => {
    it('Should add a field to the state.', () => {
      fromReducer.resetForm = sinon.spy();

      WithForm = withForm(undefined, MutObserver, fromReducer);

      form = new WithForm();
      form.shadowRoot = { ...shadowRoot };
      form.dispatchAction = sinon.spy();

      form.resetForm();

      expect(form.dispatchAction).to.have.been.calledOnce;
      expect(fromReducer.resetForm).to.have.been.calledOnceWith();
    });
  });
});
