import { VdomNode } from "./diff";

export type OPERATIONS = 'move' | 'add' | 'remove'

export interface MovePayload {
  originIndex:number;
  targetIndex:number
}

export interface AddPayload<T> {
  targetIndex:number,
  targets:T[]
}

export interface RemovePayload {
  targetIndexes:number[]
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

export function add<T = VdomNode>(operations:Operation<OPERATIONS, T>[], targetIndex:number, ...targets:T[]){
  let nodes = targets.filter(node => node)

  if(!nodes.length){
    return operations
  }

  return duplicatePush(operations, {name:'add', payload:{targetIndex, targets:[].concat(...targets)}})
}

export function remove(operations:Operation<OPERATIONS>[], ...targets:VdomNode[]){
  let indexes = targets.filter(node => node).map((_, index) => index)

  if(!indexes.length) {
    return operations
  }

  return duplicatePush(operations, {name:'remove', payload:{targetIndexes:[].concat(...indexes)}})
}

export function move(operations:Operation<OPERATIONS>[], originIndex:number, targetIndex:number){
  return duplicatePush(operations, {name:'move', payload:{targetIndex, originIndex}})
}
