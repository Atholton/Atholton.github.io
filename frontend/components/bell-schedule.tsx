interface BellScheduleProps {
  className?: string
}

export function BellSchedule({ className = "" }: BellScheduleProps) {
  const schedule = [
    { period: "Period 1", time: "7:50 am - 8:35 am" },
    { period: "Period 2", time: "8:40 am - 9:25 am" },
    { period: "Raider Time", time: "9:25 am - 9:55 am" },
    { period: "Period 3", time: "10:00 am - 10:50 am" },
    { period: "Period 4", time: "10:55 am - 12:55 pm" },
    { period: "A Lunch", time: "10:55 am - 11:25 am" },
    { period: "B Lunch", time: "11:25 am - 11:55 am" },
    { period: "C Lunch", time: "11:55 am - 12:25 pm" },
    { period: "D Lunch", time: "12:25 pm - 12:55 pm" },
    { period: "Period 5", time: "1:00 pm - 1:45 pm" },
    { period: "Period 6", time: "1:50 pm - 2:35 pm" },
  ]

  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-md ${className} transition-colors duration-300`}>
      {schedule.map((item, index) => (
        <div key={index} className="flex gap-2 text-sm py-0.5 dark:text-gray-200">
          <span className="min-w-[100px] font-medium">{item.period}</span>
          <span>{item.time}</span>
        </div>
      ))}
    </div>
  )
}