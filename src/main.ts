import { VdomNode, diff } from "./diff";
import { parseOperations } from "./patch";

// mock data
let layer1:VdomNode[] = [
  {key:'a'},
  {key:'b'},
  {key:'c'},
  {key:'d'},
  {key:'e'},
  {key:'f'},
  {key:'g'},
  {key:'h'},
]

let layer2:VdomNode[] = [
  {key:'b'},
  {key:'i'},
  {key:'h'},
  {key:'g'},
  {key:'f'},
  {key:'e'},
]

const patches = diff(layer1,layer2)
const patchResult = parseOperations(layer1, patches)
