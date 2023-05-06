// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

import React from 'react';

// navigation
import {useNavigation} from '@react-navigation/native';

//-------------------------------------------------------------------------//
// APPOINTMENT FUNCTION
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
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        notifications.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
    });

  // set loading to false
  setLoading(false);

  // return notifications
  return notifications;
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
    await firestore()
      .collection('Appointments')
      .add({
        userId: user.uid,
        therapistId: therapistId,
        date: date,
        time: time,
        token: `${userData.phoneNumber}${token}`,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

    // set error status
    setErrorStatus('success');
    // set error message
    setError('Appointment booked successfully');

    // send notification to user
    sendNotification(name, date, time);

    // Update therapist schedule in firestore
    await firestore()
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

    // set timeout
    setTimeout(() => {
      // set error status
      setErrorStatus('');
      // set error message
      setError('');
      // navigate to home screen
      navigation.navigate('Therapy');
    }, 1000);
  } catch (error) {
    // set error message
    setError(error.message);
  }

  // set loading to false
  setLoading(false);
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
          });
      }
    });
}

//-------------------------------------------------------------------------//
// DISCUSSION BOARD FUNCTIONS
//-------------------------------------------------------------------------//
// fetch discussion board
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
        // create a new discussion board
        await firestore()
          .collection('Groups')
          .add({
            name: createGroup.charAt(0).toUpperCase() + createGroup.slice(1),
            image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
              Math.random() * 1000,
            )}`,
            Number_of_Members: [
              {
                userId: currentUser.uid,
              },
            ],
            createdAt: firestore.Timestamp.fromDate(new Date()),
            createdBy: currentUser.uid,
          })
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
            await firestore()
              .collection('Users')
              .doc(currentUser.uid)
              .collection('Notifications')
              .add({
                userId: currentUser.uid,
                title: 'Discussion Board',
                body: `Your created a new discussion board called  ${
                  createGroup.charAt(0).toUpperCase() + createGroup.slice(1)
                }. Created on ${
                  new Date().getDate() +
                  '/' +
                  new Date().getMonth() +
                  '/' +
                  new Date().getFullYear()
                } at ${
                  new Date().getHours() > 12 && new Date().getHours() < 24
                    ? new Date().getHours() -
                      12 +
                      ':' +
                      new Date().getMinutes() +
                      ' PM'
                    : new Date().getHours() +
                      ':' +
                      new Date().getMinutes() +
                      ' AM'
                }`,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });
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

// function to check if current user is a member of a discussion board
export async function checkIfMember(item, setMemberStatus) {
  // get current user
  const currentUser = auth().currentUser;

  // check if current user is a member of the Groups collection()
  const memberRef = firestore().collection('Groups').doc(item.key);

  // Get the array of members
  const members = await memberRef
    .get()
    .then(snapshot => snapshot.data().Number_of_Members);

  // caputure the userId element of the array
  const userId = members.map(item => item.userId);

  // Check if the current user is a member of the array
  const isMember = userId.includes(currentUser.uid);

  // If the current user is a member of the array, then they are a member of the group
  if (isMember) {
    setMemberStatus(true);
  } else {
    setMemberStatus(false);
  }
}

// function to join a discussion board
export async function joinDiscussionBoard(
  setLoading,
  setLoading2,
  setErrorStatus,
  setError,
  toggleModal,
  setGroup,
  selectedGroup,
  setMemberStatus,
) {
  try {
    // set loading to true
    setLoading2(true);

    // get current user data
    const currentUser = auth().currentUser;

    // check if current user is a member of the Groups collection()
    const memberRef = firestore().collection('Groups').doc(selectedGroup.key);

    // Get the array of members
    const members = await memberRef
      .get()
      .then(snapshot => snapshot.data().Number_of_Members);

    // caputure the userId element of the array
    const userId = members.map(item => item.userId);

    // Check if the current user is a member of the array
    const isMember = userId.includes(currentUser.uid);

    // If the current user is a member of the array, then they are a member of the group
    if (isMember) {
      // set loading to false
      setLoading2(false);

      // set error
      setError('You are already a member of this group');
    } else {
      // add current user to the array of members
      await memberRef.update({
        Number_of_Members: firestore.FieldValue.arrayUnion({
          userId: currentUser.uid,
        }),
      });

      // get discussion board
      const discussionBoard = await fetchDiscussionBoard(setLoading);

      // set discussion board
      setGroup(discussionBoard);

      //set error
      setErrorStatus('success');
      setError('You have joined this group successfully');

      // set loading to false
      setLoading2(false);

      // set modal visible to false
      toggleModal();

      // set member status to true
      setMemberStatus(true);

      // send notification to user that created the discussion board
      await firestore()
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Notifications')
        .add({
          userId: currentUser.uid,
          title: 'Discussion Board',
          body: `You joined the discussion board called  ${
            selectedGroup.name
          }. Joined on ${
            new Date().getDate() +
            '/' +
            new Date().getMonth() +
            '/' +
            new Date().getFullYear()
          } at ${
            new Date().getHours() > 12 && new Date().getHours() < 24
              ? new Date().getHours() -
                12 +
                ':' +
                new Date().getMinutes() +
                ' PM'
              : new Date().getHours() + ':' + new Date().getMinutes() + ' AM'
          }`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    }
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError(error.message);
  }
}

// function to leave a discussion board
export async function leaveDiscussionBoard(
  setLoading,
  setLoading2,
  setErrorStatus,
  setError,
  toggleModal,
  setGroup,
  selectedGroup,
  setMemberStatus,
) {
  try {
    // set loading to true
    setLoading2(true);

    // get current user data
    const currentUser = auth().currentUser;

    // check if current user is a member of the Groups collection()
    const memberRef = firestore().collection('Groups').doc(selectedGroup.key);

    // Get the array of members
    const members = await memberRef
      .get()
      .then(snapshot => snapshot.data().Number_of_Members);

    // caputure the userId element of the array
    const userId = members.map(item => item.userId);

    // Check if the current user is a member of the array
    const isMember = userId.includes(currentUser.uid);

    // If the current user is a member of the array, then they are a member of the group
    if (isMember) {
      // remove current user from the array of members
      await memberRef.update({
        Number_of_Members: firestore.FieldValue.arrayRemove({
          userId: currentUser.uid,
        }),
      });

      // get discussion board
      const discussionBoard = await fetchDiscussionBoard(setLoading);

      // set discussion board
      setGroup(discussionBoard);

      //set error
      setErrorStatus('success');
      setError('You have left this group successfully');

      // set loading to false
      setLoading2(false);

      // set modal visible to false
      toggleModal();

      // set member status to false
      setMemberStatus(false);

      // send notification to user that created the discussion board
      await firestore()
        .collection('Users')
        .doc(currentUser.uid)
        .collection('Notifications')
        .add({
          userId: currentUser.uid,
          title: 'Discussion Board',
          body: `You left the discussion board called  ${
            selectedGroup.name
          }. Left on ${
            new Date().getDate() +
            '/' +
            new Date().getMonth() +
            '/' +
            new Date().getFullYear()
          } at ${
            new Date().getHours() > 12 && new Date().getHours() < 24
              ? new Date().getHours() -
                12 +
                ':' +
                new Date().getMinutes() +
                ' PM'
              : new Date().getHours() + ':' + new Date().getMinutes() + ' AM'
          }`,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
    } else {
      // set loading to false
      setLoading2(false);

      // set error
      setError('You are not a member of this group');
    }
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError('Yes its this' + error.message);
  }
}
