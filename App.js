import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new moment(),
      selectedDate: new moment(),
    };
    this.onDateChange = this.onDateChange.bind(this);
  }

  onDateChange(date) {
    this.setState({
      selectedDate: date,
    });
  }

  calcAge(date1, date2) {
    const temp_date1 = new moment(date1);
    const diffDuration = moment.duration(date2.diff(date1));
    const years = diffDuration.years();
    const months = diffDuration.months();
    const days = diffDuration.days();

    return years + " years, " + months + " months, " + days + " days";
  }

  render() {
    const { today, selectedDate } = this.state;
    const birthday = selectedDate ? selectedDate : today;
    const age = this.calcAge(birthday, today);
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Birthday Calculator</Text>

        <CalendarPicker
          onDateChange={this.onDateChange}
          maxDate={moment().add(0, "days").startOf("day")}
          style={calendarStyles.calendar}
        />

        <SafeAreaView>
          <Text>Today: {today.toString()}</Text>
          <Text>SELECTED DATE: {birthday.toString()}</Text>
          <Text>Difference: {age}</Text>
        </SafeAreaView>
      </SafeAreaView>
    );
  }
}

const stutusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: stutusBarHeight,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
});

const calendarStyles = StyleSheet.create({
  calendar: {
    margin: 50,
  },
});
