import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';

interface Reading {
    id: string;
    value: number | string;
    time: string;
}

const HistoryReadings = () => {
    const [readings, setReadings] = useState<Reading[]>([]);

    useEffect(() => {
        const user = FIREBASE_AUTH.currentUser;
        const deviceId = '1';

        if (user) {
            const readingsRef = collection(FIREBASE_DB, `readings`);
            const q = query(readingsRef, where("id", "==", deviceId), orderBy('timestamp', 'desc'));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const fetchedReadings: Reading[] = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    const time = data.timestamp ? data.timestamp.toDate().toString() : '';
                    return { id: doc.id, value: data.value, time };
                });

                setReadings(fetchedReadings);
            });

            return () => unsubscribe();
        }
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={readings}
                renderItem={({ item }) => (
                    <View style={styles.readingItem}>
                        <Text>Value: {item.value}</Text>
                        <Text>Time: {item.time}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
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


export default HistoryReadings;
