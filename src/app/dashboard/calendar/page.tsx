import React from 'react'
import { CalendarDateRangePicker } from '../../../../components/date-range-picker'

export default function page() {
  return (
    <div className=' min-h-[100vh]'>
        <CalendarDateRangePicker isDriver={false} />
    </div>
  )
}
