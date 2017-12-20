import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FlipToggle from 'react-native-flip-toggle-button';

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.item}>
          <Text>Regular toggle button</Text>
          <FlipToggle
            buttonWidth={50}
            buttonHeight={25}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>Rounded toggle button</Text>
          <FlipToggle
            buttonWidth={50}
            buttonHeight={25}
            buttonRadius={50}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>Wide toggle button</Text>
          <FlipToggle
            buttonWidth={400}
            buttonHeight={25}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>Rounded Wide toggle button</Text>
          <FlipToggle
            buttonWidth={150}
            buttonHeight={25}
            buttonRadius={50}
            onLabel={'yay!'}
            offLabel={'nay!'}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>
            Toggle button with custom dimensions for toggle button and slider
          </Text>
          <FlipToggle
            buttonWidth={200}
            buttonHeight={50}
            sliderWidth={20}
            sliderHeight={30}
            buttonOffColor={'#666'}
            sliderOffColor={'#fff'}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>
            Toggle button with custom on and off labels, on and off button and
            slider colors
          </Text>
          <FlipToggle
            buttonWidth={200}
            buttonHeight={25}
            buttonRadius={50}
            buttonOffColor={'#666'}
            sliderOffColor={'#000'}
            buttonOnColor={'blue'}
            sliderOnColor={'red'}
            onLabel={'on'}
            offLabel={'off'}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
        <View style={styles.item}>
          <Text>Big Fat toggle button</Text>
          <FlipToggle
            buttonWidth={400}
            buttonHeight={150}
            buttonRadius={50}
            onLabel={'on'}
            offLabel={'off'}
            labelStyle={{ fontSize: 62, color: 'green' }}
            onToggle={() => {
              console.log();
            }}
          />
        </View>
      </View>
    );
  }
}

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
