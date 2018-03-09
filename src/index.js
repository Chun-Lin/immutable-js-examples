import { is, fromJS, Map, List } from 'immutable'

const t0 = performance.now()
// fromJS: transfer js list to List and object to Map
const list = fromJS([10, 20, 30])
const object = fromJS({ a: '1', b: '2', c: '3' })
console.log(`fromJS list: ${list}`)
console.log(`formJS object: ${object}`)

// toJS: transfer immutable.js data structure to native js data structure
const tojsList = list
const tojsObject = object
console.log(tojsList)
console.log(tojsObject)

// is: immutable.js is value-based
const list2 = fromJS([10, 20, 30])
console.log(`Value comparison: ${is(list, list2)}`)

const tojsList2 = list2
console.log(`reference comparison: ${is(tojsList2, list2)}`)

// of: give values to List and Map. Map will sort based-on number
console.log(
  Map.of('x', 'three', 'bx', 'dthree', 2, 'two', 1, 'list-of-one'),
)
console.log(List.of(1, 2, 3, 4))

// size: size of Map and List
console.log(`size of Map: ${Map({ key: 'value2', key1: 'value1' }).size}`)
console.log(`size of List: ${List([1, 2, 3, 4]).size}`)

// count: return the size of collection
console.log(`count: ${fromJS({ key: 'value2', key1: 'value1' }).count()}`)
console.log(
  `count: ${fromJS({ key: 1, key1: 34 }).count((value, key, obj) => {
    return value > 3
  })}`,
)
console.dir(
  `countBy: ${fromJS({ key: 1, key1: 34 }).countBy((value, key, obj) => {
    return value > 3
  })}`,
)
console.log(
  `countBy: ${fromJS([1, 2, 5, 6]).countBy((value, index, array) => {
    return value > 3
  })}`,
)

// Set: set values to Map and List
// It willSet first element
console.log(`=====set=====`)
const setObj = Map({ a: { a: 34 }, b: 2, c: 3, d: 444 })
console.log(`Set Object: ${setObj.set('a', 0)}`)
console.log(`Set Object: ${setObj.set('e', 99)}`)

const setList = List([1, 2, 3])
console.log(setList.set(-1, 0)) // [1, 2, 0]  set the last element
console.log(setList.set(4, 0)) // [ 1, 2, 3, undefined, 0 ]  empty element will be undefined

// SetIn(keyPath, value): Returns a new Map having set value at this keyPath.
// If any keys in keyPath do not exist, a new immutable Map will be created at that key.
console.log(`=====setIn=====`)
console.log(
  `MapSetIn:
  ${fromJS({ a: 45, b: 64, c: { a: 21 } }).setIn(['c', 'a'], 1000)}`,
)

console.log(
  fromJS([1, 2, 3, { a: 45, b: 64 }])
    .setIn(['3', 'a'], 1000)
    ,
)

// pop, push, shift, unshift
// ImmutableJS：return a new List
console.log(`=====pop=====`)
const ImmuListTest = List([1, 2, 3, 4])
console.log(ImmuListTest.pop(), ImmuListTest)
// Normal list method
const normalListTest = [1, 2, 3, 4]
console.log(normalListTest.pop(), normalListTest)

// delete(key): just the same way as set
console.log(`=====delete=====`)
console.log(
  fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 })
    .delete('c')
    ,
)
console.log(
  fromJS([1, 2, 3])
    .delete(1)
    ,
)

console.log(`=====deleteIn=====`)
// deleteIn(keyPath): just the same way as setIn
console.log(
  `deleteIn: ${fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 }).deleteIn([
    'a',
    'a1',
  ])}`,
)

// update(key: K, notSetValue: V, updater: (value: V) => V): this
// update(key: K, updater: (value: V) => V): this
console.log(`=====update=====`)

const updateList = fromJS([1, 2, 3])
console.log(
  updateList
    .update(2, value => {
      return value * 2
    })
    ,
  updateList,
)

