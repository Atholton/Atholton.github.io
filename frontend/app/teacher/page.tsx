import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"

export default function TeacherDashboard() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavigationBar userType="teacher" userName="MS SMITH" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">MS SMITH</h1>
            <Button className="bg-raider-green hover:bg-raider-lightgreen text-white text-xs py-1 h-auto">PRINT</Button>
          </div>

          <p className="text-sm mb-4">TODAY'S DATE: MARCH 8, 2023</p>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">MY REQUESTS</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="bg-white border border-gray-300 rounded-full p-2 inline-flex items-center justify-center w-12 h-12 mb-2">
                  <span className="text-raider-green text-2xl">✓</span>
                </div>
                <p className="text-sm">Create</p>
              </div>
              <div className="text-center">
                <div className="bg-white border border-gray-300 rounded-full p-2 inline-flex items-center justify-center w-12 h-12 mb-2">
                  <span className="text-raider-red text-2xl">✗</span>
                </div>
                <p className="text-sm">Revoke</p>
              </div>
              <div className="text-center">
                <div className="bg-white border border-gray-300 rounded-full p-2 inline-flex items-center justify-center w-12 h-12 mb-2">
                  <span className="text-raider-blue text-2xl">?</span>
                </div>
                <p className="text-sm">History</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">TEACHER DASHBOARD</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-24">{/* Dashboard content */}</div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">RAIDER NEWS</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-24">{/* News content */}</div>
          </div>

          <div>
            <h2 className="font-semibold mb-2">BELL SCHEDULE</h2>
            <div className="border border-gray-300 p-2 rounded-sm">
              <div className="bell-schedule-item">Period 1: 7:25am - 8:45am</div>
              <div className="bell-schedule-item">Period 2: 8:50am - 10:10am</div>
              <div className="bell-schedule-item">Raider Time: 10:15am - 11:00am</div>
              <div className="bell-schedule-item">Period 3: 11:05am - 1:05pm</div>
              <div className="bell-schedule-item">Period 4: 1:10pm - 2:30pm</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

