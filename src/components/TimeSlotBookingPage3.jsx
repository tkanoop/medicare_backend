import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuthContext } from '../hooks/admin/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';

const TimeSlotBookingPage = ({ id, departmentid }) => {
  const { client } = useAuthContext();
  console.log(client);
  console.log(departmentid);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM'
  ];
  const handleSelectTime = async (time) => {
    setSelectedTime(time);
  };

  const getCurrentTimeSlot = () => {
    const currentTime = new Date();
    const currentTimeSlot = `${currentTime.getHours()}:00 ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    return currentTimeSlot;
  };


  const isTimeSlotAvailable = (time) => {
    const currentTimeSlot = getCurrentTimeSlot();
    const selectedDateStr = selectedDate.toLocaleDateString();
    console.log(selectedDate);
    const selectedDateTime = new Date(`${selectedDateStr} ${time}`);
    return selectedDateTime > new Date() || (selectedDateTime.toLocaleTimeString() === currentTimeSlot && selectedDateTime >= new Date());
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
        <div className="flex flex-col items-center justify-center h-screen -mt-36">
          <h1 className="text-2xl font-bold mb-4">Select a date and time</h1>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="datepicker" className="font-semibold">Date:</label>
              <DatePicker
                id="datepicker"
                selected={selectedDate}
                onChange={date => setSelectedDate(date)}
                dateFormat="MMMM d, yyyy"
                className="p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {timeSlots.map(time => (
                isTimeSlotAvailable(time) &&
                  <button
                    key={time}
                    className={`py-2 px-4 rounded-lg border-2 ${selectedTime === time ? 'bg-gray-200' : 'border-gray-400 hover:bg-gray-200'} ${!isTimeSlotAvailable(time) && 'text-gray-500 bg-red-300'} transition-colors duration-150`}
                    onClick={() => handleSelectTime(time)}
                  >
                    {time}
                  </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlotBookingPage;
