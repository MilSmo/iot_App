import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { NavigationProp } from '@react-navigation/native';
import { RouteProp, useNavigation } from '@react-navigation/native';  // Ensure you have @react-navigation/native installed
interface RouterProps {
    navigation: NavigationProp<any, any>;
  }
interface Reading {
    id: string;
    value: number | string;
    time: string;
}

const Details = ({navigation}:RouterProps) => {
    const [latestReading, setLatestReading] = useState<Reading | null>(null);
 

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        const deviceId = '1';

        if (user) {
            const readingsRef = collection(FIREBASE_DB, `readings`);
            const q = query(readingsRef, where("id", "==", deviceId));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedReadings: Reading[] = querySnapshot.docs
                    .map(doc => {
                        const data = doc.data();
                        const time = data.timestamp ? data.timestamp.toDate().toString() : '';  // Convert timestamp to string
                        return { id: doc.id, value: data.value, time };
                    })
                    .sort((a, b) => b.time.localeCompare(a.time));  // Sort by time, latest first

                if (fetchedReadings.length > 0) {
                    setLatestReading(fetchedReadings[0]);
                } else {
                    setLatestReading(null);
                }
            });

            return () => unsubscribe();
        }
    }, []);

    return (
        <View style={styles.container}>
            {latestReading ? (
                <View style={styles.latestReading}>
                    <Text style={styles.latestReadingText}>Latest Reading:</Text>
                    <Text style={styles.latestReadingValue}>{latestReading.value}</Text>
                </View>
            ) : (
                <Text>No current reading</Text>
            )}

            <Button
                title="View History"
                onPress={() => navigation.navigate('HistoryReadings')}
            />
            <Button
                title="Pump On"
              
            />
        </View>
    );
};

   

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    latestReading: {
        padding: 20,
        margin: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
    },
    latestReadingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    latestReadingValue: {
        fontSize: 24,
        color: 'blue',
    },
    readingItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default Details;
