import { Operation, MovePayload, RemovePayload, AddPayload } from "./operation";
import { VdomNodeLayer } from "./diff";

export type Payloads<T> = MovePayload | RemovePayload | AddPayload<T>

export interface Group<T> {
  [index:string]:Payloads<T>[]
}

export function groupByOperation(originArr:Operation[]):Group<unknown> {
  return originArr.reduce((total:Group<unknown>, val:Operation) => {
    total[val.name] = (total[val.name] || []).concat(val.payload)

    return total
  }, {})
}

export function filterUndefined<T>(layer:T[]):T[]{
  return layer.filter((node, index) => (index === 0 && node) || node)
}

// insert method of array
export function insert<T>(arr:T[], index:number, ...item:T[]):T[]{
  let duplicate = arr.slice()

  duplicate.splice(index + 1, 0, ...item)

  return duplicate
}

export function move<T>(arr:T[], originIndex:number, targetIndex:number){
  let duplicate = arr.slice()

  duplicate[originIndex] = undefined
  duplicate = insert(duplicate, targetIndex, arr[originIndex])

  return filterUndefined(duplicate)
}

export function remove<T>(arr:T[], ...indexes: number[]) {
  let duplicate = arr.slice()

  for(let index of indexes){
    duplicate[index] = undefined
  }

  return filterUndefined(duplicate)
}
