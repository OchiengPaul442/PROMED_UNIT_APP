// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

import React from 'react';

//-------------------------------------------------------------------------//
// GENERAL FUNCTIONS
//-------------------------------------------------------------------------//
// fetch User Appointments
export async function fetchUserAppointments() {
  // get current user data
  const currentUser = auth().currentUser;

  // count the number of Appointments the user has
  const count = await firestore()
    .collection('Appointments')
    .where('userId', '==', currentUser.uid)
    .get();

  // return the number of sessions
  return count.size;
}

// function to fetch total number of discussion boards the user is a member of
export async function fetchUserDiscussionBoards() {
  // get current user data
  const currentUser = auth().currentUser;

  // loop through all the discussion boards and find out how many groups the current user is in
  const count = await firestore()
    .collection('Groups')
    .where('Number_of_Members', 'array-contains', currentUser.uid)
    .get();

  // return the number of discussion boards
  return count.size;
}

// use async-await to handle promises
export async function getUserData(setUserData, setError, user) {
  const userDocRef = firestore().collection('Users').doc(user.uid);

  try {
    // get display name and photo url from auth using onAuthStateChanged() method
    auth().onAuthStateChanged(user => {
      if (user) {
        const {displayName, photoURL} = user;

        // get user data from firestore using onSnapshot() method
        userDocRef.onSnapshot(documentSnapshot => {
          // check if document exists
          // set userData state
          setUserData({
            ...documentSnapshot.data(),
            displayName,
            photoURL,
          });
        });
      }
    });
  } catch (error) {
    // set error status and message
    setError(error.message);
  }
}

//-------------------------------------------------------------------------//
// MENTAL HEALTH TIP FUNCTIONS
//-------------------------------------------------------------------------//
// fetch Daily Mental Health Tips
export async function fetchDailyMentalHealthTips(setLoading) {
  // set loading to true
  setLoading(true);

  // get current user data
  const currentUser = auth().currentUser;

  // fetch 10 daily mental health tip first
  const mentalHealthTips = await firestore()
    .collection('HealthTips')
    .orderBy('createdAt', 'desc')
    .limit(10)
    .get();

  // set loading to false
  setLoading(false);

  // return the mental health tips
  return mentalHealthTips.docs.map(doc => {
    return {
      ...doc.data(),
      key: doc.id,
    };
  });
}

// fetch more Daily Mental Health Tips
export async function fetchMoreDailyMentalHealthTips(
  setLoading2,
  setHealthTips,
  healthTips,
  setError,
) {
  try {
    // set loading to true
    setLoading2(true);

    const lastVisible = healthTips[healthTips.length - 1].createdAt;

    const List = [];

    await firestore()
      .collection('HealthTips')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(10)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const {title, description, createdAt} = doc.data();
          List.push({
            key: doc.id,
            title,
            description,
            createdAt,
          });
        });
      });

    // set health tips
    setHealthTips([...healthTips, ...List]);

    // set loading to false
    setLoading2(false);
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError(error.message);
  }
}

//-------------------------------------------------------------------------//
// NOTIFICATION FUNCTION
//-------------------------------------------------------------------------//
// fetch Notifications for the user
export async function fetchNotifications(setLoading) {
  // set loading to true
  setLoading(true);

  // get current user data
  const currentUser = auth().currentUser;

  // list to hold notifications
  const notifications = [];

  // get notifications from firestore under the Users collection
  await firestore()
    .collection('Users')
    .doc(currentUser.uid)
    .collection('Notifications')
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      // clear the notifications list
      notifications.length = 0;
      // loop through the documents and add them to the list
      querySnapshot.forEach(documentSnapshot => {
        notifications.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      // set loading to false
      setLoading(false);
    });

  // return notifications
  return notifications;
}

