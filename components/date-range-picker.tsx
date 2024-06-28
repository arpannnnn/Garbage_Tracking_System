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
//     '2024-06-15',
//     '2024-06-10',
//     '2024-06-17',
//     '2024-06-25',
// ];


// // Function to fetch driver schedules from the server (commented out for now)
// // const fetchDriverSchedules = () => {
// //     return new Promise<string[]>((resolve) => {
// //         // Simulate API call delay
// //         setTimeout(() => {
// //             resolve(hardcodedSchedules);
// //         }, 1000); // Simulate 1 second delay
// //     });
// // };


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



// 'use client';
// import { useState, useEffect } from 'react';
// import { Button } from '../components/ui/button';
// import { Calendar } from '../components/ui/calendar';
// import { cn } from '../src/app/lib/utils';
// import { format, parseISO } from 'date-fns';
// import * as React from 'react';
// import { DateRange } from 'react-day-picker';

// interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
//     isDriver: boolean;
// }

// export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
//     const [date, setDate] = useState<DateRange | undefined>({
//         from: new Date(2023, 0, 20),
//         to: new Date(2023, 0, 20)
//     });

//     const [events, setEvents] = useState([]);
//     const [nextPage, setNextPage] = useState(null);
//     const [prevPage, setPrevPage] = useState(null);
//     const [currentPage, setCurrentPage] = useState('http://127.0.0.1:8000/api/schedule/');
//     const token = JSON.parse(localStorage.getItem("User-Token"));
//     useEffect(() => {
//         fetch(currentPage, {
//             headers: {
//                 Authorization: `Bearer ${token.access}` // Replace with your authentication token if needed
//             }
//         })
//             .then(response => response.json())
//             .then(data => {
//                 setEvents(data.results);
//                 setNextPage(data.next);
//                 setPrevPage(data.previous);
//             })
//             .catch(error => console.error('Error fetching events:', error));
//     }, [currentPage]);

//     const handleNextPage = () => {
//         if (nextPage) {
//             setCurrentPage(nextPage);
//         }
//     };

//     const handlePrevPage = () => {
//         if (prevPage) {
//             setCurrentPage(prevPage);
//         }
//     };

//     // Create a modifiers object to mark scheduled dates
//     const modifiers = {
//         scheduled: events.map(event => parseISO(event.start_time))
//     };

//     // Define custom class names for the modifiers
//     const modifiersClassNames = {
//         scheduled: 'bg-red-500 text-white'
//     };

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
//                     className="rounded-lg border border-gray-300"
//                 />
//             </div>
//             {isDriver && (
//                 <div className="mt-4 w-full">
//                     <h3 className="text-lg font-semibold">Schedule a Pickup</h3>
//                     <div className="flex flex-col md:flex-row items-center gap-2 mt-2">
//                         <input
//                             type="date"
//                             className="border p-2 rounded w-full md:w-auto"
//                         />
//                         <Button className="w-full md:w-auto">
//                             Add Schedule
//                         </Button>
//                     </div>
//                 </div>
//             )}
//             <div className="w-full mt-4">
//                 <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
//                 <ul className="text-center mt-2 text-red-600">
//                     {events.map((event) => (
//                         <li key={event.id} className="list-disc list-inside">
//                             {format(parseISO(event.start_time), 'LLL dd, y')} - {event.title}: {event.description}
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="flex justify-between mt-4">
//                     <Button onClick={handlePrevPage} disabled={!prevPage} className="w-full md:w-auto">
//                         Previous
//                     </Button>
//                     <Button onClick={handleNextPage} disabled={!nextPage} className="w-full md:w-auto">
//                         Next
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Calendar } from '../components/ui/calendar';
import { cn } from '../src/app/lib/utils';
import { format, parseISO, startOfMonth } from 'date-fns';
import * as React from 'react';
import { DateRange } from 'react-day-picker';

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    isDriver: boolean;
}

export function CalendarDateRangePicker({ className, isDriver }: CalendarDateRangePickerProps) {
    const [date, setDate] = useState<DateRange | undefined>({
        from: new Date(),
        to: new Date()
    });

    const [events, setEvents] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [currentPage, setCurrentPage] = useState('http://127.0.0.1:8000/api/schedule/');
    const token=JSON.parse(localStorage.getItem("User-Token"));
    useEffect(() => {
        fetch(currentPage, {
            headers: {
                Authorization: `Bearer  ${token.access}` // Replace with your authentication token if needed
            }
        })
            .then(response => response.json())
            .then(data => {
                setEvents(data.results);
                setNextPage(data.next);
                setPrevPage(data.previous);

                // Determine the latest event date to set the default month
                if (data.results.length > 0) {
                    const latestEvent = data.results[data.results.length - 1];
                    const latestEventDate = parseISO(latestEvent.start_time);
                    setDate({
                        from: startOfMonth(latestEventDate),
                        to: latestEventDate
                    });
                }
            })
            .catch(error => console.error('Error fetching events:', error));
    }, [currentPage]);

    const handleNextPage = () => {
        if (nextPage) {
            setCurrentPage(nextPage);
        }
    };

    const handlePrevPage = () => {
        if (prevPage) {
            setCurrentPage(prevPage);
        }
    };

    // Create a modifiers object to mark scheduled dates
    const modifiers = {
        scheduled: events.map(event => parseISO(event.start_time))
    };

    // Define custom class names for the modifiers
    const modifiersClassNames = {
        scheduled: 'bg-red-500 text-white'
    };

    return (
        <div className={cn('grid gap-4 p-4 md:grid-cols-1', className)}>
            <div className="w-full p-0">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date.from} // Set the default month based on the latest event date
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
                            className="border p-2 rounded w-full md:w-auto"
                        />
                        <Button className="w-full md:w-auto">
                            Add Schedule
                        </Button>
                    </div>
                </div>
            )}
            <div className="w-full mt-4">
                <h3 className="text-lg font-semibold flex justify-center items-center text-black">Scheduled Pickups</h3>
                <ul className="text-center mt-2 text-red-600">
                    {events.map((event) => (
                        <li key={event.id} className="list-disc list-inside">
                            {format(parseISO(event.start_time), 'LLL dd, y')} - {event.title}: {event.description}
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between mt-4">
                    <Button onClick={handlePrevPage} disabled={!prevPage} className="w-full md:w-auto">
                        Previous
                    </Button>
                    <Button onClick={handleNextPage} disabled={!nextPage} className="w-full md:w-auto">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