console.log(
  updateList
    .update(6, 1, value => {
      return value * 2
    })
    ,
  updateList,
)

const updateMap = fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 })
console.log(
  updateMap
    .update('a', value => {
      return value * 2
    })
    ,
  updateMap,
)

console.log(
  updateMap
    .update('e', 1, value => {
      return value * 2
    })
    ,
  updateMap,
)

// get(key: number, notSetValue?: T)
console.log(`=====get=====`)
// List
const getList = fromJS([1111111, 22222, { a: 888123 }])
console.log(getList.get(0))
console.log(getList.get(11, 'no have value')) // no have value
// getIn
console.log(getList.getIn(['2', 'a'], 'child no have value'))
console.log(getList.getIn(['2', 'b'], 'child no have value'))

// Map
const getMap = fromJS({ a: { a1: 222 }, b: 2, c: 3, d: 444 })
console.log(getMap.get('a'))
console.log(getMap.get('v', 'no have value'))
// getIn
console.log(getMap.getIn(['a', 'a1'], 'child no have value'))
console.log(getMap.getIn(['d', 'b1'], 'child no have value'))

// find()
console.log(`=====find=====`)
// List
console.log(
  fromJS([1, 2, 56, { a: { b: 111 } }])
    .find((value, index, array) => {
      return index === 3
    })
    ,
)

// Map
console.log(
  fromJS({ a: { a1: 222 }, b: 2, c: 3, d: 444 }).find((value, key, obj) => {
    return value === 3
  }),
)

// List
console.log(
  fromJS([1, 2, 3, { a: { b: 111 } }]).findKey((value, index, array) => {
    return index === 3
  }),
)

// Map
console.log(
  fromJS({ a: { a1: 222 }, b: 2, c: 3, d: 444 }).findKey((value, key, obj) => {
    return value === 3
  }),
)

// findEntry: return key:value || undefined
console.log(`=====findEntry=====`)
// List
console.log(
  fromJS([1, 2, 3, { a: { b: 111 } }]).findEntry((value, index, array) => {
    return index === 3
  }),
)

// Map
console.log(
  fromJS({ a: { a1: 222 }, b: 2, c: 3, d: 444 }).findEntry(
    (value, key, obj) => {
      return is(value, fromJS({ a1: 222 }))
    },
  ),
)

console.log(`=====map, filter, every, some=====`)
//1. map()
console.log(
  fromJS([1, 2, 3, 4, 5])
    .map((value, index, array) => {
      return value * 2
    })
    ,
) // [2, 4, 6, 8, 10]

//2. filter()
console.log(
  fromJS([1, 2, 3, 4, 5])
    .filter((value, index, array) => {
      return value % 2 === 0
    })
    ,
) // [2, 4]

//3. every()
console.log(
  fromJS([1, 2, 3, 4, 5]).every((value, index, array) => {
    return value > 2
  }),
) // false

//4. some()
console.log(
  fromJS([1, 2, 3, 4, 5]).some((value, index, array) => {
    return value > 2
  }),
) // true

console.log(`=====mapKeys, mayEntries=====`)
// mapKeys():
console.log(
  fromJS({ a: 5, b: 2, c: 3, d: 444 })
    .mapKeys(key => {
      return key + 'hhh'
    })
    ,
)
// {ahhh: 5, bhhh: 2, chhh: 3, dhhh: 444}

//mapEntries()
console.log(
  fromJS({ a: 5, b: 2, c: 3, d: 444 })
    .mapEntries(([key, value]) => {
      return [key + 'aaa', value + 'hhhh']
    })
    ,
) //   {aaaa: "5hhhh", baaa: "2hhhh", caaa: "3hhhh", daaa: "444hhhh"}

console.log(`=====merge, mergeDeep, mergeWith, mergeDeepWith=====`)
// List
const mergeList = fromJS([1, 2, 3, 7, { a: { b: 55, c: 66 } }])
const mergeList1 = fromJS([1, 2, 3, 6, { a: { b: 333, d: 67 } }])

