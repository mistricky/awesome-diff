import {layerGenerator} from './layer-generator.js'

const PARSER_MAP = {
    'add': addParser,
    'remove': removeParser,
    'move': moveParser
}

const sleep = duration => new Promise(resolve => setTimeout(() => resolve(), duration))
const styles = document.styleSheets[0]
const deferUpdateQueue = []

async function moveParser({targetIndex, originIndex}, layerDom){
    const dom = layerDom.childNodes[originIndex]
    let offset =  Math.abs((originIndex - targetIndex)) * 130;

    if(offset > 0){
        offset -= 130;
    }

    console.info(`${originIndex > targetIndex ? '-' : ''}${offset}px`)
    
    styles.insertRule(`
        @keyframes move {
            from {
                transform: translate(0px);
            }
            to {
                transform: translate(${originIndex > targetIndex ? '-' : ''}${offset}px);
            }                
        }
    `, 0)
    
    dom.style.animation = 'move 0.8s 1';

    await sleep(1000)
    styles.removeRule(0)

    deferUpdateQueue.push(() => layerDom.insertBefore(dom, layerDom.childNodes[targetIndex + 1]))
}

async function addParser({targetIndex, targets}, layerDom){
    for(const ele of targets){
        await sleep(1000)

        const dom = layerGenerator(ele)

        dom.classList.add('display')

        layerDom.insertBefore(dom, layerDom.childNodes[targetIndex + 1])
    }

    await sleep(300)
}

async function removeParser({targetIndexes}, layerDom){
    await sleep(300)

    for(const index of targetIndexes){        
        const dom = layerDom.childNodes[index]

        dom.classList.add('disappear')

        await sleep(1000)
        await layerDom.removeChild(dom)
    }
}

async function dispatch(name, payload, layerDom){
    await PARSER_MAP[name](payload, layerDom)
}

export async function browserParser(options, layerDom){
    for(const {name, payload} of options){
        await dispatch(name, payload, layerDom)
    }   

    for(const task of deferUpdateQueue){
        task()
    }
}