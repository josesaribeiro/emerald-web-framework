const toDashCase = str => str.replace(
  /([A-Z])/g,
  str => `-${str[0].toLowerCase()}`
);

export const withTableStyleParser = (Base = class {}) => class extends Base {
  static _expandValueToArray (value, max) {
    return Array(max).fill(value);
  }

  static _completeWithDefault (arr, defValue, max) {
    return this._expandValueToArray(defValue || null, max)
      .map((item, index) => arr[index] != null ? arr[index] : item);
  }

  static _expandStyle (style, defaults, max) {
    return Object
      .entries(style)
      .reduce((result, [key, value]) => {
        const valueType = Array.isArray(value) ? 'array' : typeof value;
        let parsedValue;

        switch (valueType) {
          case 'array':
            parsedValue = this._completeWithDefault(value, defaults[key], max);
            break;

          case 'string':
            parsedValue = this._expandValueToArray(value, max);
            break;

          default:
            parsedValue = value;
        }

        return {
          ...result,
          [key]: parsedValue
        };
      }, {});
  }

  static expandStyles (styles, defaults, max) {
    return Object
      .entries(styles)
      .reduce((result, [key, style]) => ({
        ...result,
        [key]: this._expandStyle(style, defaults, max)
      }), {});
  }

  static stringifyExpandedStyle (expandedStyle) {
    if (typeof expandedStyle !== 'object') {
      return '';
    }

    const max = Math.max(...Object
      .values(expandedStyle)
      .map(arr => arr.length));

    return Array(max).fill().map((item, index) => {
      return Object
        .entries(expandedStyle)
        .reduce((result, [key, values]) => {
          const value = values[index];

          return value != null
            ? `${result} ${[toDashCase(key)]}: ${values[index]};`.trim()
            : result;
        }, '');
    });
  }
};
