const redux= require('redux')

const createStore= redux.legacy_createStore
const bindActionCreators= redux.bindActionCreators


const CAKE_ORDERED= 'CAKE_ORDERED'
const CAKE_RESTOKED= 'CAKE_RESTOKED'


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

const initialState= {
    numOfCakes:10,
    
}



const reducer= (state= initialState, action) => {
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

const store= createStore(reducer)
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(()=> console.log('update state ', store.getState()))


// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(orderCake())
// store.dispatch(restockCake(3))

const actions= bindActionCreators({ orderCake, restockCake}, store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)

unsubscribe()