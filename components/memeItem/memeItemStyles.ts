import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'space-between',
    backgroundColor: 'orange',
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bottomLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  likes: { marginRight: 10, color: 'white' },
  date: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 10,
  },
});
