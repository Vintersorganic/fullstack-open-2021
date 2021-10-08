

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case "GET_FILTER":
            return action.filter
        default: 
            return state;
    }
}

export const setFilter = filter => {
    return {
        type: "GET_FILTER",
        filter
    }
}
 
export default filterReducer
