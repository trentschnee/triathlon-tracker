import React from 'react'
import {View, Slider,Text} from 'react-native'
export default function TriSlider({max,unit,step,value,onChange}){
    return(<View>
        <Slider
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
        />
    </View>)
}