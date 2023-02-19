export function passwordContainsLowercaseLetter(value) {
  return /[a-z]/.test(value);
}

export function passwordContainsUppercaseLetter(value) {
  return /[A-Z]/.test(value);
}

export function passwordContainsSpaces(value) {
  return / /.test(value);
}

export function passwordContainsNumber(value) {
  return /[0-9]/.test(value);
}

export function passwordContainsSymbol(value) {
  let containsSymbol = false,
    symbols = '-!§$%&/()=?.:,~;\'#+-/*\\|{}[]_<>"'.split('');

  for (let symbol of symbols) {
    if (value.indexOf(symbol) > -1) {
      containsSymbol = true;
      break;
    }
  }

  return containsSymbol;
}

export function countSpaces(value) {
  return value.split(/ +/).length - 1;
}
