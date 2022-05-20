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
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
var RNFS = require('react-native-fs');

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
  const [info, setInfo] = useState(false);
  console.disableYellowBox = true;

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
  const afterInfoToUser = () => {
    setInfo(true);
  };
  const getRiskAppList = async item => {
    await item.filter(res => {
      console.log(res.appName);
      if (res.appName === 'Teen Patti Lucky') {
        return res.appName;
      }
    });
  };
  const riskOrNot = () => {
    if (!getRiskAppList(data)) {
      afterInfoToUser();
    }
  };

  //opening setting
  // const openSetting = () => {
  //   Linking.openSettings();
  // };

  const renderItem = ({item}) => (
    <View>
      <Text style={{fontSize: 20}}>{item.appName}</Text>
    </View>
  );
  //detail alert
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
                {!status
                  ? 'Click Here To Close the details'
                  : 'Click here to see high-risk app '}
              </Text>
            </TouchableOpacity>
            {!status ? (
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
              Give permission to show high-risk third-party apps
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: '3%',
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
                // onPress={() => handleClick()}>
                onPress={() => Linking.openSettings()}>
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
      {!info ? (
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
                list of high-risk app in your mobile
              </Text>
              {status ? (
                <View>
                  <FlatList
                    style={{margin: 10, height: 260}}
                    data={data}
                    keyExtractor={item => item.id}
                    numColumns={3}
                    renderItem={({item}) =>
                      item.appName === 'Teen Patti Lucky' ? (
                        <View
                          style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}>
                          <Image
                            style={styles.icon}
                            source={{
                              uri: `data:image/png;base64, ${item.icon}`,
                            }}
                          />
                          <Text
                            style={{marginLeft: 5, fontSize: 17, width: 80}}>
                            {item.appName}
                          </Text>
                          {/* <Text>{item.icon}</Text> */}
                        </View>
                      ) : (
                        riskOrNot()
                      )
                    }
                  />
                  <View>
                    <Button title="Okay" onPress={() => afterInfoToUser()} />
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
      ) : null}
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
