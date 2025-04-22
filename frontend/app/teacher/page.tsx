"use client"

import { MainNav } from "@/components/main-nav"
import { RequestCard } from "@/components/request-card"
import { BellSchedule } from "@/components/bell-schedule"
import { Button } from "@/components/ui/button"
import { OpenRoomDialog } from "@/components/open-room-dialog"
import Link from "next/link"

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="teacher" />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-normal mb-2 text-gray-700 dark:text-gray-300">Welcome</h2>
            <h1 className="text-4xl font-bold dark:text-white">MR SMITH</h1>
            <p className="mt-4 font-mono text-2xl dark:text-gray-200">
              TODAY'S DATE: <span className="text-raider-green dark:text-green-400">MARCH 9, 2025</span>
            </p>
          </div>

          <Button className="bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white text-xl px-8 py-6 h-auto rounded-lg transition-colors">
            Sign Out
          </Button>
        </div>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl dark:text-white">MY REQUESTS</h2>
            <OpenRoomDialog />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <RequestCard student="Gabby" room="B125" date="MARCH 12, 2025" status="approved" />
            <RequestCard student="Betania" room="B125" date="MARCH 19, 2025" status="denied" />
            <RequestCard student="Tiffany" room="B125" date="MARCH 26, 2025" status="pending" />
          </div>
          <div className="text-right mt-2">
            <Link href="/teacher/all">
              <Button
                variant="link"
                className="text-lg underline text-raider-green dark:text-green-400 transition-colors"
              >
                VIEW ALL
              </Button>
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl mb-4 dark:text-white">TEACHER DASHBOARD</h2>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md h-48 transition-colors duration-300" />
        </section>

        <section className="mb-8">
          <h2 className="text-3xl mb-4 dark:text-white">RAIDER NEWS</h2>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md h-48 transition-colors duration-300" />
        </section>

        <section>
          <h2 className="text-3xl mb-4 dark:text-white">BELL SCHEDULE</h2>
          <BellSchedule className="shadow-md" />
        </section>
      </main>
    </div>
  )
}
