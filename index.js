const _ = Symbol("parameter");
const ___ = Symbol("rest parameters");

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const val of iter) {
    acc = f(acc, val);
  }
  return acc;
};

// const map = function(f, iter) {
//   const mappedArray = [];
//   for (const val of iter) {
//     mappedArray.push(f(val));
//   }
//   return mappedArray;
// };

// reduce로 map 구현 해보기
const map = reduce(f, iter);

const filter = function(f, iter) {
  const filteredArray = [];
  for (const val of iter) {
    if (f(val)) filteredArray.push(val);
  }
  return filteredArray;
};

const groupBy = function() {};

const countBy = function() {};

const indexBy = function() {};

const pipe = function() {};

const go = function() {};

const curry = function() {};

const partial = function() {};

export { reduce, map, filter, groupBy, countBy, indexBy, pipe, go, curry, partial, _, ___ };
