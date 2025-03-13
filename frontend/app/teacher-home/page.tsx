import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"

export default function TeacherHome() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavigationBar userType="teacher" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-raider-green">
              ATHOLTON HIGH SCHOOL
              <br />
              RAIDER TIME
            </h1>
            <p className="text-sm text-raider-green">TEACHER HOME</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">My Open Rooms</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-36">{/* Open rooms content */}</div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">My Pre-Placed Students</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-36">{/* Students content */}</div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Students</h2>
            <div className="border border-gray-300 rounded-sm">
              <table className="w-full text-sm">
                <thead className="bg-raider-green text-white">
                  <tr>
                    <th className="p-1 text-left">Student</th>
                    <th className="p-1 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="p-1">John Doe</td>
                    <td className="p-1 text-right">
                      <Button variant="outline" className="text-xs h-6 py-0 px-2">
                        Remove
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1">Jane Smith</td>
                    <td className="p-1 text-right">
                      <Button variant="outline" className="text-xs h-6 py-0 px-2">
                        Remove
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

