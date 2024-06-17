// 'use client';
// import { Button } from '../components/ui/button';
// import { Calendar } from '../components/ui/calendar';
// import { cn } from '../src/app/lib/utils';
// import { addDays, format } from 'date-fns';
// import * as React from 'react';
// import { DateRange } from 'react-day-picker';

// interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
//     isDriver: boolean;
// }

// const hardcodedSchedules = [
//     '2024-06-01',
   
// ];


// // Function to fetch driver schedules from the server (commented out for now)
// const fetchDriverSchedules = () => {
//     return new Promise<string[]>((resolve) => {
//         // Simulate API call delay
//         setTimeout(() => {
//             resolve(hardcodedSchedules);
//         }, 1000); // Simulate 1 second delay
//     });
// };


// export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
//     const [date, setDate] = React.useState<DateRange | undefined>({
//         from: new Date(2023, 0, 20),
//         to: addDays(new Date(2023, 0, 20), 20)
//     });

//     const [schedules, setSchedules] = React.useState<string[]>(hardcodedSchedules);
//     const [newScheduleDate, setNewScheduleDate] = React.useState<string>('');

//     const handleAddSchedule = () => {
//         if (newScheduleDate) {
//             setSchedules([...schedules, newScheduleDate]);
//             setNewScheduleDate('');
//         }
//     };

//     // Create a modifiers object to mark scheduled dates
//     const modifiers = {
//         scheduled: schedules.map(date => new Date(date))
//     };

//     // Define custom class names for the modifiers
//     const modifiersClassNames = {
//         scheduled: 'bg-red-500 text-white'
//     };
//      // Effect to fetch driver schedules when the component mounts (commented out for now)
//     // React.useEffect(() => {
//     //     // Fetch driver schedules
//     //     fetchDriverSchedules().then((fetchedSchedules) => {
//     //         setSchedules(fetchedSchedules);
//     //     });
//     // }, []); // Empty dependency array to ensure it only runs once when the component mounts


//     return (
//         <div className={cn('grid gap-4 p-4 md:grid-cols-1', className)}>
            
//             <div className="w-full p-0">
//                 <Calendar
//                     initialFocus
//                     mode="range"
//                     defaultMonth={new Date()} 
//                     selected={date}
//                     onSelect={setDate}
//                     numberOfMonths={1}
//                     modifiers={modifiers}
//                     modifiersClassNames={modifiersClassNames}
//                     className="rounded-lg border border-gray-300 " 
//                 />
            
//             </div>
//             {isDriver && (
//                 <div className="mt-4 w-full">
//                     <h3 className="text-lg font-semibold">Schedule a Pickup</h3>
//                     <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
//                         <input
//                             type="date"
//                             value={newScheduleDate}
//                             onChange={(e) => setNewScheduleDate(e.target.value)}
//                             className="border p-2 rounded w-full md:w-auto"
//                         />
//                         <Button onClick={handleAddSchedule} className="w-full md:w-auto">
//                             Add Schedule
//                         </Button>
//                     </div>
//                 </div>
//             )}
//             <div className=" w-full  mt-4 ">
//                 <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
//                 <ul className="text-center mt-2 text-red-600">
//                     {schedules.map((schedule, index) => (
//                         <li key={index} className="list-disc list-inside">
//                             {format(new Date(schedule), 'LLL dd, y')}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }






// 


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

interface Event {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
}

interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}

const fetchDriverSchedules = async (page = 5, pageSize = 10): Promise<PaginatedResponse<Event>> => {
    try {
        const Token = JSON.parse(localStorage.getItem('User-Token'));
        if (!Token || !Token.access) {
            console.error('Access token not found in localStorage.');
            return { count: 0, next: null, previous: null, results: [] };
        }
        const response = await fetch(`http://127.0.0.1:8000/api/schedule/?page=${page}&page_size=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token.access}`,
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching schedules:', error);
        return { count: 0, next: null, previous: null, results: [] };
    }
};

export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2023, 0, 20),
        to: addDays(new Date(2023, 0, 20), 20)
    });

    const [schedules, setSchedules] = React.useState<Event[]>([]);
    const [newScheduleDate, setNewScheduleDate] = React.useState<string>('');
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState<number>(1);
    const [pageSize] = React.useState<number>(10); // Adjust the page size if needed
    const [totalPages, setTotalPages] = React.useState<number>(1);

    const handleAddSchedule = async () => {
        if (newScheduleDate) {
            try {
                const Token = JSON.parse(localStorage.getItem('User-Token'));
                if (!Token || !Token.access) {
                    console.error('Access token not found in localStorage.');
                    return;
                }
                const response = await fetch('http://127.0.0.1:8000/api/schedule/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${Token.access}`,
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        start_time: newScheduleDate,
                        end_time: newScheduleDate,
                        title: 'New Event',
                        description: 'New Description'
                    })
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSchedules([...schedules, data]);
                setNewScheduleDate('');
            } catch (error) {
                console.error('Error adding schedule:', error);
            }
        }
    };

    // Effect to fetch driver schedules when the component mounts or when page changes
    React.useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await fetchDriverSchedules(page, pageSize);
                setSchedules(data.results);
                setTotalPages(Math.ceil(data.count / pageSize));
            } catch (error) {
                setError('Failed to fetch schedules. Please try again later.');
            }
        };

        fetchSchedules();
    }, [page, pageSize]); // Dependencies array includes page and pageSize

    // Create a modifiers object to mark scheduled dates
    let modifiers;
    try {
        if (!Array.isArray(schedules)) {
            throw new Error('Schedules is not an array');
        }
        modifiers = {
            scheduled: schedules.map(event => new Date(event.start_time))
        };
    } catch (err) {
        console.error('Error in creating modifiers:', err);
        modifiers = { scheduled: [] };
    }

    // Define custom class names for the modifiers
    const modifiersClassNames = {
        scheduled: 'bg-red-500 text-white'
    };

    return (
        <div className={cn('grid gap-4 p-4 md:grid-cols-1', className)}>
            {error && (
                <div className="w-full text-red-600 text-center">
                    {error}
                </div>
            )}
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
            <div className="w-full mt-4">
                <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
                <ul className="text-center mt-2 text-red-600">
                    {Array.isArray(schedules) && schedules.map((event) => (
                        <li key={event.id} className="list-disc list-inside mb-2">
                            <div>
                                <strong>Title:</strong> {event.title}
                            </div>
                            <div>
                                <strong>Description:</strong> {event.description}
                            </div>
                            <div>
                                <strong>Start Time:</strong> {format(new Date(event.start_time), 'LLL dd, y hh:mm a')}
                            </div>
                            <div>
                                <strong>End Time:</strong> {format(new Date(event.end_time), 'LLL dd, y hh:mm a')}
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-center mt-4">
                    <Button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>
                        Previous
                    </Button>
                    <span className="mx-4">Page {page} of {totalPages}</span>
                    <Button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}









