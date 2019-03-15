import { Operation, MovePayload } from "./operation";
import { VdomNodeLayer, VdomNode } from "./diff";
import { groupByOperation, insert } from "./utils";

interface MoveMap {
  [index:string]:VdomNode[]
}

const OPERATION_HANDLER = {
  move:(vdomNodeLayer:VdomNodeLayer,payloads:MovePayload[]) => {
    let layer = vdomNodeLayer.slice()
    const MOVE_MAP:MoveMap = {}

    for(let payload of payloads){
      let {targetIndex, originIndex} = payload

      MOVE_MAP[targetIndex] = (MOVE_MAP[targetIndex] || []).concat(layer[originIndex])
      layer[originIndex] = undefined
    }

    let indexes = Object.keys(MOVE_MAP).sort((pre, next) => +next - +pre)
    for(let index of indexes){
      layer = insert(layer, +index, MOVE_MAP[index].reverse())
    }

    return layer.filter(node => node)
  }
}

export function parseOperations(vdomNodeLayer:VdomNodeLayer,operations:Operation[]){
  let layer = vdomNodeLayer.slice()
  const operationGroup = groupByOperation(operations)
  let result:VdomNodeLayer

  for(let operation of Object.keys(operationGroup)) {
    let handler = OPERATION_HANDLER[operation]

    result = handler(layer, operationGroup[operation])
  }

  return result
}
