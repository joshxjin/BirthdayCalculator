import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  Modal,
  TouchableHighlight,
} from "react-native";
import XDate from "xdate";
import { Calendar } from "react-native-calendars";

const monthsList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Separator = () => <SafeAreaView style={styles.separator} />;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endDate: new XDate.today(),
      selectedDate: null,
      showMonthsPicker: false,
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.onBirthdayChange = this.onBirthdayChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onHideModal = this.onHideModal.bind(this);
  }

  renderHeader(date) {
    const month = monthsList[date.getMonth()];
    const year = date.getFullYear();

    return (
      <Text
        style={{ fontWeight: "bold" }}
        onPress={() => this.setState({ showMonthsPicker: true })}
      >
        {month} {year}
      </Text>
    );
  }

  onBirthdayChange(date) {
    this.setState({
      selectedDate: XDate(date.year, date.month - 1, date.day),
    });
    console.log("birtday date: ", XDate(date.year, date.month - 1, date.day));
  }

  onEndDateChange(date) {
    const selectedDate = this.state.selectedDate;
    this.setState({
      endDate: XDate(date.year, date.month - 1, date.day),
    });
    console.log("end date: ", XDate(date.year, date.month - 1, date.day));
  }

  calcAge(date1, date2) {
    const years = Math.floor(date1.diffYears(date2));
    date1.addYears(years);
    const months = Math.floor(date1.diffMonths(date2));
    date1.addMonths(months);
    const days = Math.floor(date1.diffDays(date2));

    if (years < 0 || months < 0 || days < 0) {
      return "Time traveller";
    }

    return years + " years, " + months + " months, " + days + " days";
  }

  onHideModal() {
    this.setState({
      showMonthsPicker: !this.state.showMonthsPicker,
    });
  }

  render() {
    const { endDate, selectedDate, showMonthsPicker } = this.state;
    const birthday = selectedDate ? selectedDate : endDate;
    const age = this.calcAge(birthday, endDate);

    const markedSelectedDate = birthday.toString("yyyy-MM-dd");
    const markedEndDate = endDate.toString("yyyy-MM-dd");
    const markedDates = {};
    markedDates[markedSelectedDate] = {
      selected: true,
      selectedColor: "lightgreen",
    };
    markedDates[markedEndDate] = {
      selected: true,
      selectedColor: "lightblue",
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Birthday Calculator</Text>
        <Text style={{ textAlign: "center" }}>
          Short press for birthday, long press for end date.
        </Text>
        <Separator />

        <View>
          <Calendar
            markedDates={markedDates}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={XDate.today()}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={this.onBirthdayChange}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={this.onEndDateChange}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={1}
            // Show week numbers to the left. Default = false
            showWeekNumbers={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter.
            renderHeader={this.renderHeader}
            // Enable the option to swipe between months. Default = false
            enableSwipeMonths={true}
          />
          <Separator />
        </View>

        <View style={{ marginLeft: 5 }}>
          <Text>
            Birtday: {birthday.getDate()} {monthsList[birthday.getMonth()]}{" "}
            {birthday.getFullYear()}
          </Text>

          <Text>
            End Date: {endDate.getDate()} {monthsList[endDate.getMonth()]}{" "}
            {endDate.getFullYear()}
          </Text>

          <Text>Age: {age}</Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showMonthsPicker}
          onRequestClose={this.onHideModal}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <View style={modalStyles.modalMonthsRow}>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Jan</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Feb</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Mar</Text>
                </TouchableHighlight>
              </View>
              <View style={modalStyles.modalMonthsRow}>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Apr</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>May</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Jun</Text>
                </TouchableHighlight>
              </View>
              <View style={modalStyles.modalMonthsRow}>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Jul</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Aug</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Sep</Text>
                </TouchableHighlight>
              </View>
              <View style={modalStyles.modalMonthsRow}>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Oct</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Nov</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{
                    ...modalStyles.openButton,
                    backgroundColor: "#2196F3",
                  }}
                  onPress={this.onHideModal}
                >
                  <Text style={modalStyles.textStyle}>Dec</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

const stutusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight : 0;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: stutusBarHeight,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalMonthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default App;
