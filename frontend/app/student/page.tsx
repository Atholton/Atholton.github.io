"use client"

import { useEffect, useState } from "react"
import { MainNav } from "@/components/main-nav"
import { ClassCard } from "@/components/class-card"
import { BellSchedule } from "@/components/bell-schedule"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getStudent, getAnnouncements, type Student, type Announcement } from "@/lib/api/student"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function StudentDashboard() {
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<Student | null>(null);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  useEffect(() => {
    let mounted = true;

    async function loadData() {
      try {
        // Wait for session to be loaded
        if (status === 'loading') {
          return;
        }

        // Get email from session.user.email
        const userEmail = session?.user?.email;
        if (!userEmail) {
          throw new Error('No user email found');
        }

        setLoading(true);
        setError(null);

        const [studentData, announcementsData] = await Promise.all([
          getStudent(userEmail),
          getAnnouncements(1)
        ]);

        if (!mounted) return;

        setStudent(studentData.student);
        setAnnouncements(announcementsData.results);
      } catch (err) {
        console.error('Error loading data:', err);
        if (!mounted) return;
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
    };
  }, [session, status]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-600 dark:text-red-400">
          {error || 'Failed to load student data'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <MainNav userType="student" />

      <main className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-normal mb-2 text-gray-700 dark:text-gray-300">Welcome</h2>
            <h1 className="text-4xl font-bold dark:text-white">{student.name.toUpperCase()}</h1>
            <p className="mt-4 font-mono text-2xl dark:text-gray-200">
              TODAY'S DATE:{" "}
              <span className="text-raider-green dark:text-green-400">
                {format(new Date(), "MMMM d, yyyy").toUpperCase()}
              </span>
            </p>
          </div>

          <Button 
            className="bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white text-xl px-8 py-6 h-auto rounded-lg transition-colors"
            onClick={() => {
              // TODO: Implement sign out functionality
              console.log('Sign out clicked');
            }}
          >
            Sign Out
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl mb-6 dark:text-white">MY CLASSES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* TODO: Replace with actual class data */}
            <ClassCard 
              teacher={`${student.teacher.first_name} ${student.teacher.last_name}`}
              room="B125" 
              date={format(new Date(), "MMMM d, yyyy").toUpperCase()} 
              status="approved" 
            />
          </div>
          <div className="text-right mt-2">
            <Link href="/student/all">
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
          <h2 className="text-3xl mb-4 dark:text-white">STUDENT DASHBOARD</h2>
          <div className="bg-white dark:bg-gray-800 rounded-md shadow-md p-6 transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Contact Information</h3>
                <p className="dark:text-gray-300">Email: {student.hcpss_email}</p>
                {student.account_email && (
                  <p className="dark:text-gray-300">Personal Email: {student.account_email}</p>
                )}
                {student.phone_num && (
                  <p className="dark:text-gray-300">Phone: {student.phone_num}</p>
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-200">Announcements</h3>
                <div className="space-y-2">
                  {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                      <div key={announcement.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                        <h4 className="font-medium dark:text-gray-200">{announcement.title}</h4>
                        <p className="text-sm dark:text-gray-300">{announcement.body}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {format(new Date(announcement.timestamp), "MMM d, yyyy")}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No announcements available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}