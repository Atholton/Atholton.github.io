import { MainNav } from "@/components/main-nav"
import { ClassCard } from "@/components/class-card"
import { Button } from "@/components/ui/button"

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MainNav />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-normal mb-2">Welcome</h2>
            <h1 className="text-4xl font-bold">JOHN SMITH</h1>
            <p className="mt-4 font-mono text-2xl">
              TODAY'S DATE: <span className="text-raider-green">MARCH 9, 2025</span>
            </p>
          </div>

          <Button className="bg-raider-green hover:bg-raider-lightgreen text-white text-xl px-8 py-6 h-auto rounded-lg">
            Sign Out
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl mb-6">MY CLASSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ClassCard teacher="MS RHEE" room="B125" date="MARCH 12, 2025" status="approved" />
            <ClassCard teacher="MS RHEE" room="B125" date="MARCH 19, 2025" status="denied" />
            <ClassCard teacher="MS RHEE" room="B125" date="MARCH 26, 2025" status="pending" />
          </div>
        </section>

        <div className="flex justify-between items-center">
          <h2 className="text-3xl">STUDENT DASHBOARD</h2>
          <Button variant="link" className="text-lg underline">
            VIEW ALL
          </Button>
        </div>
      </main>
    </div>
  )
}

