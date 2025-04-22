import { NavigationBar } from "@/components/navigation-bar"
import { Button } from "@/components/ui/button"

export default function StudentHome() {
  return (
    <main className="min-h-screen flex flex-col bg-background transition-colors duration-300">
      <NavigationBar userType="student" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-4 transition-colors duration-300">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-raider-green dark:text-green-400 transition-colors">
              ATHOLTON HIGH SCHOOL
              <br />
              RAIDER TIME
            </h1>
            <p className="text-sm text-raider-green dark:text-green-400 transition-colors">STUDENT HOME</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">My Classes</h2>
            <div className="border border-gray-300 dark:border-gray-600 p-2 rounded-sm h-36 dark:text-gray-200 transition-colors duration-300">
              {/* Classes content */}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold mb-2 dark:text-white">Open Rooms</h2>
            <div className="border border-gray-300 dark:border-gray-600 p-2 rounded-sm h-36 dark:text-gray-200 transition-colors duration-300">
              {/* Open rooms content */}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm mb-1 dark:text-gray-300">Submit Request For A Teacher</p>
            <Button className="w-full bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white transition-colors">
              SUBMIT
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}