// shallow merge
console.log(mergeList.merge(mergeList1), mergeList)
// mergeList1 -> mergeList [1, 2, 3, 6, {b: 333, d: 67}] [1, 2, 3, 7, {a: {b: 55, c: 66}}]

// deep merge
console.log(mergeList.mergeDeep(mergeList1), mergeList)
// mergeList1 -> mergeList [1, 2, 3, 6, {b: 333, c: 66, d: 67}] [1, 2, 3, 7, {a: {b: 55, c: 66}}]

// define merge rules
console.log(
  mergeList
    .mergeWith((prev, next) => {
      return prev
    }, mergeList1)
    ,
  mergeList1,
)
// define mergeDeep rules
console.log(
  mergeList
    .mergeDeepWith((prev, next) => {
      return prev
    }, mergeList1)
    ,
  mergeList1,
)

// Map
const mergeMap = fromJS({ a: { a1: 222, a3: 456 }, b: 2, c: 3, d: 444 })
const mergeMap1 = fromJS({ a: { a1: 222, a2: 234 }, b: 2, c: 3, d: 444 })

// shallow merge
console.log(mergeMap.merge(mergeMap1), mergeMap)
// mergeMap1 -> mergeMap {a: {a1: 222, a2: 234}, b: 2, c: 3, d: 444} {a: {a1: 222, a3: 456}, b: 2, c: 3, d: 444}

// deep merge
console.log(mergeMap.mergeDeep(mergeMap1), mergeMap)
// mergeMap1 -> mergeMap {a: {a1: 222, a2: 234, a3: 456}, b: 2, c: 3, d: 444} {a: {a1: 222, a3: 456}, b: 2, c: 3, d: 444}

// shallow merge rules
console.log(
  mergeMap
    .mergeWith((prev, next) => {
      return prev
    }, mergeMap1)
    ,
  mergeMap1,
)
// deep merge rules
console.log(
  mergeMap
    .mergeDeepWith((prev, next) => {
      return prev
    }, mergeMap1)
    ,
  mergeMap1,
)

console.log(`=====has, hasIn======`)
// has, hasIn return boolean whether key exists or not
// List
console.log(fromJS([1, 2, 3, { a: 123, b: 321 }]).has('0')) // true
console.log(fromJS([1, 2, 3, { a: 123, b: 321 }]).hasIn([3, 'b'])) // true

// Map
console.log(fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: 444 }).has('a')) // true
console.log(
  fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: 444 }).hasIn(['a', 'a3']),
) // true

console.log(`=====includes=====`)
// includes return boolean whether value exists or not
console.log(fromJS([6, 5, 4, 3, 2, 1, 89]).includes('89')) // false
console.log(fromJS([6, 5, 4, 3, 2, 1, '89']).contains('89')) // true
console.log(
  fromJS([6, 5, 4, 3, 2, 1, fromJS([6, 5, 4])]).contains(fromJS([6, 5, 4])),
) // true

// Map
console.log(
  fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: 89 }).includes('89'),
) // false
console.log(
  fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: '89' }).contains('89'),
) // true
console.log(
  fromJS({
    b: 2,
    a: { a1: 222, a3: 456 },
    c: 3,
    d: fromJS([6, 5, 4]),
  }).contains(fromJS([6, 5, 4])),
) // true

console.log(`=====reverse=====`)
// reverse: reverse Map or List and return new one
// List
console.log(
  fromJS([1, 2, 3, 4, 5, 6])
    .reverse()
    ,
)
// [6, 5, 4, 3, 2, 1]
// Map
console.log(
  fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: 5 })
    .reverse()
    ,
)
// {d: 5, c: 3, a: {a1: 222, a3: 456}, b: 2}

