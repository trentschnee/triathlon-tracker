import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'
function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_ENTRIES:
            return {
                // we want state exactly the way it is, but we also want to merge action.entries on the object.
                ...state,
                ...action.entries
            }
        case ADD_ENTRY:
            // we want to return the exact same state, but we want to take action.entry and merge it with the state.
            return {
                ...state,
                ...action.entry
            }
        default:
            return state

    }
}
export default entries