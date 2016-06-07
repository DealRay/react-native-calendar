import React from 'react';
const styles = require('./styles')

import {
    PropTypes
} from 'react'

import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';

module.exports = React.createClass({

  propTypes: {
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    hasEvent: PropTypes.bool,
    caption: PropTypes.any,
    onPress: PropTypes.func,
    isWeekend: PropTypes.bool,
    filler: PropTypes.bool,
    customStyle: PropTypes.object,
  },

  getDefaultProps() {
    return {
      customStyle: {},
    }
  },

  _dayCircleStyle(isWeekend, isSelected, isToday) {
    var dayCircleStyle = [styles.dayCircleFiller, this.props.customStyle.dayCircleFiller]
    if (isSelected && !isToday) {
      dayCircleStyle.push(styles.selectedDayCircle)
      dayCircleStyle.push(this.props.customStyle.selectedDayCircle)
    } else if (isSelected && isToday) {
      dayCircleStyle.push(styles.currentDayCircle)
      dayCircleStyle.push(this.props.customStyle.currentDayCircle)
    }
    return dayCircleStyle
  },

  _dayTextStyle(isWeekend, isSelected, isToday) {
    var dayTextStyle = [styles.day, this.props.customStyle.day]
    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText)
      dayTextStyle.push(this.props.customStyle.currentDayText)
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText)
      dayTextStyle.push(this.props.customStyle.selectedDayText)
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText)
      dayTextStyle.push(this.props.customStyle.weekendDayText)
    }
    return dayTextStyle
  },

  render() {
    let {
      caption,
      isWeekend,
      isSelected,
      isToday,
      hasEvent,
      usingEvents,
      filler,
    } = this.props

    var dayTextStyle = null;
    var dayStyle = null;

    if (hasEvent) {
      dayTextStyle = {
        color: '#fff'
      };
      dayStyle = {
        backgroundColor: '#1cbbb6'
      }
    }

    if (filler) {
      return (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, this.props.customStyle.dayButtonFiller]}>
            <Text style={[styles.day, this.props.customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      )
    } else {

      return (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.dayButton, this.props.customStyle.dayButton, dayStyle]}>
              <Text style={this._dayTextStyle(isWeekend, isSelected, isToday), dayTextStyle}>{caption}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }
})
