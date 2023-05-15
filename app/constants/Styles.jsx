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

  text3: {
    fontSize: SIZES.small,
    color: COLORS.white,
  },

  text4: {
    fontSize: SIZES.small,
    color: COLORS.red,
  },

  // FORM ELEMENT STYLES  //
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
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
    color: COLORS.black,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  rightChat: {
    alignSelf: 'flex-end',
    backgroundColor: '#e0f0e0',
    color: COLORS.black,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    maxWidth: '80%',
  },
  timestamp: {
    fontSize: 10,
    color: '#999',
  },

  // AUTH FORM STYLES //
  // Styles for the form section within the main container
  form: {
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingBottom: 10,
    paddingTop: 12,
    paddingHorizontal: 10,
  },

  // form text
  formText: {
    fontSize: 18,
    color: COLORS.darkGray,
    textAlign: 'left',
    marginBottom: 50,
  },

  // Styles for a group of related form elements
  group: {
    width: '100%',
    height: 50,
    position: 'relative',
    marginBottom: 40,
  },

  // Styles for a form input field
  input: {
    position: 'relative',
    bottom: 10,
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    fontSize: 18,
    color: COLORS.black,
    padding: 10,
  },

  // Styles for a label associated with a form input field
  label: {
    position: 'relative',
    left: 0,
    fontSize: 18,
    color: COLORS.primary,
    paddingHorizontal: 5,
  },

  // Styles for a button or link to recover a forgotten password
  recButton: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

  // Styles for a separator element used to visually divide sections of the form
  separatorWrapper: {
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the separator line within the separator element
  separator: {
    width: '30%',
    height: 1,
    backgroundColor: COLORS.primary,
  },

  // Styles for text within the separator element
  separatorText: {
    color: COLORS.primary,
    fontSize: 18,
    paddingHorizontal: 10,
  },

  error: {
    width: '100%',
    height: 'auto',
    color: COLORS.red,
    position: 'relative',
    top: -9,
  },

  icon: {
    position: 'absolute',
    right: 10,
    top: 35,
    zIndex: 100,
  },

  // LOADING STYLE //
  lottie: {
    width: 150,
    height: 150,
  },

  // BOTTOM MENU BAR STYLES //
  menuBar: {
    position: 'absolute',
    bottom: 3,
    marginHorizontal: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