console.log(`=====sort, sortBy=====`)
// List
// sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
console.log(
  fromJS([6, 5, 4, 3, 2, 1])
    .sort()
    ,
) //[1, 2, 3, 4, 5, 6]
console.log(
  fromJS([1, 2, 3, 4, 5, 6])
    .sort((a, b) => {
      if (a < b) {
        return 1
      }
      if (a > b) {
        return -1
      }
      if (a === b) {
        return 0
      }
    })
    ,
) //[6, 5, 4, 3, 2, 1]
// sortBy
/*
    sortBy<C>(
    comparatorValueMapper: (value: T, key: number, iter: Iterable<number, T>) => C,
    comparator?: (valueA: C, valueB: C) => number
    ): Iterable<number, T>
*/
console.log(
  fromJS([
    { a: 1, b: { c: 22 } },
    { a: 2, b: { c: 22 } },
    { a: 1, b: { c: 22 } },
    { a: 3, b: { c: 22 } },
    { a: 10, b: { c: 22 } },
    { a: 9, b: { c: 22 } },
  ])
    .sortBy(
      (value, index, array) => {
        return value.get('a')
      },
      (a, b) => {
        if (a < b) {
          return -1
        }
        if (a > b) {
          return 1
        }
        if (a === b) {
          return 0
        }
      },
    )
    ,
)

// Map
console.log(
  fromJS({ b: 2, a: 88, c: 3, d: 5 })
    .sort()
    ,
) // {b: 2, c: 3, d: 5, a: 88}
console.log(
  fromJS({ b: 2, a: 88, c: 3, d: 5 })
    .sort((a, b) => {
      if (a < b) {
        return 1
      }
      if (a > b) {
        return -1
      }
      if (a === b) {
        return 0
      }
    })
    ,
) // {a: 88, d: 5, c: 3, b: 2}
// sortBy
/*
  sortBy<C>(
  comparatorValueMapper: (value: T, key: number, iter: Iterable<number, T>) => C,
  comparator?: (valueA: C, valueB: C) => number
  ): Iterable<number, T>
*/
console.log(
  fromJS({ b: { a: 2 }, a: { a: 88 }, c: { a: 3 }, d: { a: 5 } })
    .sortBy(
      (value, key, obj) => {
        return value.get('a')
      },
      (a, b) => {
        if (a < b) {
          return -1
        }
        if (a > b) {
          return 1
        }
        if (a === b) {
          return 0
        }
      },
    )
    ,
) // {b: {a: 2}, c: {a: 3}, d: {a: 5}, a: {a: 88}}

console.log(`=====flatten=====`)
// faltten: false for deep flatten, true for shallow flatten
// List
console.log(
  fromJS([1, 2, 3, 4, [1, 11, 111, 12344], { a: 1234, b: { bb: [777, 888] } }])
    .flatten()
    ,
)
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, 777, 888]
console.log(
  fromJS([1, 2, 3, 4, [1, 11, 111, 12344], { a: 1234, b: { bb: [777, 888] } }])
    .flatten(true)
    ,
)
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, Object]

// Map
console.log(
  fromJS({ a: [2, 1, 3], c: 3, d: 5 })
    .flatten()
    ,
)
// array index to key
// {0: 2, 1: 1, 2: 3, c: 3, d: 5}

console.log(
  fromJS({ b: 2, a: { a1: { a5: 333 }, a3: [1, 2, 3] }, c: 3, d: 5 })
    .flatten(true)
    ,
)
// {b: 2, a1: Object, a3: Array[3], c: 3, d: 5}

console.log(`=====concat=====`)
// List
const concatList = fromJS([1, 2, 3, 4, 5, 6]);
const concatList2 = fromJS([111, 222, 333, 444, 555, 666]);
console.log(concatList.concat(concatList)); //[1, 2, 3, 4, 5, 6, 111, 222, 333, 444, 555, 666]

// Map
const concatMap = fromJS({b: 2, a: {a1: {a5: 333}, a3: [1,2,3]}, c: 3, d: 5});
const concatMap2 = fromJS({b1: 22, b: 34});
console.log(concatMap.concat(concatMap2)); //{b: 34, a: Object, c: 3, d: 5, b1: 22}  Element b will be overwrote

const t1 = performance.now()
console.log(`perf time: ${t1-t0}milliseconds`)