// function to update notification read status for a particular notification once user clicks on it
export async function updateNotificationReadStatus(notificationId) {
  // get current user data
  const currentUser = auth().currentUser;

  // update notification read status
  await firestore()
    .collection('Users')
    .doc(currentUser.uid)
    .collection('Notifications')
    .doc(notificationId)
    .update({
      read: true,
    });
}

//-------------------------------------------------------------------------//
// THERAPIST FUNCTIONS
//-------------------------------------------------------------------------//
// fetch therapist list
export async function fetchTherapist(setLoading) {
  // set loading to true
  setLoading(true);

  // list to hold therapist
  const therapist = [];

  // get therapist from firestore
  await firestore()
    .collection('Therapists')
    .orderBy('createdAt', 'desc')
    .limit(4)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        therapist.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
    });

  // set loading to false
  setLoading(false);

  // return therapist
  return therapist;
}

// fetch more therapist
export async function fetchMoreTherapist(
  setLoading2,
  therapist,
  setTherapist,
  setError,
) {
  try {
    // set loading to true
    setLoading2(true);

    const lastVisible = therapist[therapist.length - 1].createdAt;

    const List = [];

    await firestore()
      .collection('Therapists')
      .orderBy('createdAt', 'desc')
      .startAfter(lastVisible)
      .limit(4)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          List.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });

    // set therapist
    setTherapist([...therapist, ...List]);

    // set loading to false
    setLoading2(false);
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError(error.message);
  }
}

// fetch therapist schedule for the week
export async function fetchTherapistSchedule(setLoading, item) {
  // set loading to true
  setLoading(true);

  // list to hold therapist schedule
  const therapistSchedule = [];

  // get therapist schedule from firestore
  await firestore()
    .collection('Therapists')
    .doc(item.key)
    .collection('Schedule')
    .orderBy('createdAt', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        therapistSchedule.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
    });

  // set loading to false
  setLoading(false);

  // return therapist schedule
  return therapistSchedule;
}

