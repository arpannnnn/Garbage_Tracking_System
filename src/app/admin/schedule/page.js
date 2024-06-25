'use client';
import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { app } from '../../../../firebase/firebase';
import { Button } from '../../../../components/ui/button';
import { format } from 'date-fns';
import { useToast } from '../../../../components/ui/use-toast';
import Loader from '../../../../components/Loader';
const AdminSchedule = () => {
    const db = getFirestore(app);
    const [newScheduleDate, setNewScheduleDate] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editedDate, setEditedDate] = useState('');
    const { toast } = useToast();
const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'schedules'), (snapshot) => {
            const fetchedSchedules = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSchedules(fetchedSchedules);
        });

        return () => unsubscribe();
    }, [db]);

    const handleAddSchedule = async () => {
        if (newScheduleDate) {
            const selectedDate = new Date(newScheduleDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                toast({
                    title: 'Error',
                    description: 'Cannot schedule a pickup for a past date.',
                    variant: 'destructive',
                });
                setNewScheduleDate('');
                return;
            }
            try {
                await addDoc(collection(db, 'schedules'), { date: newScheduleDate });
                setNewScheduleDate('');
                toast({
                    title: 'Success',
                    description: 'Schedule added successfully!',
                    variant: ' success',
                });
            } catch (error) {
                toast({
                    title: 'Error',
                    description: 'Failed to add schedule.',
                    variant: 'destructive',
                });
            }
        }
    };
    useEffect(() => {
        
        setTimeout(() => {
            setLoading(false);
        }, 1000); 
    }, []);
    if (loading) {
        return <Loader />
    }

    const handleEditSchedule = async (id) => {
        try {
            await updateDoc(doc(db, 'schedules', id), { date: editedDate });
            setEditing(null);
            setEditedDate('');
            toast({
                title: 'Success',
                description: 'Schedule updated successfully!',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to update schedule.',
                variant: 'destructive',
            });
        }
    };

    const handleDeleteSchedule = async (id) => {
        try {
            await deleteDoc(doc(db, 'schedules', id));
            toast({
                title: 'Success',
                description: 'Schedule deleted successfully!',
                variant: 'success',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete schedule.',
                variant: 'destructive',
            });
        }
    };

    return (
        <div className="mt-4 w-full p-4 ">
            <h3 className="text-lg font-semibold mb-4  flex justify-center items-center">Admin: Schedule a Pickup</h3>
            <div className="flex flex-col md:flex-row  gap-2 mb-4  justify-center items-center">
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
            <h3 className="text-lg font-semibold mb-4  flex justify-center items-center">Scheduled Pickups</h3>
            <ul className="space-y-2">
                {schedules.map(schedule => (
                    <li key={schedule.id} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                        {editing === schedule.id ? (
                            <>
                                <input
                                    type="date"
                                    value={editedDate}
                                    onChange={(e) => setEditedDate(e.target.value)}
                                    className="border p-2 rounded w-full md:w-auto"
                                />
                                <Button onClick={() => handleEditSchedule(schedule.id)} className="ml-2">
                                    Save
                                </Button>
                                <Button onClick={() => setEditing(null)} className="ml-2">
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                <span>{format(new Date(schedule.date), 'LLL dd, y')}</span>
                                <div>
                                    <Button onClick={() => { setEditing(schedule.id); setEditedDate(schedule.date); }} className="ml-2">
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDeleteSchedule(schedule.id)} className="ml-2">
                                        Delete
                                    </Button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminSchedule;
