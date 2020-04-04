import {AsyncStorage} from 'react-native';
import {CALANDER_STORAGE_KEY} from './_calendar'

export function submitEntry({entry, key}){
    // Take the entry and add it to the database using mergeItem
    return AsyncStorage.mergeItem(CALANDER_STORAGE_KEY, JSON.stringify({[key]:entry,}))

}
export function removeEntry(key){
    return AsyncStorage.getItem(CALANDER_STORAGE_KEY).then(
        (results)=>{
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALANDER_STORAGE_KEY,JSON.stringify(data))
        }
    )

}