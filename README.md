# awesome-diff

Diff strategy O(n).

## Usage

developement with `TypeScript`, so you need run the following script before start.

```
npm install
```

**Yarn**

```
yarn install
```

## Example

**see `/example` more**

```typescript
import { VdomNode, diff } from "../bld/diff";
import { parseOperations } from "../bld/patch";

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
```

### Example Print Result

**Patches**

These are the operations that need to be patched.

```javascript
[
    {
        "name": "move",
        "payload": {
            "targetIndex": -1,
            "originIndex": 1
        }
    },
    {
        "name": "add",
        "payload": {
            "targetIndex": 0,
            "targets": [
                {
                    "key": "i"
                }
            ]
        }
    },
    {
        "name": "move",
        "payload": {
            "targetIndex": 8,
            "originIndex": 5
        }
    },
    {
        "name": "move",
        "payload": {
            "targetIndex": 7,
            "originIndex": 5
        }
    },
    {
        "name": "move",
        "payload": {
            "targetIndex": 6,
            "originIndex": 5
        }
    },
    {
        "name": "remove",
        "payload": {
            "targetIndexes": [
                2,
                3,
                4
            ]
        }
    }
]
```

**patchResult**

```javascript
[ { key: 'b' },
  { key: 'i' },
  { key: 'h' },
  { key: 'g' },
  { key: 'f' },
  { key: 'e' } ]
```

## LICENCE
MIT
