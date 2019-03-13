
export type OPERATIONS = 'move' | 'replace' | 'add' | 'remove'

export interface MovePayload {
  originIndex:number;
  targetIndex:number
}

export interface ReplaceAddPayload<T> {
  targetIndex:number,
  target:T
}

export interface RemovePayload {
  targetIndex:number
}

export interface Operation<T extends OPERATIONS, ReplaceTarget = unknown> {
  name:T;
  payload:T extends 'move' ? MovePayload : T extends 'replace' | 'add' ? ReplaceAddPayload<ReplaceTarget> : RemovePayload
}
