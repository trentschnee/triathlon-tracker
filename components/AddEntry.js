import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import TriSlider from './Slider'
import TriStepper from './Steppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
// Create submit button that takes in onpress
function SubmitBtn({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}
export default class AddEntry extends Component {
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

        // TODO: update redux

        // Navigate to home
        // Save to DB

        // Clear local notification
    }
    reset = () => {
        const key = timeToString()
        // Update Redux
        // Route to Home
        // Update DB
    }
    render() {
       
        const metaInfo = getMetricMetaInfo();
        if (true) {
            return (
              <View >
                <Ionicons
                  name='ios-happy-outline'
                  size={100}
                />
                <Text>You already logged your information for today.</Text>
                <TextButton style={{padding: 10}} onPress={this.reset}>
                  Reset
                </TextButton>
              </View>
            )
          }
        return (<View>
            <DateHeader date={(new Date()).toLocaleDateString()} />
            {/* return array */}
            {Object.keys(metaInfo).map((key) => {
                // Grab properties from key
                const { getIcon, type, ...rest } = metaInfo[key]
                // Grab value from run
                const value = this.state[key]
                return (
                    <View key={key}>
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