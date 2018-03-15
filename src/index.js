import { is, fromJS, toJS, Map, List, Record, Seq } from 'immutable'

console.log(`=====Map=====`)
// Map: Creates a new Immutable Map
console.log(Map({ x: '123' })) // {"x" : "123"}
console.log(Map([['x', '123'], ['y', '234']])) // {"x" : "123", "y", "234"}

console.log(`=====List=====`)
// List: Create a new immutable List containing the values of the provided collection-like
const plainArray = [1, 2, 3, 4]
const listFromPlainArray = List(plainArray)
console.log(listFromPlainArray) // List [ 1, 2, 3, 4 ]

console.log(`=====of=====`)
// of: give values to List and Map. Map will sort based-on number
console.log(Map.of('x', 'three', 'bx', 'dthree', 2, 'two', 1, 'list-of-one'))
console.log(List.of(1, 2, 3, 4))

console.log(`=====fromJS=====`)
// fromJS: transfer js list to List and object to Map
const fromJSList = fromJS([10, 20, 30])
const fromJSObject = fromJS({ a: '1', b: '2', c: '3' })
console.log(fromJSList)
console.log(fromJSObject)

console.log(`=====toJS=====`)
// toJS: transfer immutable.js data structure to native js data structure
const toJSList = fromJSList.toJS()
const toJSObject = fromJSObject.toJS()
console.log(toJSList)
console.log(toJSObject)

console.log(`=====is=====`)
// is: Value equality check with semantics similar to Object.is, but treats Immutable Collections as values.
//     equal if the second Collection includes equivalent values.
const fromJSList1 = fromJS([10, 20, 30])
const fromJSList2 = fromJS([10, 20, 30])
console.log(`Value comparison: ${is(fromJSList1, fromJSList2)}`) // true

const generalList1 = [10, 20, 30]
const generalList2 = [10, 20, 30]
console.log(`reference comparison: ${generalList1 === generalList2}`) // false

console.log(`=====set=====`)
// Set: set values to Map and List
// It will Set first element
const setObj = Map({ a: { a: 34 }, b: 2, c: 3, d: 444 })
console.log(`Set Object: ${setObj.set('a', 0)}`)
// { "a": 0, "b": 2, "c": 3, "d": 444 }
console.log(`Set Object: ${setObj.set('e', 99)}`)
// { "a": [object Object], "b": 2, "c": 3, "d": 444, "e": 99 }

const setList = List([1, 2, 3])
console.log(setList.set(-1, 0)) // [1, 2, 0]  set the last element
console.log(setList.set(4, 0)) // [ 1, 2, 3, undefined, 0 ]  empty element will be undefined

console.log(`=====setIn=====`)
// SetIn(keyPath, value): Returns a new Map having set value at this keyPath.
// If any keys in keyPath do not exist, a new immutable Map will be created at that key.
console.log(fromJS({ a: 45, b: 64, c: { a: 21 } }).setIn(['c', 'a'], 1000))
// { "a": 45, "b": 64, "c": Map { "a": 1000 } }

console.log(`=====get=====`)
// get(key: number, notSetValue?: T)
// List
const getList = fromJS([1111111, 22222, { a: 888123 }])
console.log(getList.get(0)) // 1111111
console.log(getList.get(11, 'no have value')) // no have value
// getIn
console.log(getList.getIn(['2', 'a'], 'child no have value')) // 888123
console.log(getList.getIn(['2', 'b'], 'child no have value')) // child no have value

// Map
const getMap = fromJS({ a: { a1: 222 }, b: 2, c: 3, d: 444 })
console.log(getMap.get('a'))
console.log(getMap.get('v', 'no have value'))
// getIn
console.log(getMap.getIn(['a', 'a1'], 'child no have value'))
console.log(getMap.getIn(['d', 'b1'], 'child no have value'))

console.log(`=====map, filter, every, some=====`)
//1. map()
console.log(
  fromJS([1, 2, 3, 4, 5]).map((value, index, array) => {
    return value * 2
  }), // [2, 4, 6, 8, 10]
)

//2. filter()
console.log(
  fromJS([1, 2, 3, 4, 5]).filter((value, index, array) => {
    return value % 2 === 0
  }), // [2, 4]
)

//3. reduce()
console.log(
  fromJS([1, 2, 3, 4, 5]).reduce(
    (accumulater, currentValue) => accumulater + currentValue,
  ), // 15
)

//4. every()
console.log(
  fromJS([1, 2, 3, 4, 5]).every((value, index, array) => {
    return value > 2
  }),
) // false

//5. some()
console.log(
  fromJS([1, 2, 3, 4, 5]).some((value, index, array) => {
    return value > 2
  }),
) // true

console.log(`=====record=====`)
// record: A record is similar to a JS object, but enforces a specific set of allowed string keys, and has default values.
const ABRecord = Record({ a: 1, b: 2 })
const myRecord = new ABRecord({ b: 3 })

