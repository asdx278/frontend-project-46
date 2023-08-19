import _ from 'lodash';

// 6. Считаем отступ
const getIndent = (depth, counter = 4) => {
  const replacer = ' ';
  const indent = replacer.repeat((depth * counter) - 2);
  return indent;
};
// 9. Если переданное значение не объект, то сразу его возращаем
const stringify = (data, depth = 1) => {
  if (!(_.isObject(data))) {
    return `${data}`;
  }
  // 10. Если объект, получаем его ключи и значения, формируем из них массив,
  // преобразовываем к строке и возвращаем. p.s. json.stringify
  const text = Object.entries(data).map(([key, value]) => `${getIndent(depth + 1)}  ${key}: ${stringify(value, depth + 1)}`);
  return ['{', ...text, `${getIndent(depth)}  }`].join('\n');
};
// 1. попадаем в эту фунцию
const stylishTree = (tree) => {
  // 3. Для каждого объекта из массива с различиями.
  const iter = (node, depth = 1) => {
    const result = node.map(({
      key, value, state, oldValue, children,
    }) => {
      // 4. Проверяем стостояние объекта.
      switch (state) {
        // 5. Если added, deleted, changed, то добавляем в начало строки
        // отступ в соответствии с уровнем depth
        // 7. Добавляем в строку идентификатор состояния, имя ключа.
        // 8. Вызываем функцию strigify для формирования строки из value ключа.
        // 11. Возвращаем полученную строку.
        case 'added':
          return `${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'deleted':
          return `${getIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'changed':
          return `${getIndent(depth)}- ${key}: ${stringify(oldValue, depth)}\n${getIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${getIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'nested':
          // 12. Если объект имеет состояние: nested - значит у него есть children.
          // 13. Для children вызываем iter c children'ами
          return `${getIndent(depth)}  ${key}: {\n${iter(children, depth + 1)}\n${getIndent(depth)}  }`;
        default:
          throw new Error('Unknown state');
      }
    });
    return [...result].join('\n');
  };
  // 2. Вызываем iter
  const outputResult = iter(tree, 1);
  // 14. Слава Господи, закончили!
  return `{\n${outputResult}\n}`;
};
export default stylishTree;
