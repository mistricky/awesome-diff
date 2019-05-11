
const chars = 'abcdefghijklmnopqrstuvwxyz';
const COLOR_MAP = {}

const colorGenerator = () => {
    const metaColor = '0123456789abcdef'
    let targetColor = []

    for(let i = 0;i < 6;i++){
        targetColor.push(metaColor[Math.floor(Math.random() * 16)])
    }

    return `#${targetColor.sort(() => (Math.random() - 0.5)).join('')}`
}


for(const char of chars){
    COLOR_MAP[char] = colorGenerator()
}

export const layerGenerator = ({key}) => {
    const dom = document.createElement('div')
    let color = COLOR_MAP[key]

    if(!key){
        color = "#000"
    }

    dom.setAttribute('data-key', key)
    dom.style.background =  color
    
    return dom;
}