import React, { Component } from 'react'
import { View, } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import Slider from './Slider'
import Steppers from './Steppers'
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
    render() {
        const metaInfo = getMetricMetaInfo()
        return (<View>
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
                            ? <Slider
                                value={value}
                                onChange={(value) => this.slide(key, value)}
                                {...rest}
                            />
                            // If type = stepper, this render the stepper. Pass it the value,onIncrement, and onDecrement
                            : <Steppers
                                value={value}
                                onIncrement={() => this.increment(key)}
                                onDecrement={() => this.decrement(key)}
                                {...rest}
                            />}
                    </View>
                )
            })}
        </View>)
    }
}