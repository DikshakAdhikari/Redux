const redux= require('redux')

const createStore= redux.legacy_createStore


const CAKE_ORDERED= 'CAKE_ORDERED'

//an action is an object with a 'type'  property
//An action creater is the function that returns an object
function orderCake(){
return {
    type: CAKE_ORDERED,
    quantity: 1
}
}

const initialState= {
    numOfCakes:10,
    // anotherProperty:0
}

//(previousState , action) => newState

const reducer= (state= initialState, action) => {
    switch(action.type){
        case CAKE_ORDERED:
            return {
                ...state, //we are basically asking  a reducer function to first make a copy of state object and then only update the numOfCakes property. i.e. other properties inside the state remains unchanged
                numOfCakes: state.numOfCakes - 1
            }
            default:
                return state
    }
}

const store= createStore(reducer)
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(()=> console.log('update state ', store.getState()))


store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())


unsubscribe()