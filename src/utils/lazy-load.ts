import { isNullOrUndefined } from "./is-not-null-or-undefined";

export function lazyLoad<T>(getValue: () => T) {
  let _value: T;
  return () => {
    if (isNullOrUndefined(_value)) {
      _value = getValue();
    }
    return _value;
  };
}
