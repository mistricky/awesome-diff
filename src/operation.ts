
export type OPERATIONS = 'move' | 'add' | 'remove'

export interface MovePayload {
  originIndex:number;
  targetIndex:number
}

export interface AddPayload<T> {
  targetIndex:number,
  target:T
}

export interface RemovePayload {
  targetIndex:number
}

export interface Operation<T extends OPERATIONS = OPERATIONS, AddTarget = unknown> {
  name:T;
  payload:T extends 'move' ? MovePayload : T extends 'replace' | 'add' ? AddPayload<AddTarget> : RemovePayload
}

function duplicatePush(operations:Operation<OPERATIONS>[], operation:Operation){
  let duplicate = operations.slice()
  duplicate.push(operation)

  return duplicate
}

export function add<T>(operations:Operation<OPERATIONS, T>[], targetIndex:number, target:T){
  return duplicatePush(operations, {name:'add', payload:{targetIndex, target}})
}

export function remove(operations:Operation<OPERATIONS>[], targetIndex:number){
  return duplicatePush(operations, {name:'remove', payload:{targetIndex}})
}

export function move(operations:Operation<OPERATIONS>[], originIndex:number, targetIndex:number){
  return duplicatePush(operations, {name:'remove', payload:{targetIndex, originIndex}})
}
