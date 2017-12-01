/**
 * react-native-flip-toggle-button
 * A cross-platform customisable toggle button built upon react-native's TouchableOpacity and Animated APIs
 * https://github.com/ashishpandey001/react-native-flip-toggle-button
 * Email:hmaster0@gmail.com
 * @ashishpandey001
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Easing
} from 'react-native';

import PropTypes from 'prop-types';

class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
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
      labelStyle: this.props.labelStyle
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
    onToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    isOn: false,
    buttonOnColor: '#000',
    buttonOffColor: '#000',
    sliderOnColor: '#dba628',
    sliderOffColor: '#dba628',
    labelStyle: {},
    buttonRadius: 0,
    sliderRadius: 0,
    labelStyle: {
      color: 'white',
      fontSize: 16
    }
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

  onTogglePress = () => {
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
    this.props.onToggle(newState);
  };

  render() {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            borderRadius: this.state.dimensions.buttonRadius,
            height: this.state.dimensions.buttonHeight,
            width: this.state.dimensions.buttonWidth,
            backgroundColor: this.state.isOn
              ? this.props.buttonOnColor
              : this.props.buttonOffColor
          }}
          activeOpacity={1}
          onPress={this.onTogglePress}
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
              backgroundColor: this.state.isOn
                ? this.props.sliderOnColor
                : this.props.sliderOffColor
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ToggleSwitch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
