import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'orange',
    borderRadius: 5,
    marginVertical: 20,
    height: 200,
    justifyContent: 'space-between',
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
  likes: { marginRight: 10 },
  date: {
    alignItems: 'flex-end',
    width: '100%',
    marginBottom: 10,
  },
});
