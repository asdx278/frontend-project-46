import stylishTree from './stylish.js';

const makeBeautiful = (tree, formatter) => {
  switch (formatter) {
    case 'plain':
      // TODO;
      return console.log('!!!!');
    case 'stylish':
      return stylishTree(tree);
    default:
      throw new Error('Unsupported format');
  }
};

export default makeBeautiful;
