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
  {key:'g'},
  {key:'f'},
  {key:'e'},
  {key:'c'},
  {key:'h'},
  {key:'d'},
  {key:'a'},
]

const patches = diff(layer1, layer2)

console.info(parseOperations(layer1, patches))
