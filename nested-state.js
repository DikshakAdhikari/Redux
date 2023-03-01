const redux= require('redux')
const produce= require('immer').produce //npm install immer

const initialState= {
    name: 'Dikshak',
    address: {
        street: 'Urban Bnglr St',
        city: 'Bangalore',
        state:'Karnataka'
    }
}

const STREET_UPDATED= 'STREET_UPDATED'
const updateStreet= (street) => {
    return {
        type: STREET_UPDATED,
        payload:street
    }
}

const reducer= (state= initialState, action) => {
    switch(action.type){

    case STREET_UPDATED:
            // return {
            //     ...state, 
            //     address: {
            //         ...state.address,
            //         street: action.payload
            //     },
            // }

            return produce(state, (draft)=> {
                draft.address.street = action.payload
            })
            default:
                return state
    }
}

const store= redux.legacy_createStore(reducer)
console.log('Initial state', store.getState());

const unsubscribe = store.subscribe(()=> console.log('Updated state ', store.getState()))

store.dispatch(updateStreet('Haldwani St'))

unsubscribe()
