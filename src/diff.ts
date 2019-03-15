import { Operation, OPERATIONS } from "./operation";

export interface VdomNode {
  key:string,
}

export type VdomNodeLayer = VdomNode[]

export interface UpdateIndexTuple {
  isDone:boolean
  value:number
}

interface Indexes {
  oldStart:number,
  newStart:number,
  oldEnd:number,
  newEnd:number
}

export function diff(oldVdom:VdomNodeLayer, newVdom:VdomNodeLayer){
  let oldStart= 0,
      oldEnd= oldVdom.length - 1,
      newStart= 0,
      newEnd= newVdom.length - 1

  return compare(oldStart, oldEnd, newStart, newEnd, [...oldVdom], newVdom, [])
}

export function compare(
  oldStart:number,
  oldEnd:number,
  newStart:number,
  newEnd:number,
  oldVdom:VdomNodeLayer,
  newVdom:VdomNodeLayer,
  operations:Operation<OPERATIONS>[]
){
  if(oldStart > oldEnd || newStart > newEnd){
    return operations
  }

  // compare start and end
  if(compareNode(oldVdom[oldStart], newVdom[newStart])){
    oldStart++;
    newStart++;
    return compare(oldStart, oldEnd, newStart, newEnd, oldVdom, newVdom, operations)
  }

  if(compareNode(oldVdom[oldEnd], newVdom[newEnd])){
    oldEnd--;
    newEnd--;
    return compare(oldStart, oldEnd, newStart, newEnd, oldVdom, newVdom, operations)
  }

  let cursor = oldStart - 1
  let targetIndex = 0
  let target:VdomNode
  let hasNewStartNode = true;
  let hasNewEndNode = true

  // filter node that missing in oldVdom
  while(++cursor <= oldEnd){
    if(compareNode(oldVdom[cursor], newVdom[newStart])){
      hasNewStartNode = false
      target = oldVdom[cursor]
    }

    if(compareNode(oldVdom[cursor], newVdom[newEnd])){
      hasNewEndNode = false
      target = oldVdom[cursor]
    }
  }

  // parse traverse result
  if(hasNewEndNode){
    operations.push({name:'add', payload:{targetIndex:targetIndex, target}})
    newEnd--;
  }

  if(hasNewStartNode){
    operations.push({name:'add', payload:{targetIndex:targetIndex, target}})
    newStart++;
  }

  cursor = oldStart - 1
  while(++cursor <= oldEnd){
    // move node to start of layer
    if(compareNode(oldVdom[cursor], newVdom[newStart])){
      hasNewStartNode = false
      target = oldVdom[cursor]
      operations.push({name:'move',payload:{originIndex:cursor,targetIndex:oldStart}})
      targetIndex = oldStart;
      newStart++;

      // is last element
      if(cursor === oldEnd){
        oldEnd--;
      }

      break;
    }

    // move node to end of layer
    if(compareNode(oldVdom[cursor], newVdom[newEnd])){
      hasNewEndNode = false
      target = oldVdom[cursor]
      operations.push({name:'move',payload:{originIndex:cursor,targetIndex:oldEnd}})
      targetIndex = oldEnd;//asd
      newEnd--;

      // is start element
      if(cursor === oldStart){
        oldStart++;
      }

      break;
    }
  }

  return compare(oldStart, oldEnd, newStart, newEnd, oldVdom, newVdom, operations)
}

function compareNode(oldVdom:VdomNode, newVdom:VdomNode){
  return oldVdom && newVdom && oldVdom.key === newVdom.key
}
