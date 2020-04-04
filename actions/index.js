export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export function receiveEntries(entries){
    // return an action with RECIEVE ENTRIES and pass entries
return {
type: RECEIVE_ENTRIES,
entries
}
}
export function addEntry(entry){
    // return action with type add entry and pass entries
    return {
        type: ADD_ENTRY,
        entry
    }
}