// Confirm User Booking
export async function confirmUserBooking(
  therapistId,
  date,
  time,
  setLoading,
  setErrorStatus,
  setError,
  userData,
  token,
  navigation,
  name,
) {
  // set loading to true
  setLoading(true);

  // get current user
  const user = auth().currentUser;

  try {
    // save booking to firestore
    const bookingRef = await firestore()
      .collection('Appointments')
      .add({
        userId: user.uid,
        therapistId: therapistId,
        date: date,
        time: time,
        token: `${userData.phoneNumber}${token}`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // send notification to user
    sendNotification(name, date, time);

    // send notification to therapist
    sendNotificationToTherapist(therapistId, name, date, time);

    // Update therapist schedule in firestore
    const scheduleRef = await firestore()
      .collection('Therapists')
      .doc(therapistId)
      .collection('Schedule')
      .add({
        client: user.uid,
        date: date,
        time: time,
        status: 'Booked',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // set error status
    setErrorStatus('success');
    // set error message
    setError('Appointment booked successfully');

    // navigate to home screen after a delay
    setTimeout(() => {
      navigation.navigate('Therapy');
    }, 900);
  } catch (error) {
    // set error status
    setErrorStatus('error');
    // set error message
    setError(error.message);
  } finally {
    // set loading to false
    setLoading(false);
  }
}

// Send notification to user after booking a session
export async function sendNotification(name, date, time) {
  // get current user
  const user = auth().currentUser;

  // get user data from firestore
  await firestore()
    .collection('Users')
    .doc(user.uid)
    .get()
    .then(documentSnapshot => {
      // check if document exists
      if (documentSnapshot.exists) {
        // get user data
        const userData = documentSnapshot.data();

        // send notification to user (create collection of notification under Users collection)
        firestore()
          .collection('Users')
          .doc(user.uid)
          .collection('Notifications')
          .add({
            userId: user.uid,
            title: 'Appointment Booked',
            body: `Your appointment with ${name} has been booked for ${date} at ${time}`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            read: false,
          });
      }
    });
}

// send notification to therapist after user booking a session
export async function sendNotificationToTherapist(
  therapistId,
  name,
  date,
  time,
) {
  // get therapist data from firestore
  await firestore()
    .collection('Therapists')
    .doc(therapistId)
    .get()
    .then(documentSnapshot => {
      // check if document exists
      if (documentSnapshot.exists) {
        // get therapist data
        const therapistData = documentSnapshot.data();

        // send notification to therapist (create collection of notification under Therapists collection)
        firestore()
          .collection('Therapists')
          .doc(therapistId)
          .collection('Notifications')
          .add({
            therapistId: therapistId,
            title: 'Appointment Booked',
            body: `You have a new appointment with ${name} on ${date} at ${time}`,
            createdAt: firestore.FieldValue.serverTimestamp(),
            read: false,
          });
      }
    });
}

// function to upload the therapist details to firestore
export async function uploadTherapistDetailsToFirestore(
  setLoading,
  setErrorStatus,
  setError,
  name,
  Location,
  title,
  workplace,
  about,
  value,
  dayValue,
  appointmentValue,
  languageValue,
  setUploadStatus,
) {
  // set loading to true while uploading therapist details
  setLoading(true);

  // get current logged in user id
  const uid = auth().currentUser.uid;

  try {
    // upload therapist details to firestore
    await firestore()
      .collection('Therapists')
      .doc(uid)
      .set({
        name: name,
        Location: Location,
        title: title,
        workplace: workplace,
        about: about,
        value: value,
        image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
          Math.random() * 1000,
        )}`,
        dayValue: [...dayValue],
        appointmentValue: [...appointmentValue],
        languageValue: [...languageValue],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // set upload status to true
    setUploadStatus(true);

    // set loading to false after uploading therapist details
    setLoading(false);

    // update error status
    setErrorStatus('success');

    // set error message
    setError('Therapist details uploaded successfully!');
  } catch (error) {
    // set loading to false after uploading therapist details
    setLoading(false);

    // update error status
    setErrorStatus('error');

    // set error message
    setError(error.message);
  }
}

// function to edit the therapist details in firestore
export async function editTherapistDetailsInFirestore(
  setLoading,
  setErrorStatus,
  setError,
  values,
  status,
  availability,
  appointmentTime,
) {
  // get current logged in user id
  const uid = auth().currentUser.uid;

  try {
    // set loading to true while uploading therapist details
    setLoading(true);

    // check that input fields are not empty
    status === '' || availability === '' || appointmentTime === ''
      ? // set error status and message if any field is empty
        (setErrorStatus('error'), setError('Please fill in all fields!'))
      : // upload therapist details to firestore if all fields are filled
        await firestore()
          .collection('Therapists')
          .doc(uid)
          .update({
            about: values.about,
            value: status,
            dayValue: [...availability],
            appointmentValue: [...appointmentTime],
            createdAt: firestore.FieldValue.serverTimestamp(),
          });
  } catch (error) {
    // set error status and message if upload fails
    setErrorStatus('error');
    setError(error.message);
  } finally {
    // set loading to false after uploading therapist details
    setLoading(false);

    // recall fetchTherapist function to get updated therapist details
    fetchTherapist(setLoading);
  }
}

// function to fetch selected therapist details from firestore
export async function fetchSelectedTherapist(item) {
  try {
    // fetch therapist details
    const res = await firestore().collection('Therapists').doc(item.key).get();

    // check if the document exists
    if (res.exists) {
      // return the data as an object
      return res.data();
    } else {
      // throw an error if no document found
      throw new Error('No therapist found with this id');
    }
  } catch (error) {
    // set error message
    setError(error.message);
  }
}

// function to check if therapist details exists in firestore
export async function checkIfTherapistDetailsExists(setTherapistDetailsExists) {
  // get current logged in user id
  const uid = auth().currentUser.uid;

  // check if therapist details exists in firestore
  await firestore()
    .collection('Therapists')
    .doc(uid)
    .get()
    .then(documentSnapshot => {
      // check if document exists
      if (documentSnapshot.exists) {
        // set therapist details exists to true
        setTherapistDetailsExists(true);
      } else {
        // set therapist details exists to false
        setTherapistDetailsExists(false);
      }
    });
}

//-------------------------------------------------------------------------//
// PROFILE SCREEN FUNCTIONS
//-------------------------------------------------------------------------//
// Edit user profile
export async function editUserProfile(
  setLoading,
  setErrorStatus,
  setError,
  values,
  resetForm,
) {
  try {
    // set loading to true
    setLoading(true);
    // get current user and user doc reference
    const user = auth().currentUser;
    const userDocRef = firestore().collection('Users').doc(user.uid);
    // update display name, email and phone number in user doc
    await userDocRef.update({
      userName: values.username,
      email: values.email,
      phoneNumber: values.phone,
    });

    // update display name and email in auth
    await user.updateProfile({
      displayName: values.username,
      email: values.email,
    });
    // reset form and set loading to false
    resetForm();
    setLoading(false);
  } catch (error) {
    // set error status and message
    setErrorStatus(true);
    setError(error.message);
    console.log(error);
  }
}

// Change user password
export async function changeUserPassword(
  setLoading,
  setErrorStatus,
  setError,
  values,
  resetForm,
) {
  // set loading to true while updating user password
  setLoading(true);

  // get current logged in user id
  const uid = auth().currentUser.uid;

  // re-authenticate user
  const credential = auth.EmailAuthProvider.credential(
    auth().currentUser.email,
    values.currentPassword,
  );

  try {
    // re-authenticate user
    await auth().currentUser.reauthenticateWithCredential(credential);
    // update user password
    await auth().currentUser.updatePassword(values.newPassword);
    // set loading to false after updating user password
    setLoading(false);
    // reset form
    resetForm();
    // update error status
    setErrorStatus('success');
    // set error message
    setError('Password updated!');
  } catch (error) {
    // set loading to false after updating user password
    setLoading(false);
    // update error status
    setErrorStatus('error');
    // set error message based on error code
    if (error.code === 'auth/wrong-password') {
      setError('Current password is incorrect!');
    } else {
      setError('Something went wrong!');
    }
  }
}

// Delete user account
export async function deleteUserAccount(
  setLoading,
  setErrorStatus,
  setError,
  toggleModal2,
  setUserToken,
) {
  // set loading to true while deleting user account
  setLoading(true);

  // get current logged in user id
  const uid = auth().currentUser.uid;

  // get reference to user document in firestore collection
  const userDocRef = firestore().collection('Users').doc(uid);

  try {
    // delete user account from authentication
    await auth().currentUser.delete();

    // delete user document from firestore collection
    await userDocRef.delete();

    // if user is a therapist, delete therapist document from firestore collection
    await firestore().collection('Therapists').doc(uid).delete();

    // set loading to false after deleting user account
    setLoading(false);
    // close modal
    toggleModal2();
    // clear user token
    setUserToken(null);
    // update error status
    setErrorStatus('success');
    // set error message
    setError('Account deleted!');
  } catch (error) {
    // set loading to false after deleting user account
    setLoading(false);
    // update error status
    setErrorStatus('error');
    // set error message using error code and message from firebase
    setError(`Something went wrong! (${error.code}: ${error.message})`);
  }
}

//-------------------------------------------------------------------------//
// DISCUSSION BOARD FUNCTIONS
//-------------------------------------------------------------------------//
// fetch discussion board and check if current user is a member of that group
export async function fetchDiscussionBoard(setLoading) {
  // set loading to true
  setLoading(true);

  // list to hold discussion board
  const discussionBoard = [];

  // get discussion board from firestore
  await firestore()
    .collection('Groups')
    .orderBy('createdAt', 'desc')
    .limit(5)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        discussionBoard.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
    });

  // set loading to false
  setLoading(false);

  // return discussion board
  return discussionBoard;
}

// search discussion board
export async function searchDiscussionBoard(
  setLoading,
  setGroup,
  setError,
  text,
) {
  try {
    // set loading to true
    setLoading(true);

    // list to hold discussion board
    const discussionBoard = [];

    // get discussion board from firestore
    await firestore()
      .collection('Groups')
      .where('name', '>=', text.toUpperCase())
      .where('name', '<=', text.toUpperCase() + '\uf8ff')
      .orderBy('name')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          discussionBoard.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
      });

    // set discussion board
    setGroup(discussionBoard);

    // set loading to false
    setLoading(false);
  } catch (error) {
    // set loading to false
    setLoading(false);
    // set error
    setError(error.message);
  }
}

// create a new discussion board and send notification to user that created it
export async function createDiscussionBoard(
  setLoading,
  setLoading2,
  setErrorStatus,
  setError,
  toggleModal2,
  setGroup,
  createGroup,
) {
  try {
    // set loading to true
    setLoading2(true);

    // get current user data
    const currentUser = auth().currentUser;

    // check createGroup is not empty
    if (createGroup === '') {
      // set loading to false
      setLoading2(false);

      // set error
      setError('Please enter a group name');
    } else {
      // check if group name already exist
      const groupRef = firestore()
        .collection('Groups')
        .where(
          'name',
          '==',
          createGroup.charAt(0).toUpperCase() + createGroup.slice(1),
        );

      const group = await groupRef.get();

      if (group.empty) {
        // create a new discussion board object with name, image, members, timestamp and creator
        const newDiscussionBoard = {
          name: createGroup.charAt(0).toUpperCase() + createGroup.slice(1),
          image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
            Math.random() * 1000,
          )}`,
          Number_of_Members: [
            {
              userId: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
          ],
          createdAt: firestore.Timestamp.fromDate(new Date()),
          createdBy: currentUser.uid,
        };

        // add the new discussion board to the Groups collection
        await firestore()
          .collection('Groups')
          .add(newDiscussionBoard)
          .then(async () => {
            // get discussion board
            const discussionBoard = await fetchDiscussionBoard(setLoading);

            // set discussion board
            setGroup(discussionBoard);

            //set error
            setErrorStatus('success');
            setError('Group created successfully');

            // set loading to false
            setLoading2(false);

            // set modal visible to false
            toggleModal2();

            // send notification to user that created the discussion board
            // create a notification object with user id, title, body and timestamp
            const notification = {
              userId: currentUser.uid,
              title: 'Discussion Board',
              body: `You created a new discussion board called  ${
                createGroup.charAt(0).toUpperCase() + createGroup.slice(1)
              }. Created on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
              createdAt: firestore.FieldValue.serverTimestamp(),
              read: false,
            };

            // add the notification to the Users collection
            await firestore()
              .collection('Users')
              .doc(currentUser.uid)
              .collection('Notifications')
              .add(notification);
          });
      } else {
        // set loading to false
        setLoading2(false);

        // set error
        setError('Group name already exist');
      }
    }
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError(error.message);
  }
}

// function to send live chat message with in the group
export async function sendLiveChatMessage(
  setErrorStatus,
  setError,
  groupdata,
  message,
  setMessage,
) {
  try {
    // get current user data
    const currentUser = auth().currentUser;

    // get the group document reference
    const groupRef = firestore().collection('Groups').doc(groupdata.key);

    // get the array of members
    const members = await groupRef
      .get()
      .then(snapshot => snapshot.data().Number_of_Members);

    // check if current user is a member of the group
    const isMember = members.some(item => item.userId === currentUser.uid);

    // check if message is empty
    if (message === '') {
      throw new Error('Message cannot be empty');
    }

    // check if user is a member of the group
    if (!isMember) {
      throw new Error('You are not a member of this group');
    }

    // send message
    await groupRef.collection('Messages').add({
      userId: currentUser.uid,
      message: message,
      createdAt: new Date().getTime(),
      date: new Date().getDate(),
    });

    // set message to empty
    setMessage('');
  } catch (error) {
    // set error status
    setErrorStatus('error');

    // set error
    setError(error.message);
  }
}

// function to fetch live chat messages
export async function fetchLiveChatMessages(
  setLoading,
  setPastMessages,
  groupdata,
) {
  try {
    // Set loading to true
    setLoading(true);

    // Get current user id
    const currentUserId = auth().currentUser.uid;

    // Get the group document reference
    const groupRef = firestore().collection('Groups').doc(groupdata.key);

    // Get the number of members field from the group document
    const numberOfMembers = await groupRef
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // Check if the current user id is in the number of members array
    const isMember = numberOfMembers.some(
      member => member.userId === currentUserId,
    );

    // If the current user is a member of the group, then fetch messages
    if (isMember) {
      // Get the messages collection reference
      const messagesRef = groupRef.collection('Messages');

      // Subscribe to the messages snapshot
      messagesRef.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
        // Map the snapshot documents to an array of messages with key and data
        const messages = snapshot.docs.map(doc => ({
          key: doc.id,
          ...doc.data(),
        }));

        // Set messages state
        setPastMessages(messages);
      });
    }
  } catch (error) {
    // Handle error
    console.error(error);
  } finally {
    // Set loading to false
    setLoading(false);
  }
}

// function to fetch only 5 members of the group from database
export async function fetchMembers(setLoading, setGroupMembers, data) {
  try {
    // set loading to true
    setLoading(true);

    // get the number of members field from the group document
    const numberOfMembers = await firestore()
      .collection('Groups')
      .doc(data.key)
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // get the first 5 members
    const firstFiveMembers = numberOfMembers.slice(0, 5);

    // set members state
    setGroupMembers(firstFiveMembers);
  } catch (error) {
    // handle error
  } finally {
    // set loading to false
    setLoading(false);
  }
}

// function to fetch all members of the group from database
export async function fetchAllMembers(
  setGroupMembers,
  groupdata,
  setErrorStatus,
  setError,
) {
  try {
    // get the number of members field from the group document
    const numberOfMembers = await firestore()
      .collection('Groups')
      .doc(groupdata.key)
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // set members state
    setGroupMembers(numberOfMembers);
  } catch (error) {
    // set error status
    setErrorStatus('error');

    // set error
    setError('Yes its this' + error.message);
  }
}

// function to delete the group
export async function deleteGroup(groupdata, navigation) {
  // get current user data
  const currentUser = auth().currentUser;
  try {
    // delete group document from the Groups collection
    await firestore().collection('Groups').doc(groupdata.key).delete();

    // navigate to home screen
    navigation.navigate('Groups');

    // send notification to user
    // create a notification object with current user id, title, body and timestamp
    const notification = {
      userId: currentUser.uid,
      title: 'Discussion Board Deleted',
      body: `You have deleted the group. ${
        groupdata.name
      }. Deleted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      createdAt: firestore.FieldValue.serverTimestamp(),
      read: false,
    };

    // add the notification to the Users collection
    await firestore()
      .collection('Users')
      .doc(currentUser.uid)
      .collection('Notifications')
      .add(notification);
  } catch (error) {
    // set error status
    setErrorStatus('error');

    // set error
    setError('Yes its this' + error.message);
  }
}

// function to join the group plus send notification to the group members and person who just joined
export async function joinGroup(
  setLoading,
  groupdata,
  navigation,
  setErrorStatus,
  setError,
  setGroup,
  toggleModal,
) {
  try {
    toggleModal();

    // set loading to true
    setLoading(true);

    // get current user data
    const currentUser = auth().currentUser;

    // get the member reference
    const memberRef = firestore().collection('Groups').doc(groupdata.key);

    // get the number of members field
    const numberOfMembers = await memberRef
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // check if current user id is in the number of members array
    const isMember = numberOfMembers.some(
      member => member.userId === currentUser.uid,
    );

    // if current user is not a member of the group
    if (!isMember) {
      // create an object with current user data
      const currentUserData = {
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };

      // add current user to the array of members
      await memberRef.update({
        Number_of_Members: firestore.FieldValue.arrayUnion(currentUserData),
      });

      // get discussion board
      const discussionBoard = await fetchDiscussionBoard(setLoading);

      // set discussion board
      setGroup(discussionBoard);

      // send notification to user
      // create a notification object with current user id, title, body and timestamp
      const notification = {
        userId: currentUser.uid,
        title: 'Joined Discussion Board',
        body: `You joined the discussion board called  ${
          groupdata.name
        }. Joined on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        createdAt: firestore.FieldValue.serverTimestamp(),
        read: false,
      };

      // add the notification to the Users collection
      await firestore()
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Notifications')
        .add(notification);

      // set loading to false
      setLoading(false);

      // navigate to home screen
      navigation.navigate('Groups');
    } else {
      // set error status
      setErrorStatus('error');

      // set error
      setError('You are already a member of this group');
    }
  } catch (error) {
    // set error status
    setErrorStatus('error');

    // set error
    setError('Yes its this' + error.message);
  }
}

// function to leave the group plus send notification to the group members and person who just left
export async function leaveGroup(
  setLoading,
  groupdata,
  navigation,
  setErrorStatus,
  setError,
  setGroup,
  toggleModal,
) {
  try {
    // toggle modal
    toggleModal();

    // set loading to true
    setLoading(true);

    // get current user data
    const currentUser = auth().currentUser;

    // get the member reference
    const memberRef = firestore().collection('Groups').doc(groupdata.key);

    // get the number of members field
    const numberOfMembers = await memberRef
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // check if current user id is in the number of members array
    const isMember = numberOfMembers.some(
      member => member.userId === currentUser.uid,
    );

    // if current user is a member of the group
    if (isMember) {
      // create an object with current user data
      const currentUserData = {
        userId: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      };

      // remove current user from the array of members
      await memberRef.update({
        Number_of_Members: firestore.FieldValue.arrayRemove(currentUserData),
      });

      // get discussion board
      const discussionBoard = await fetchDiscussionBoard(setLoading);

      // set discussion board
      setGroup(discussionBoard);

      // send notification to all members of the group
      // create a notification object with current user id, title, body and timestamp
      const notification = {
        userId: currentUser.uid,
        title: 'Discussion Board',
        body: `You left the discussion board called  ${
          groupdata.name
        }. Left on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        createdAt: firestore.FieldValue.serverTimestamp(),
        read: false,
      };

      // add the notification to the Users collection
      await firestore()
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Notifications')
        .add(notification);

      // set loading to false
      setLoading(false);

      // navigate to home screen
      navigation.navigate('Groups');
    } else {
      // set loading to false
      setLoading(false);

      // set error status
      setErrorStatus('error');

      // set error
      setError('You are not a member of this group');
    }
  } catch (error) {
    // set loading to false
    setLoading(false);

    // set error status
    setErrorStatus('error');

    // set error
    setError('Yes its this' + error.message);
  }
}

// function to check if user is a member of the group
export async function checkIfMember(item, setError, setStatus) {
  try {
    // get current user id
    const currentUserId = auth().currentUser.uid;

    // get the member reference
    const memberRef = firestore().collection('Groups').doc(item.key);

    // get the number of members field
    const numberOfMembers = await memberRef
      .get()
      .then(snapshot => snapshot.get('Number_of_Members'));

    // check if current user id is in the number of members array
    const isMember = numberOfMembers.some(
      member => member.userId === currentUserId,
    );

    // set status to the result of the check
    setStatus(isMember);
  } catch (error) {
    // set error
    setError('Yes its this' + error.message);
  }
}
