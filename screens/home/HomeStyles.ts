import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatButton: {
    backgroundColor: 'orange',
    borderRadius: 100,
    width: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 5,
  },
  loginContainer: {
    width: width / 4,
    borderRadius: 4,
    marginLeft: 10,
    justifyContent: 'space-between',
    backgroundColor: 'orange',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    borderColor: 'orange',
    paddingLeft: 5,
    height: 40,
  },
  lockContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    height: '100%',
    paddingHorizontal: 3,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
});
