import React, { Component } from 'react'

export default class Airdrop extends Component {
    // Airdrop to have a timer that counts down
    // Initialize the countdown after our customers have staked a certain amount... 50
    // Timer functationality , countdown, startTimer, state - for time to work..

    constructor(){
        super();
        this.state = {
            time :{},
            seconds:20 
        };
        this.timer = 0;
        this.startTime = this.startTime.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs) {
        let hours, minutes, seconds
        hours = Math.floor(secs / (60 * 60))

        let divisor_for_minutes = secs % (60 * 60)
        minutes = Math.floor(divisor_for_minutes / 60)

        let divisor_for_seconds = divisor_for_minutes % 60
        seconds = Math.ceil(divisor_for_seconds)

        let obj = {
            'h':hours,
            'm':minutes,
            's':seconds
        }
        return obj;
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