console.log(myRecord) // 2
console.log(myRecord.get('a')) // 1
console.log(myRecord.get('b')) // 3
const myRecordWithoutB = myRecord.remove('b')
console.log(myRecordWithoutB.get('b')) // 2
console.log(myRecordWithoutB) // { a: 1, b: 2 }

// Values provided to the constructor not found in the Record type will be ignored.
const myRecord2 = new ABRecord({ b: 3, x: 10 })
console.log(myRecord2.get('x')) // undefined

console.log(`=====merge, mergeDeep, mergeWith, mergeDeepWith=====`)
// List
const mergeList = fromJS([1, 2, 3, 7, { a: { b: 55, c: 66 } }])
const mergeList1 = fromJS([1, 2, 3, 6, { a: { b: 333, d: 67 } }])

// shallow merge
console.log(mergeList.merge(mergeList1))
// [1, 2, 3, 6, { a: {b: 333, d: 67}]

// deep merge
console.log(mergeList.mergeDeep(mergeList1))
// [1, 2, 3, 6, {b: 333, c: 66, d: 67}]

// define merge rules
console.log(
  mergeList.mergeWith((prev, next) => {
    return prev
  }, mergeList1),
  mergeList1,
)
// define mergeDeep rules
console.log(
  mergeList.mergeDeepWith((prev, next) => {
    return prev
  }, mergeList1),
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
  mergeMap.mergeWith((prev, next) => {
    return prev
  }, mergeMap1),
  mergeMap1,
)
// deep merge rules
console.log(
  mergeMap.mergeDeepWith((prev, next) => {
    return prev
  }, mergeMap1),
  mergeMap1,
)

console.log(`=====withMutations=====`)
// withMutations(mutator: (mutable: this) => any): this

// Performance Issue
const pushList = List([1, 2, 3])
const ImmutableList = pushList
  .push(4)
  .push(5)
  .push(6) // create 3 new useless List
console.log(ImmutableList, pushList) // [1, 2, 3, 4, 5, 6]

/**
 * Note: Not all methods can be safely used on a mutable collection or within withMutations! 
 * These common methods can return general List/Map
 * Map: set(), merge()
 * List: push(), pop(), shift(), unshift()
 */

// List
const pushMutationList = List([1, 2, 3])
const pushImmutationList = pushMutationList.withMutations(a =>
  a
    .push(4)
    .push(5)
    .push(6),
) // only create the last List
console.log(pushImmutationList, pushMutationList) // 6

console.log(`=====clear=====`)
// clear: return a new List with 0 size and no values
console.log(List([1, 2, 3, 4]).clear())

console.log(`=====size=====`)
// size: size of Map and List
console.log(`size of Map: ${Map({ key: 'value2', key1: 'value1' }).size}`) // 2
console.log(`size of List: ${List([1, 2, 3, 4]).size}`) // 4

console.log(`=====count, countBy=====`)
// count: return the size of collection
// countBy: Returns a Seq.Keyed of counts, grouped by the return value of the grouper function.
console.log(`count: ${fromJS({ key: 'value2', key1: 'value1' }).count()}`) // 2
console.log(
  `count: ${fromJS({ key: 1, key1: 34 }).count((value, key, obj) => {
    return value > 3
  })}`,
) // 1
console.dir(
  `countBy: ${fromJS({ key: 1, key1: 34 }).countBy((value, key, obj) => {
    return value > 3
  })}`,
) // {false: 1, true: 1}
console.log(
  `countBy: ${fromJS([1, 2, 5, 6]).countBy((value, index, array) => {
    return value > 3
  })}`,
) // {false: 2, true: 2}

console.log(fromJS([1, 2, 3, { a: 45, b: 64 }]).setIn(['3', 'a'], 1000)) // [1, 2, 3, { "a": 1000, "b": 64}]

console.log(`=====pop=====`)
// pop, push, shift, unshift
// ImmutableJS：return a new List
const ImmuListTest = List([1, 2, 3, 4])
console.log(ImmuListTest.pop(), ImmuListTest)
// Normal list method
const normalListTest = [1, 2, 3, 4]
console.log(normalListTest.pop(), normalListTest)

console.log(`=====delete=====`)
// delete(key): just the same way as set
console.log(fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 }).delete('c'))
console.log(fromJS([1, 2, 3]).delete(1))

console.log(`=====deleteIn=====`)
// deleteIn(keyPath): just the same way as setIn
console.log(
  `deleteIn: ${fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 }).deleteIn([
    'a',
    'a1',
  ])}`,
)

console.log(`=====update=====`)
// update(key: K, notSetValue: V, updater: (value: V) => V): this
// update(key: K, updater: (value: V) => V): this

const updateList = fromJS([1, 2, 3])
console.log(
  updateList.update(2, value => {
    return value * 2
  }),
  updateList,
)

console.log(
  updateList.update(6, 1, value => {
    return value * 2
  }),
  updateList,
)

const updateMap = fromJS({ a: { a1: 34 }, b: 2, c: 3, d: 444 })
console.log(
  updateMap.update('a', value => {
    return value * 2
  }),
  updateMap,
)

console.log(
  updateMap.update('e', 1, value => {
    return value * 2
  }),
  updateMap,
)

