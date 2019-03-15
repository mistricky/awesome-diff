import { Operation, OPERATIONS, move, add, remove } from "./operation";

export interface VdomNode {
  key:string,
}

export type VdomNodeLayer = VdomNode[]

export interface UpdateIndexTuple {
  isDone:boolean
  value:number
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
    // is add
    if(newStart <= newEnd){
      operations = add(operations, oldEnd, newVdom.slice(newStart, newEnd + 1))
    }

    // is remove
    if(oldStart <= oldEnd){
      operations = remove(operations, ...(oldVdom.slice(oldStart, oldEnd + 1)))
    }

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
  let hasNewStartNode = true;
  let hasNewEndNode = true

  // filter node that missing in oldVdom
  while(++cursor <= oldEnd){
    if(compareNode(oldVdom[cursor], newVdom[newStart])){
      hasNewStartNode = false
    }

    if(compareNode(oldVdom[cursor], newVdom[newEnd])){
      hasNewEndNode = false
    }
  }

  if(hasNewEndNode || hasNewStartNode){
    // parse traverse result
    if(hasNewEndNode){
      operations = add(operations, oldEnd, newVdom[newEnd])
      newEnd--;
    }

    if(hasNewStartNode){
      operations = add(operations, oldStart - 1, newVdom[newStart])
      newStart++;
    }

    return compare(oldStart, oldEnd, newStart, newEnd, oldVdom, newVdom, operations)
  }

  cursor = oldStart - 1
  while(++cursor <= oldEnd){
    // move node to start of layer
    if(compareNode(oldVdom[cursor], newVdom[newStart])){
      operations = move(operations, cursor, oldStart)
      oldVdom[cursor] = undefined
      newStart++;

      // is last element
      if(cursor === oldEnd){
        oldEnd--;
      }

      break;
    }

    // move node to end of layer
    if(compareNode(oldVdom[cursor], newVdom[newEnd])){
      operations = move(operations, cursor, oldEnd)
      oldVdom[cursor] = undefined
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
