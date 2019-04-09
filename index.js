const _ = Symbol("parameter");
const ___ = Symbol("rest parameters");

const reduce = curry(function(f, acc, iter) {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const item of iter) {
    acc = f(acc, item);
  }
  return acc;
}, 1);

const map = curry((f, iter) => reduce((acc, item) => (acc.push(f(item)), acc), [], iter));

const filter = curry((f, iter) => reduce((acc, item) => (f(item) && acc.push(item), acc), [], iter));

const _baseBy = f => curry((keyF, iter) => reduce((acc, item) => f(acc, item, keyF(item)), {}, iter));

const groupBy = _baseBy((acc, item, key) =>
  Object.assign(acc, {
    [key]: (acc[key] || []).concat(item)
  })
);

const countBy = _baseBy((acc, item, key) =>
  Object.assign(acc, {
    [key]: (acc[key] || 0) + 1
  })
);

const indexBy = _baseBy((acc, item, key) =>
  Object.assign(acc, {
    [key]: item
  })
);

const pipe = (f1, ...fns) => (...args) => reduce((acc, f) => f(acc), f1(...args), fns);

const go = (a, ...fns) => pipe(...fns)(a);
// const go = (...args) => reduce((acc, f) => f(acc), args);

function curry(f, len = f.length - 1) {
  return function _recur(...args1) {
    if (args1.length > len) return f(...args1);
    return (...args2) => _recur(...args1, ...args2);
  };
}

const reverseIter = function*(iter) {
  const arr = [...iter];
  for (let i = arr.length - 1; i >= 0; i--) yield arr[i];
};

// 인자 갯수가 명확하지 않고 중간에 비어 있는 경우? 지연 평가
const partial = function(f, ...args1) {
  const left = [],
    right = [];
  return function(...args2) {
    const args1Iter = args1[Symbol.iterator]();
    const args2Iter = args2[Symbol.iterator]();
    for (const arg of args1Iter) {
      if (arg === ___) break;
      left.push(arg === _ ? args2Iter.next().value : arg);
    }
    const args2RverseIter = reverseIter(args2Iter);
    for (const arg of reverseIter(args1Iter)) {
      right.unshift(arg === _ ? args2RverseIter.next().value : arg);
    }
    return f(...left, ...reverseIter(args2RverseIter), ...right);
  };
};

const take = (l, iter) => {
  let res = [];
  for (const val of iter) {
    res.push(val);
    if (res.length === l) return res;
  }
  return res;
};

const takeAll = () => {};

const takeWhile = (f, iter) => {
  const res = [];
  for (const val of iter) {
    if (f(val)) res.push(val);
    else return res;
  }
};

const L = {};

L.map = function*(f, iter) {
  for (const val of iter) {
    yield f(val);
  }
};

L.filter = function*(f, iter) {
  for (const val of iter) {
    if (f(val)) yield val;
  }
};

L.range = function*(l) {
  let i = -1;
  while (i++ < l) {
    yield i;
  }
};

const range = function(l) {
  let i = -1;
  const res = [];
  while (i++ < l) {
    res.push(i);
  }
  return res;
};

const find = function(v, iter) {
  for (const val of iter) {
    if (val === v) return val;
  }
};

L.flat = function*() {};

const flat = function() {};

L.deepFlat = function*() {};

const deepFlat = function() {};

L.flatMap = function*() {};

const flatMap = function() {};

export {
  reduce,
  map,
  filter,
  groupBy,
  countBy,
  indexBy,
  pipe,
  go,
  curry,
  partial,
  _,
  ___,
  take,
  takeWhile,
  takeAll,
  L,
  range,
  find,
  flat,
  deepFlat,
  flatMap
};
