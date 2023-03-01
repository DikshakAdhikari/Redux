const redux= require('redux')

const createStore= redux.legacy_createStore
const bindActionCreators= redux.bindActionCreators
const combineReducers = redux.combineReducers


const CAKE_ORDERED= 'CAKE_ORDERED'
const CAKE_RESTOKED= 'CAKE_RESTOKED'
const ICECREAM_ORDERED= 'ICECREAM_ORDERED'
const ICECREAM_RESTOCKED= 'ICECREAM_RESTOCKED'


function orderCake(){
return {
    type: CAKE_ORDERED,
    payload : 1
}
}



function restockCake( qty=1){
    return {
        type:CAKE_RESTOKED,
        payload: qty
    }
}


function orderIceCream(qty=1){
    return{
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream(qty=1){
    return{ 
        type:ICECREAM_RESTOCKED,
    payload: qty
}
}


// const initialState= {
//     numOfCakes:10,
//     numOfIceCreams:20
// }


const initialCakeState= {
    numOfCakes: 10
}

const initialIceCreamState= {
    numOfIceCreams: 20
}



const cakeReducer= (state= initialCakeState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state, 
                numOfCakes: state.numOfCakes - 1
            }
        case CAKE_RESTOKED:
            return{
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
           
    
               default:
                return state
    }
}




const iceCreamReducer= (state= initialIceCreamState, action) => {
    switch(action.type){

    case ICECREAM_ORDERED:
            return {
                ...state, 
                numOfIceCreams: state.numOfIceCreams - 1
            }
        case ICECREAM_RESTOCKED:
            return{
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
            default:
                return state
    }
}


const rootReducer= combineReducers({        //combining both reducers
    cake: cakeReducer, //key:value
    iceCream: iceCreamReducer
})

const store= createStore(rootReducer)
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(()=> console.log('update state ', store.getState()))


const actions= bindActionCreators({ orderCake, restockCake ,orderIceCream, restockIceCream}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)
actions.orderIceCream()
actions.orderIceCream()
actions.restockIceCream(2)

unsubscribe()


/*Output
Initial state { numOfCakes: 10, numOfIceCreams: 20 }
update state  { numOfCakes: 9, numOfIceCreams: 20 }
update state  { numOfCakes: 8, numOfIceCreams: 20 }
update state  { numOfCakes: 7, numOfIceCreams: 20 }
update state  { numOfCakes: 10, numOfIceCreams: 20 }
update state  { numOfCakes: 10, numOfIceCreams: 19 }
update state  { numOfCakes: 10, numOfIceCreams: 18 }
update state  { numOfCakes: 10, numOfIceCreams: 20 }
*/