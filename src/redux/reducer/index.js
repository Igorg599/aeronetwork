  
const initialState = {
    items: null,
    title: null
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
            return {
                ...state,
                items: readyArr,
                title: action.payload.file.title
            };
        
        default:
            return state;
    }
};

export default data;