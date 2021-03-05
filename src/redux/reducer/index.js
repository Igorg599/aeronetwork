  
const initialState = {
    items: null,
    title: null,
    positionX: 0,
    positionY: 0,
    positionZ: 0
};

const data = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DATA':
            const readyArr = []
            const splitArr = action.payload.file.nodes.map(item => Object.assign({}, item, { point: {x: item.point.x/100, y: item.point.y/100, z: item.point.z/10}}))
            splitArr.forEach(item => {
                const newItem = item
                const a = item.linkedNodes
                a.forEach(item => {
                    const tieArr = splitArr.filter(n => n.id === item)
                    tieArr.push(newItem)
                    readyArr.push(tieArr)
                })
            })   
            let maxX = readyArr[0][0].point.x;
            let minX = readyArr[0][0].point.x;
            let maxY = readyArr[0][0].point.y;
            let minY = readyArr[0][0].point.y;
            let maxZ = readyArr[0][0].point.z;
            let minZ = readyArr[0][0].point.z;
            readyArr.forEach((item) => {
                if (item[0].point.x > maxX) {
                    maxX = item[0].point.x
                }
                if (item[0].point.x < minX) {
                    minX = item[0].point.x
                }
                if (item[0].point.y > maxY) {
                    maxY = item[0].point.y
                }
                if (item[0].point.y < minY) {
                    minY = item[0].point.y
                }
                if (item[0].point.z > maxZ) {
                    maxZ = item[0].point.z
                }
                if (item[0].point.z < minZ) {
                    minZ = item[0].point.z
                }
            });     
            return {
                ...state,
                items: readyArr,
                title: action.payload.file.title,
                positionX: (maxX + minX) / 2,
                positionY: (maxY + minY) / 2,
                positionZ: (maxZ + minZ) / 2
            };
        
        default:
            return state;
    }
};

export default data;

