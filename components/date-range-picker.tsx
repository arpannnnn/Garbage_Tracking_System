'use client';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../src/app/lib/utils';
import { addDays, format } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    isDriver: boolean;
}

const hardcodedSchedules = [
    '2024-06-01',
    '2024-06-15',
    '2024-06-10',
    '2024-06-15',
];
// Function to fetch driver schedules from the server (commented out for now)
// const fetchDriverSchedules = () => {
//     return new Promise<string[]>((resolve) => {
//         // Simulate API call delay
//         setTimeout(() => {
//             resolve(hardcodedSchedules);
//         }, 1000); // Simulate 1 second delay
//     });
// };


export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20)
    });

    const [schedules, setSchedules] = React.useState<string[]>(hardcodedSchedules);
    const [newScheduleDate, setNewScheduleDate] = React.useState<string>('');

    const handleAddSchedule = () => {
        if (newScheduleDate) {
            setSchedules([...schedules, newScheduleDate]);
            setNewScheduleDate('');
        }
    };

    // Create a modifiers object to mark scheduled dates
    const modifiers = {
        scheduled: schedules.map(date => new Date(date))
    };

    // Define custom class names for the modifiers
    const modifiersClassNames = {
        scheduled: 'bg-red-500 text-white'
    };
     // Effect to fetch driver schedules when the component mounts (commented out for now)
    // React.useEffect(() => {
    //     // Fetch driver schedules
    //     fetchDriverSchedules().then((fetchedSchedules) => {
    //         setSchedules(fetchedSchedules);
    //     });
    // }, []); // Empty dependency array to ensure it only runs once when the component mounts


    return (
        <div className={cn('grid gap-4 p-4 md:grid-cols-1', className)}>
            
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
                    className="rounded-lg border border-gray-300 " 
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
            <div className=" w-full  mt-4 ">
                <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
                <ul className="text-center mt-2 text-red-600">
                    {schedules.map((schedule, index) => (
                        <li key={index} className="list-disc list-inside">
                            {format(new Date(schedule), 'LLL dd, y')}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
