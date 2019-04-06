const _ = Symbol("parameter");
const ___ = Symbol("rest parameters");

const reduce = function() {};

const map = function(f, iter) {
  const mappedArray = [];
  for (const val of iter) {
    mappedArray.push(f(val));
  }
  return mappedArray;
};

const filter = function() {};

const groupBy = function() {};

const countBy = function() {};

const indexBy = function() {};

const pipe = function() {};

const go = function() {};

const curry = function() {};

const partial = function() {};

export { reduce, map, filter, groupBy, countBy, indexBy, pipe, go, curry, partial, _, ___ };
