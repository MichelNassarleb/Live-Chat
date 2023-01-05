import { Dimensions, StyleSheet } from 'react-native';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: 'orange',
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
  },
  Image: {
    position: 'absolute',
    height,
    width,
  },
  input: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    color: 'orange',
    height: 50,
  },
  button: {
    backgroundColor: 'orange',
    width: '90%',
    marginTop: 35,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  inputsConatiner: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  footerContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
