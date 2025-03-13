import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"

export default function StudentHome() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavigationBar userType="student" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-white rounded-md shadow-md p-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-raider-green">
              ATHOLTON HIGH SCHOOL
              <br />
              RAIDER TIME
            </h1>
            <p className="text-sm text-raider-green">STUDENT HOME</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">My Classes</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-36">{/* Classes content */}</div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2">Open Rooms</h2>
            <div className="border border-gray-300 p-2 rounded-sm h-36">{/* Open rooms content */}</div>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-1">Submit Request For A Teacher</p>
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen text-white">SUBMIT</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

