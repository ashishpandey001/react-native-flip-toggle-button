/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import FlipToggle from 'react-native-flip-toggle-button';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSwitch1On: false,
      isSwitch2On: false,
      isSwitch3On: false,
      isSwitch4On: false,
      isSwitch5On: false,
      isSwitch6On: false,
      isSwitch7On: true,
    };
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.item}>
            <Text>Regular toggle button</Text>
            <FlipToggle
              value={this.state.isSwitch1On}
              buttonWidth={50}
              buttonHeight={25}
              onToggle={(value) => {
                this.setState({ isSwitch1On: value });
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>Rounded toggle button</Text>
            <FlipToggle
              value={this.state.isSwitch2On}
              buttonWidth={50}
              buttonHeight={25}
              buttonRadius={50}
              onToggle={(value) => {
                this.setState({ isSwitch2On: value });
              }}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>Wide toggle button</Text>
            <FlipToggle
              value={this.state.isSwitch3On}
              buttonWidth={400}
              buttonHeight={25}
              onToggle={(value) => {
                this.setState({ isSwitch3On: value });
              }}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>
              Rounded Wide toggle button which doesn't change state on long press
            </Text>
            <FlipToggle
              value={this.state.isSwitch4On}
              buttonWidth={150}
              buttonHeight={25}
              buttonRadius={50}
              onLabel={'yay!'}
              offLabel={'nay!'}
              onToggle={(value) => {
                this.setState({ isSwitch4On: value });
              }}
              changeToggleStateOnLongPress={false}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>
              Toggle button with custom dimensions for toggle button and slider
            </Text>
            <FlipToggle
              value={this.state.isSwitch5On}
              buttonWidth={200}
              buttonHeight={50}
              sliderWidth={20}
              sliderHeight={30}
              buttonOffColor={'#666'}
              sliderOffColor={'#fff'}
              onToggle={(value) => {
                this.setState({ isSwitch5On: value });
              }}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>
              Toggle button with custom on and off labels, on and off button and
              slider colors
            </Text>
            <FlipToggle
              value={this.state.isSwitch6On}
              buttonWidth={200}
              buttonHeight={25}
              buttonRadius={50}
              buttonOffColor={'#666'}
              sliderOffColor={'#000'}
              buttonOnColor={'blue'}
              sliderOnColor={'red'}
              onLabel={'on'}
              offLabel={'off'}
              onToggle={(value) => {
                this.setState({ isSwitch6On: value });
              }}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
          <View style={styles.item}>
            <Text>
              Big Fat toggle button that is by default turned on and disabled, has custom colors even when disabled
            </Text>
            <FlipToggle
              value={this.state.isSwitch7On}
              disabled={true}
              buttonWidth={400}
              buttonHeight={150}
              buttonRadius={50}
              onLabel={'on'}
              offLabel={'off'}
              disabledButtonOnColor={'#3ad'}
              disabledSliderOnColor={'#a25'}
              labelStyle={{ fontSize: 62, color: 'green' }}
              onToggle={(value) => {
                this.setState({ isSwitch7On: value });
              }}
              onToggleLongPress={() => {
                console.log('Long Press');
              }}
            />
          </View>
        </View>
        </SafeAreaView>
      </Fragment>
    );
  }

  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
