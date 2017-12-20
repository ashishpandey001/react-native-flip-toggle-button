/**
 * react-native-flip-toggle-button
 * A cross-platform customisable toggle button built upon react-native's TouchableOpacity and Animated APIs
 * https://github.com/ashishpandey001/react-native-flip-toggle-button
 * Email:hmaster0@gmail.com
 * @ashishpandey001
 */

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native';

import PropTypes from 'prop-types';

class FlipToggle extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    let labelStyle = {};
    if (!this.props.labelStyle.fontSize) {
      labelStyle = {
        ...this.props.labelStyle,
        fontSize: 0.1 * this.props.buttonWidth
      };
    } else {
      labelStyle = { ...this.props.labelStyle };
    }
    this.state = {
      isOn: this.props.isOn,
      onLabel: this.props.onLabel,
      offLabel: this.props.offLabel,
      offsetX: new Animated.Value(0),
      initialDirection: this.props.isOn ? { right: 0 } : { left: 0 },
      buttonOnColor: this.props.buttonOnColor,
      buttonOffColor: this.props.buttonOffColor,
      sliderOnColor: this.props.sliderOnColor,
      sliderOffColor: this.props.sliderOffColor,
      dimensions: {},
      labelStyle: labelStyle
    };
    this.calculateDimensions();
  }

  static propTypes = {
    isOn: PropTypes.bool,
    onLabel: PropTypes.string,
    offLabel: PropTypes.string,
    buttonOnColor: PropTypes.string,
    buttonOffColor: PropTypes.string,
    sliderOnColor: PropTypes.string,
    sliderOffColor: PropTypes.string,
    buttonWidth: PropTypes.number.isRequired,
    buttonHeight: PropTypes.number.isRequired,
    buttonRadius: PropTypes.number,
    sliderWidth: PropTypes.number,
    sliderHeight: PropTypes.number,
    sliderRadius: PropTypes.number,
    margin: PropTypes.number,
    labelStyle: PropTypes.object,
    changeToggleStateOnLongPress: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    onToggleLongPress: PropTypes.func
  };

  static defaultProps = {
    isOn: false,
    disabled: false,
    buttonOnColor: '#000',
    buttonOffColor: '#000',
    sliderOnColor: '#dba628',
    sliderOffColor: '#dba628',
    labelStyle: {},
    buttonRadius: 0,
    sliderRadius: 0,
    labelStyle: {
      color: 'white'
    },
    changeToggleStateOnLongPress: true
  };

  calculateDimensions = () => {
    let sliderWidth = 0,
      sliderHeight = 0,
      sliderRadius = 0,
      margin = 0;
    if (!this.props.sliderWidth && !this.props.sliderHeight) {
      sliderWidth = sliderHeight = 0.9 * this.props.buttonHeight;
    } else if (!this.props.sliderHeight) {
      sliderWidth = this.props.sliderWidth;
      sliderHeight = 0.9 * this.props.buttonHeight;
    } else {
      sliderWidth = this.props.sliderWidth;
      sliderHeight = this.props.sliderHeight;
    }
    if (this.props.buttonRadius && !this.props.sliderRadius) {
      sliderRadius = this.props.buttonRadius;
    } else {
      sliderRadius = this.props.sliderRadius;
    }
    if (!this.props.margin) {
      margin = parseInt(0.02 * this.props.buttonWidth);
    }
    let dimensions = {
      buttonWidth: this.props.buttonWidth,
      buttonHeight: this.props.buttonHeight,
      buttonRadius: parseInt(
        this.props.buttonRadius / 100 * this.props.buttonWidth
      ),
      sliderWidth: sliderWidth,
      sliderHeight: sliderHeight,
      sliderRadius: parseInt(sliderRadius / 100 * sliderWidth),
      margin: margin,
      translateX: 2 * parseInt(margin) + sliderWidth
    };
    this.state.dimensions = dimensions;
  };

  toggleCommon = () => {
    if (this.props.isOn)
      toValue = this.state.isOn
        ? -this.state.dimensions.buttonWidth + this.state.dimensions.translateX
        : 0;
    else
      toValue = this.state.isOn
        ? 0
        : this.state.dimensions.buttonWidth - this.state.dimensions.translateX;
    Animated.timing(this.state.offsetX, {
      toValue: toValue,
      duration: 300
    }).start();
    let newState = !this.state.isOn;
    this.setState({
      ...this.state,
      isOn: newState
    });
    return newState;
  };

  onTogglePress = () => {
    const newState = this.toggleCommon();
    this.props.onToggle(newState);
  };

  onToggleLongPress = () => {
    let newState = this.state.isOn;
    if (this.props.changeToggleStateOnLongPress) {
      newState = this.toggleCommon();
    }
    this.props.onToggleLongPress(newState);
  };

  setBackgroundColor = component => {
    if (this.props.disabled) {
      let key = `${component}Disabled`;
      let { [key]: data } = styles;
      return data.backgroundColor;
    } else if (this.state.isOn) {
      let key = `${component}OnColor`;
      let { [key]: data } = this.props;
      return data;
    } else {
      let key = `${component}OffColor`;
      let { [key]: data } = this.props;
      return data;
    }
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          disabled={this.props.disabled}
          style={{
            justifyContent: 'center',
            borderRadius: this.state.dimensions.buttonRadius,
            height: this.state.dimensions.buttonHeight,
            width: this.state.dimensions.buttonWidth,
            backgroundColor: this.setBackgroundColor('button')
          }}
          activeOpacity={1}
          onPress={this.onTogglePress}
          onLongPress={this.onToggleLongPress}
        >
          {this.props.onLabel || this.props.offLabel ? (
            <Text style={[{ alignSelf: 'center' }, this.state.labelStyle]}>
              {this.state.isOn ? this.state.onLabel : this.state.offLabel}
            </Text>
          ) : null}
          <Animated.View
            style={{
              margin: this.state.dimensions.margin,
              transform: [{ translateX: this.state.offsetX }],
              position: 'absolute',
              ...this.state.initialDirection,
              width: this.state.dimensions.sliderWidth,
              height: this.state.dimensions.sliderHeight,
              borderRadius: this.state.dimensions.sliderRadius,
              backgroundColor: this.setBackgroundColor('slider')
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default FlipToggle;

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#666'
  },
  sliderDisabled: {
    backgroundColor: '#444'
  }
};
