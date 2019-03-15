import { Operation, MovePayload, AddPayload, RemovePayload, OPERATIONS } from "./operation";
import { VdomNodeLayer, VdomNode } from "./diff";
import { insert, move, remove } from "./utils";

interface MoveMap {
  [index:string]:VdomNode[]
}

interface OperationHandler {
  [index:string]:(vdomNodeLayer:VdomNodeLayer, payload:MovePayload | AddPayload<VdomNode> | RemovePayload) => VdomNodeLayer
}

const OPERATION_HANDLER:OperationHandler = {
  move(vdomNodeLayer:VdomNodeLayer,payload:MovePayload) {
    const {originIndex, targetIndex} = payload
    let result= move(vdomNodeLayer, originIndex, targetIndex)
    console.info(payload)
    return result
  },
  add(vdomNodeLayer:VdomNodeLayer, payload:AddPayload<VdomNode>) {
    const {targetIndex, targets} = payload
    return insert(vdomNodeLayer, targetIndex, ...targets)
  },
  remove(vdomNodeLayer:VdomNodeLayer,payload:RemovePayload){
    const {targetIndexes} = payload
    return remove(vdomNodeLayer, ...targetIndexes)
  }
}

export function parseOperations(vdomNodeLayer:VdomNodeLayer, operations:Operation<OPERATIONS, VdomNode>[]){
  let result = vdomNodeLayer.slice()

  for(let operation of operations) {
    let handler = OPERATION_HANDLER[operation.name]

    result = handler(result, operation.payload)
  }

  return result
}
