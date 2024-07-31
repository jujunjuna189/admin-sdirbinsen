export const ConverUrl = (value) => {
  var str = value;
  str = str?.replace("&", "%26");
  return str;
};
