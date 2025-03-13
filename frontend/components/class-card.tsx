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

  return (
    <div
      className={`rounded-xl overflow-hidden border-2 border-${status === "approved" ? "raider-green" : status === "denied" ? "raider-red" : "raider-blue"}`}
    >
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-2xl font-bold">{teacher}</h3>
            <p className="text-xl">{room}</p>
          </div>
          <div className={`rounded-full p-1 ${getStatusColor(status)}`}>{getStatusIcon(status)}</div>
        </div>
      </div>
      <div className={`p-3 ${getStatusColor(status)} text-white text-center text-lg`}>{date}</div>
    </div>
  )
}

