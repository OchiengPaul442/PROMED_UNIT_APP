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

// fetch more discussion board
export async function fetchMoreDiscussionBoard(
  setLoading2,
  Groupdata,
  setGroup,
  setError,
) {
  try {
    // set loading to true
    setLoading2(true);

    // check if Groupdata is not empty
    if (Groupdata.length > 0) {
      // get the last visible document
      const lastVisible = Groupdata[Groupdata.length - 1].createdAt;

      const List = [];

      await firestore()
        .collection('Groups')
        .orderBy('createdAt', 'desc')
        .startAfter(lastVisible)
        .limit(5)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            List.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
        });

      // set discussion board
      setGroup([...group, ...List]);
    }

    // set loading to false
    setLoading2(false);
  } catch (error) {
    // set loading to false
    setLoading2(false);

    // set error
    setError(error.message);
  }
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
