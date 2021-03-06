import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import TriSlider from './Slider'
import TriStepper from './Steppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions'
import { getDailyReminderValue } from '../utils/helpers'
import { white, purple } from '../utils/colors'
// Create submit button that takes in onpress
function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress} style={Platform.os === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component {
    // need to make three different methods to modify inputs

    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    // increment method for our rune, bike, and swim methods. 

    increment = (metric) => {
        // When we invoke this method, we are going to pass the metric, get the max the metric could be, and how much we should increment by. 
        const { max, step } = getMetricMetaInfo(metric);
        //  Then call setState to update our local component state.
        this.setState((state) => {
            const count = state[metric] + step
            // return a new object
            return {
                // The object set with setState is going to be merged in with the current state. (Go ahead and keep all state properties, but whatever that metric is we want to update it. )
                // If the metric is bigger than the max, we don't want it to go above that . But if it's not bigger, it will go with the original count.
                ...state,
                [metric]: count > max ? max : count
            }
        })

    }
    decrement = (metric) => {
        //  Then call setState to update our local component state.
        const { step } = getMetricMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })

    }
    //This method will handle the sleep and eat metrics. It will take in the metric and new value
    slide = (metric, value) => {
        // The new metric is going to have a value of what the slide is
        this.setState(() => ({
            [metric]: value
        }))
    }
    submit = () => {
        // Grab key for specific day
        const key = timeToString()
        // Grab everything from state
        const entry = this.state
        // Reset state back to 0
        this.setState(() => ({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        }))
        this.props.dispatch(addEntry(
            {
                [key]: entry
            }
        ))
        // TODO: update redux

        // Navigate to home
        submitEntry({ key, entry })
        // Clear local notification
    }
    reset = () => {
        const key = timeToString()
        this.props.dispatch(addEntry(
            {
                [key]: getDailyReminderValue()
            }
        ))
        // Route to Home
        removeEntry(key)
    }
    render() {

        const metaInfo = getMetricMetaInfo();
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center} >
                    <Ionicons
                        name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'}
                        size={100}
                    />
                    <Text>You already logged your information for today.</Text>
                    <TextButton style={{ padding: 10 }} style={{padding:10}} onPress={this.reset}>
                        Reset
                </TextButton>
                </View>
            )
        }
        return (<View style={styles.container}>
            <DateHeader date={(new Date()).toLocaleDateString()} />
            {/* return array */}
            {Object.keys(metaInfo).map((key) => {
                // Grab properties from key
                const { getIcon, type, ...rest } = metaInfo[key]
                // Grab value from run
                const value = this.state[key]
                return (
                    <View key={key} style={styles.row}>
                        {getIcon()}

                        {
                            // If type = slider, then render slider. Pass it the value and onChange function
                            type === 'slider'
                                ? <TriSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                // If type = stepper, this render the stepper. Pass it the value,onIncrement, and onDecrement
                                : <TriStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                    </View>
                )
            })}
            <SubmitBtn onPress={this.submit} />
        </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    center:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight : 30,
        marginLeft: 30
    }
})
function mapStateToProps(state) {
    const key = timeToString()

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}
// Export the invocation of connect and the result of that we will pass addEntry. It will then have access to addDispatch
export default connect(mapStateToProps)(AddEntry)