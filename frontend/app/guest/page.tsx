import { NavigationBar } from "@/components/navigation-bar"
import Image from "next/image"

export default function GuestPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavigationBar userType="guest" currentDate="MARCH 8, 2023" />

      <div className="p-4">
        <div className="bg-black text-raider-green p-6 rounded-md shadow-md">
          <div className="space-y-2 mb-6">
            <h1 className="text-xl font-bold">Welcome to Atholton</h1>
            <h2 className="text-lg font-semibold">Raider Time Lorem</h2>
            <p>Ipsum Dimsum Din Tal</p>
            <p>Fung Dih Delor Sit Amet</p>
          </div>

          <div className="w-full h-64 relative rounded-md overflow-hidden">
            <Image
              src="/placeholder.svg?height=256&width=512"
              alt="Atholton High School Hallway"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

