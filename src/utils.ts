import { Operation, MovePayload, RemovePayload, ReplaceAddPayload } from "./operation";

export type Payloads<T> = MovePayload | RemovePayload | ReplaceAddPayload<T>

export interface Group<T> {
  [index:string]:Payloads<T>[]
}

export function groupByOperation(originArr:Operation[]):Group<unknown> {
  return originArr.reduce((total:Group<unknown>, val:Operation) => {
    total[val.name] = (total[val.name] || []).concat(val.payload)

    return total
  }, {})
}

// insert method of array
export function insert<T>(arr:T[],index:number, item:T[] ):T[]{
  let duplicate = arr.slice()

  duplicate.splice(index + 1, 0, ...item)

  return duplicate
}
