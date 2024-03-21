// Importa Handlebars
import Handlebars from "handlebars";

const ifEquals = function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
};

export default ifEquals;
