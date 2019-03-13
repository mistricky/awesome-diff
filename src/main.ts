import { VdomNode, diff } from "./diff";

interface Content {
  key:string,
  body:string
}

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

const patch = diff(layer1, layer2)

console.info(patch)
