/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import RNInstalledApplication from 'react-native-installed-application';
// import base64 from 'react-native-base64';
import XLSX from 'xlsx';
import {writeFile, readFile} from 'react-native-fs';

import {
  SafeAreaView,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  Button,
  Linking,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(true);
  console.disableYellowBox = true;
  var RNFS = require('react-native-fs');

  const getApplication = () => {
    setStatus(!status);
    RNInstalledApplication.getNonSystemApps()
      .then(apps => {
        setData(apps);
      })
      .catch(error => {
        console.log(error);
      });
  };
  // let appData = AppInstalledChecker.getAppList();

  const allowStatus = () => {
    setStart(false);
  };
  var dataFile = [
    {name: 'John', city: 'Seattle'},
    {name: 'Mike', city: 'Los Angeles'},
    {name: 'Zach', city: 'New York'},
  ];
  var ws = XLSX.utils.json_to_sheet(dataFile);

  var wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Prova');

  const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  var RNFS = require('react-native-fs');
  var file = RNFS.ExternalStorageDirectoryPath + '/test.xlsx';
  writeFile(file, wbout, 'ascii')
    .then(r => {
      /* :) */
    })
    .catch(e => {
      /* :( */
    });
  //opening setting
  const openSetting = () => {
    Linking.openSettings();
  };
  // const exportDataToExcel = () => {
  //   // Created Sample data
  //   let sample_data_to_export = [
  //     {id: '1', name: 'First User'},
  //     {id: '2', name: 'Second User'},
  //   ];

  //   let wb = XLSX.utils.book_new();
  //   let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
  //   XLSX.utils.book_append_sheet(wb, ws, 'Users');
  //   const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

  //   // Write generated excel to Storage
  //   RNFS.writeFile(
  //     RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx',
  //     wbout,
  //     'ascii',
  //   )
  //     .then(r => {
  //       console.log('Success');
  //     })
  //     .catch(e => {
  //       console.log('Error', e);
  //     });
  // };

  // const handleClick = async () => {
  //   try {
  //     // Check for Permission (check if permission is already given or not)
  //     let isPermitedExternalStorage = await PermissionsAndroid.check(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //     );

  //     if (!isPermitedExternalStorage) {
  //       // Ask for permission
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //         {
  //           title: 'Storage permission needed',
  //           buttonNeutral: 'Ask Me Later',
  //           buttonNegative: 'Cancel',
  //           buttonPositive: 'OK',
  //         },
  //       );

  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         // Permission Granted (calling our exportDataToExcel function)
  //         exportDataToExcel();
  //         console.log('Permission granted');
  //       } else {
  //         // Permission denied
  //         console.log('Permission denied');
  //       }
  //     } else {
  //       // Already have Permission (calling our exportDataToExcel function)
  //       exportDataToExcel();
  //     }
  //   } catch (e) {
  //     console.log('Error while checking permission');
  //     console.log(e);
  //     return;
  //   }
  // };
  //text

  const renderItem = ({item}) => (
    <View>
      <Text style={{fontSize: 20}}>{item.appName}</Text>
    </View>
  );
  //detail alert
  console.log(data);
  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, marginTop: '50%', marginBottom: '3%'}}>
            WELCOME TO
          </Text>
          <Image source={require('./scr/1519856141177.jpg')} />
        </View>
        {show ? (
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{marginTop: '50%'}}>
              <Text style={{fontSize: 20}} onPress={() => getApplication()}>
                {status ? 'Close the details' : 'For Developer Details'}
              </Text>
            </TouchableOpacity>
            {status ? (
              <View>
                <FlatList
                  data={data}
                  keyExtractor={item => item.id}
                  renderItem={renderItem}
                />
              </View>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
      <Modal animationType="none" transparent={true} visible={start}>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: '#00000090',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              height: 150,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
            }}>
            <Text style={{fontSize: 20, fontFamily: 'Montserrat-SemiBold'}}>
              permission to allow access to fetch data for security purposes
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ADD8E6',
                  width: '49%',
                  alignItems: 'center',
                  margin: '5%',
                }}
                onPress={() => {
                  allowStatus(), getApplication(), setShow(true);
                }}>
                <Text
                  style={{
                    fontSize: 30,
                  }}>
                  YES
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ADD8E6',
                  width: '49%',
                  margin: '5%',
                  alignItems: 'center',
                }}
                // onPress={() => handleClick}>
                onPress={() => BackHandler.exitApp()}>
                <Text
                  style={{
                    fontSize: 30,
                  }}>
                  NO
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal animationType="none" transparent={true} visible={show}>
        <View
          style={{
            justifyContent: 'flex-end',
            backgroundColor: '#00000090',
            flex: 1,
          }}>
          <View
            style={{
              width: '100%',
              height: 400,
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              padding: 20,
            }}>
            <Text style={{fontSize: 20, fontFamily: 'Montserrat-SemiBold'}}>
              {/* You have installed high risking application in your device, we
              will record your movement for safety reasons */}
              This are high risking app's
            </Text>
            {status ? (
              <View>
                <FlatList
                  style={{margin: 10, height: 280}}
                  data={data}
                  keyExtractor={item => item.id}
                  numColumns={3}
                  renderItem={({item}) => (
                    // {console.log(item.icon)}
                    <View
                      style={{flexDirection: 'column', alignItems: 'center'}}>
                      <Image
                        style={styles.icon}
                        source={{
                          uri: `data:image/png;base64, ${item.icon}`,
                        }}
                      />
                      <Text style={{marginLeft: 5, fontSize: 17, width: 80}}>
                        {item.appName}
                      </Text>
                      {/* <Text>{item.icon}</Text> */}
                    </View>
                  )}
                />
                <View>
                  <Button title="Unistall" onPress={() => openSetting()} />
                </View>
              </View>
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '5%',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#ADD8E6',
                  width: '49%',
                  alignItems: 'center',
                  margin: '5%',
                  // marginTop: '10%',
                  height: 40,
                  position: 'absolute',
                }}
                onPress={() => {
                  setShow(false);
                }}>
                <Text
                  style={{
                    fontSize: 30,
                  }}>
                  PROCEED
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  icon: {width: 80, height: 80, resizeMode: 'cover', marginLeft: 20},
});

export default App;
