import yaml from 'js-yaml';

export default (file, extension) => {
  switch (extension) {
    case 'json':
      return JSON.parse(file);
    case 'yml':
    case 'yaml':
      return yaml.load(file);
    default:
      throw new Error(`${extension} extension is not supported`);
  }
};
