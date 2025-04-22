import { Check, X, Clock } from "lucide-react"

interface ClassCardProps {
  teacher: string
  room: string
  date: string
  status: "approved" | "denied" | "pending"
}

export function ClassCard({ teacher, room, date, status }: ClassCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-raider-green"
      case "denied":
        return "bg-raider-red"
      case "pending":
        return "bg-raider-blue"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="size-6 text-white" />
      case "denied":
        return <X className="size-6 text-white" />
      case "pending":
        return <Clock className="size-6 text-white" />
      default:
        return null
    }
  }

  const getBorderColor = (status: string) => {
    switch (status) {
      case "approved":
        return "border-raider-green dark:border-green-600"
      case "denied":
        return "border-raider-red dark:border-red-600"
      case "pending":
        return "border-raider-blue dark:border-blue-600"
      default:
        return "border-gray-500"
    }
  }

  return (
    <div className={`rounded-xl overflow-hidden border-2 ${getBorderColor(status)} transition-colors duration-300`}>
      <div className="p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold dark:text-white">{teacher}</h3>
            <p className="text-xl dark:text-gray-300">{room}</p>
          </div>
          <div className={`rounded-full p-1 ${getStatusColor(status)}`}>{getStatusIcon(status)}</div>
        </div>
      </div>
      <div className={`p-3 ${getStatusColor(status)} text-white text-center text-lg`}>{date}</div>
    </div>
  )
}