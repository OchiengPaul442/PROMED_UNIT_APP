import {View, Text} from 'react-native';
import React from 'react';
// firebase import
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function firebase() {
  // schedule data
  const Schedule = [
    {
      date: '12/12/2021',
      time: '9 - 11 Am',
      status: 'Pending',
    },
    {
      date: '12/12/2021',
      time: '12 - 2 Pm',
      status: 'Pending',
    },
    {
      date: '12/12/2021',
      time: '3 - 5 Pm',
      status: 'Booked',
    },
  ];

  // function to loop through Schedule list and insert the therapists schedule list into firestore
  const insertSchedule = () => {
    Schedule.map(item => {
      firestore()
        .collection('Therapists')
        .doc(therapistId)
        .collection('Schedule')
        .add({
          date: item.date,
          time: item.time,
          status: item.status,
        })
        .then(() => {
          console.log('Schedule added!');
        });
    });
  };

  // function to delete the therapists schedule list from firestore
  const deleteSchedule = () => {
    firestore()
      .collection('Therapists')
      .doc(therapistId)
      .collection('Schedule')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.delete();
        });
      });
  };

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  // list of therapist details
  const therapistList = [
    {
      name: 'Dr. John Doe',
      language: 'English',
      daysAvailable: ['Mon', 'Tue', 'Wed'],
      title: 'Psychologist',
      workplace: 'Gulu State University Teaching Hospital',
      availabilityStatus: 'active',
      sessionTime: ['9 Am', '12 Pm', '3 Pm'],
      image: 'https://source.unsplash.com/random/200x200',
      about:
        'I am a very good doctor and i love my job so much and i am very good at it. And i am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it.',
      location: 'Kampala, Uganda',
      createdAt: new Date(),
    },
    {
      name: 'Dr. Clare Fiona',
      language: 'English, Luganda',
      daysAvailable: ['Mon', 'Tue', 'Wed', 'Thus'],
      title: 'Psychologist',
      workplace: 'Makerere University Teaching Hospital',
      availabilityStatus: 'active',
      sessionTime: ['9 Am', '12 Pm', '3 Pm'],
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
      about:
        'I am a very good doctor and i love my job so much and i am very good at it. And i am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it.',
      location: 'Kampala, Uganda',
      createdAt: new Date(),
    },
    {
      name: 'Dr. Vicky Close',
      language: 'English,French',
      daysAvailable: ['Mon', 'Tue', 'Wed'],
      title: 'Psychologist',
      workplace: 'Gulu Hospital',
      availabilityStatus: 'active',
      sessionTime: ['9 Am', '2 Pm'],
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
      about:
        'I am a very good doctor and i love my job so much and i am very good at it. And i am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it.',
      location: 'Jinja, Uganda',
      createdAt: new Date(),
    },
    {
      name: 'Dr. Okello Moris',
      language: 'English',
      daysAvailable: ['Tue', 'Wed', 'Frid'],
      title: 'Psychologist',
      workplace: 'Jinj Hospital',
      availabilityStatus: 'active',
      sessionTime: ['12 Pm', '3 Pm'],
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
      about:
        'I am a very good doctor and i love my job so much and i am very good at it. And i am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it. I am a very good doctor and i love my job so much and i am very good at it. This is a very good doctor and i love my job so much and i am very good at it.',
      location: 'Gulu, Uganda',
      createdAt: new Date(),
    },
  ];

  // function to loop through therapist list and add it to firestore
  const addTherapist = async () => {
    try {
      // loop through therapist list
      therapistList.forEach(async therapist => {
        // add therapist to firestore
        await firestore().collection('Therapists').add(therapist);
      });
    } catch (e) {
      console.log(e);
    }
  };

  // function to delete all therapist from firestore
  const deleteTherapist = async () => {
    try {
      // get therapist
      const therapist = await firestore().collection('Therapists').get();

      // loop through therapist
      therapist.forEach(async doc => {
        // delete therapist
        await firestore().collection('Therapists').doc(doc.id).delete();
      });
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    // insertSchedule();
    // deleteSchedule();
  }, []);

  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

  const groupRef = [
    {
      name: 'Family Unit',
      Number_Of_Members: 0,
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
    },
    {
      name: 'Friends',
      Number_Of_Members: 16,
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
    },
    {
      name: 'Work',
      Number_Of_Members: 10,
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
    },
    {
      name: 'School',
      Number_Of_Members: 20,
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
    },
    {
      name: 'Sports',
      Number_Of_Members: 40,
      image: `https://source.unsplash.com/collection/139386/160x160/?sig=${Math.floor(
        Math.random() * 1000,
      )}`,
    },
  ];

  // function to add group to firebase
  const addGroup = () => {
    groupRef.forEach(item => {
      firestore()
        .collection('Groups')
        .add({
          name: item.name,
          Number_Of_Members: item.Number_Of_Members,
          image: item.image,
          createdAt: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Group added!');
        });
    });
  };

  // function to delete all groups
  const deleteAllGroups = () => {
    firestore()
      .collection('Groups')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          documentSnapshot.ref.delete();
        });
      });
  };
  return (
    <View>
      <Text>firebase</Text>
    </View>
  );
}
