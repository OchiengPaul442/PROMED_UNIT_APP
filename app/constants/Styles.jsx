import {StyleSheet} from 'react-native';
import {COLORS, SIZES} from './';

// General styles for all screens
export default Style = StyleSheet.create({
  // This is the main container that holds all the components
  Container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  // This is the Container that holds the main content
  Content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  Screen_headings: {
    fontSize: SIZES.large,
    color: COLORS.white,
  },

  // This is the body header title
  heading: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },

  heading2: {
    fontSize: SIZES.large,
    color: COLORS.primary,
  },

  // This is for all titles
  title: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },

  title2: {fontSize: SIZES.medium, color: COLORS.black},

  //   This is for the all body texts
  text: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },

  text2: {
    fontSize: SIZES.small,
    color: COLORS.primary,
  },

  // FORM ELEMENT STYLES //
  Qlabel: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    paddingHorizontal: 5,
    paddingBottom: 5,
  },

  // Styles for a group of related form elements
  Qgroup: {
    width: '100%',
    height: 70,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 40,
  },

  // Styles for a form input field
  Qinput: {
    position: 'relative',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
    fontSize: 13,
    padding: 5,
    color: COLORS.black,
  },

  // CHAT FORM ELEMENT STYLES //
  chats: {
    position: 'relative',
    width: '100%',
    height: '92%',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
  },

  inputfield_con: {
    position: 'relative',
    width: '100%',
    height: 50,
    paddingHorizontal: 28,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputfield: {
    width: '100%',
    height: 45,
    position: 'relative',
    padding: 10,
    backgroundColor: COLORS.darkGray,
    borderRadius: 10,
  },

  leftChat: {
    color: COLORS.white,
    width: 'auto',
    height: 'auto',
    textAlign: 'left',
    padding: 15,
    marginBottom: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: COLORS.cyan,
  },

  rightChat: {
    color: COLORS.white,
    width: 'auto',
    height: 'auto',
    textAlign: 'right',
    padding: 15,
    marginBottom: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: COLORS.tertiary,
  },
});
