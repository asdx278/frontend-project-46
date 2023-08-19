import stylishTree from './stylish.js';
import plainTree from './plain.js';

const makeBeautiful = (tree, formatter) => {
  switch (formatter) {
    case 'plain':
      return plainTree(tree);
    case 'stylish':
      return stylishTree(tree);
    default:
      throw new Error('Unsupported format');
  }
};

export default makeBeautiful;
