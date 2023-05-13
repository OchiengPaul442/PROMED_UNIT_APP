import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

const Table = props => {
  const {
    tableData,
    tableHead,
    BackgroundColor,
    HeaderBackgroundColor,
    BorderColor,
    HeaderTextColor,
    BorderWidth,
    tableDataColor,
  } = props;

  return (
    <View
      style={{
        borderWidth: BorderWidth,
        borderColor: BorderColor,
      }}>
      <View style={{backgroundColor: BackgroundColor, ...styles.container}}>
        <View
          style={{
            borderColor: BorderColor,
            backgroundColor: HeaderBackgroundColor,
            ...styles.tableRow,
          }}>
          {tableHead.map((item, index) => {
            return (
              <View key={index} style={styles.headercell}>
                <Text
                  style={{
                    color: HeaderTextColor,
                    ...styles.tableHeader,
                  }}>
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        {tableData.map((rowData, index) => {
          return (
            <View
              key={index}
              style={{
                borderTopWidth: BorderWidth,
                borderBottomWidth:
                  index === tableData.length - 1 ? 0 : BorderWidth,
                borderColor: BorderColor,
                ...styles.tableRow,
              }}>
              {rowData.map((cellData, cellIndex) => {
                return (
                  <View
                    key={cellIndex}
                    style={{
                      borderRightWidth:
                        cellIndex === rowData.length - 1 ? 0 : BorderWidth,
                      borderColor: BorderColor,
                      ...styles.datacell,
                    }}>
                    <Text style={{color: tableDataColor, ...styles.tableData}}>
                      {cellData}
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headercell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datacell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  tableHeader: {
    flex: 1,
  },
  tableData: {
    flex: 1,
  },
});