console.log(`=====find=====`)
// find()
// List
console.log(
  fromJS([1, 2, 56, { a: { b: 111 } }]).find((value, index, array) => {
    return index === 3
  }),
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

console.log(`=====findEntry=====`)
// findEntry: return key:value || undefined
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

console.log(`=====mapKeys, mayEntries=====`)
// mapKeys():
console.log(
  fromJS({ a: 5, b: 2, c: 3, d: 444 }).mapKeys(key => {
    return key + 'hhh'
  }),
)
// {ahhh: 5, bhhh: 2, chhh: 3, dhhh: 444}

//mapEntries()
console.log(
  fromJS({ a: 5, b: 2, c: 3, d: 444 }).mapEntries(([key, value]) => {
    return [key + 'aaa', value + 'hhhh']
  }),
) //   {aaaa: "5hhhh", baaa: "2hhhh", caaa: "3hhhh", daaa: "444hhhh"}

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
console.log(fromJS([1, 2, 3, 4, 5, 6]).reverse())
// [6, 5, 4, 3, 2, 1]
// Map
console.log(fromJS({ b: 2, a: { a1: 222, a3: 456 }, c: 3, d: 5 }).reverse())
// {d: 5, c: 3, a: {a1: 222, a3: 456}, b: 2}

console.log(`=====sort, sortBy=====`)
// List
// sort(comparator?: (valueA: V, valueB: V) => number): Iterable<K, V>
console.log(fromJS([6, 5, 4, 3, 2, 1]).sort()) //[1, 2, 3, 4, 5, 6]
console.log(
  fromJS([1, 2, 3, 4, 5, 6]).sort((a, b) => {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
    if (a === b) {
      return 0
    }
  }),
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
  ]).sortBy(
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
  ),
)

// Map
console.log(fromJS({ b: 2, a: 88, c: 3, d: 5 }).sort()) // {b: 2, c: 3, d: 5, a: 88}
console.log(
  fromJS({ b: 2, a: 88, c: 3, d: 5 }).sort((a, b) => {
    if (a < b) {
      return 1
    }
    if (a > b) {
      return -1
    }
    if (a === b) {
      return 0
    }
  }),
) // {a: 88, d: 5, c: 3, b: 2}
// sortBy
/*
  sortBy<C>(
  comparatorValueMapper: (value: T, key: number, iter: Iterable<number, T>) => C,
  comparator?: (valueA: C, valueB: C) => number
  ): Iterable<number, T>
*/
console.log(
  fromJS({ b: { a: 2 }, a: { a: 88 }, c: { a: 3 }, d: { a: 5 } }).sortBy(
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
  ),
) // {b: {a: 2}, c: {a: 3}, d: {a: 5}, a: {a: 88}}

console.log(`=====flatten=====`)
// faltten: false for deep flatten, true for shallow flatten
// List
console.log(
  fromJS([
    1,
    2,
    3,
    4,
    [1, 11, 111, 12344],
    { a: 1234, b: { bb: [777, 888] } },
  ]).flatten(),
)
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, 777, 888]
console.log(
  fromJS([
    1,
    2,
    3,
    4,
    [1, 11, 111, 12344],
    { a: 1234, b: { bb: [777, 888] } },
  ]).flatten(true),
)
// [1, 2, 3, 4, 1, 11, 111, 12344, 1234, Object]

// Map
console.log(fromJS({ a: [2, 1, 3], c: 3, d: 5 }).flatten())
// array index to key
// {0: 2, 1: 1, 2: 3, c: 3, d: 5}

console.log(
  fromJS({ b: 2, a: { a1: { a5: 333 }, a3: [1, 2, 3] }, c: 3, d: 5 }).flatten(
    true,
  ),
)
// {b: 2, a1: Object, a3: Array[3], c: 3, d: 5}

console.log(`=====concat=====`)
// List
const concatList = fromJS([1, 2, 3, 4, 5, 6])
console.log(concatList.concat(concatList)) //[1, 2, 3, 4, 5, 6, 111, 222, 333, 444, 555, 666]

// Map
const concatMap = fromJS({
  b: 2,
  a: { a1: { a5: 333 }, a3: [1, 2, 3] },
  c: 3,
  d: 5,
})
const concatMap2 = fromJS({ b1: 22, b: 34 })
console.log(concatMap.concat(concatMap2)) //{b: 34, a: Object, c: 3, d: 5, b1: 22}  Element b will be overwrote

console.log(`=====Seq=====`)
// Seq describes a lazy operation, allowing them to efficiently chain use of all the higher-order collection methods
// (such as map and filter) by not creating intermediate collections.
const seqObject = Seq({ 1: 'abc', 2: 'def', 5: 'qwt' })
const seqList = Seq([1, 2, 3])
  .map(x => x * x)
  .toArray()
const oddSquares = Seq([1, 2, 3, 4, 5, 6, 7, 8])
  .filter(x => x % 2 !== 0)
  .map(x => x * x)
  .get(3)

console.log(seqObject)
console.log(seqList)
console.log(oddSquares)
