import { VdomNode, diff } from "../src/diff";
import { parseOperations } from "../src/patch";

// mock data
export let layer1:VdomNode[] = [
  {key:'a'},
  {key:'b'},
  {key:'c'},
  {key:'d'},

]

export let layer2:VdomNode[] = [
  {key:'a'},
  {key:'d'},
  {key:'b'},
  {key:'c'},
]

const patches = diff(layer1,layer2)
const patchResult = parseOperations(layer1, patches)

console.info(patchResult)
