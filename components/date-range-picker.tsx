'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { app } from '../firebase/firebase'; 
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../src/app/lib/utils';
import { addDays, format, isPast } from 'date-fns'; 
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import Loader from './Loader';

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    isDriver: boolean;
}

const db = getFirestore(app);

export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20),
    });
    const [schedules, setSchedules] = useState<string[]>([]);
    const [newScheduleDate, setNewScheduleDate] = useState<string>('');
    const [loading, setLoading] = useState(true);

    // Fetch schedules from Firestore in realtime
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'schedules'), (snapshot) => {
            const fetchedSchedules = snapshot.docs.map((doc) => doc.data().date);
            setSchedules(fetchedSchedules);
        });

        return () => unsubscribe();
    }, []);

    const handleAddSchedule = async () => {
        if (newScheduleDate) {
            try {
                await addDoc(collection(db, 'schedules'), { date: newScheduleDate });
                setNewScheduleDate('');
            } catch (error) {
                console.error('Error adding schedule:', error);
            }
        }
    };

    const modifiers = {
        scheduled: schedules.map((date) => new Date(date)),
    };

    const modifiersClassNames = {
        scheduled: 'bg-red-500 text-white',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />
    }

    return (
        <div className="max-w-md mx-auto  bg-gradient-to-r from-indigo-200 to-green-100 shadow-lg rounded-xl p-2 border mt-6 border-blue-200">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Schedule </h2>
            <div className="w-full p-0">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={new Date()}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                    modifiers={modifiers}
                    modifiersClassNames={modifiersClassNames}
                    className="rounded-lg border border-gray-300"
                />
            </div>
            {isDriver && (
                <div className="mt-4 w-full">
                    <h3 className="text-lg font-semibold">Schedule a Pickup</h3>
                    <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
                        <input
                            type="date"
                            value={newScheduleDate}
                            onChange={(e) => setNewScheduleDate(e.target.value)}
                            className="border p-2 rounded w-full md:w-auto"
                        />
                        <Button onClick={handleAddSchedule} className="w-full md:w-auto">
                            Add Schedule
                        </Button>
                    </div>
                </div>
            )}
            <div className="w-full mt-4">
                <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
                <div className="text-center mt-2 text-red-600 font-semibold">
                    {schedules
                        .filter((schedule) => !isPast(new Date(schedule)))
                        .map((schedule, index) => (
                            <div key={index} className="flex items-center justify-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" color="currentColor"><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /><path d="M11 9v3m-4-2v2m10-8h-2m0 0H9.485c-1.226 0-1.84 0-2.39.228c-.552.229-.985.662-1.852 1.53L3.464 7.535c-.722.722-1.083 1.083-1.274 1.543c-.19.46-.19.97-.19 1.992V13c0 2.357 0 3.535.732 4.268c.487.487 1.171.65 2.268.704M15 4v4c0 1.886 0 2.828.586 3.414S17.114 12 19 12h3v1c0 2.357 0 3.535-.732 4.268c-.487.487-1.171.65-2.268.704M9 18h6" /><path d="M15 7h1.7c1.358 0 2.037 0 2.59.354c.553.353.875.994 1.519 2.276L22 12" /></g></svg>
                                <span>{format(new Date(schedule), 'LLL dd, y')}</span>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}