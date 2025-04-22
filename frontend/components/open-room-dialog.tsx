"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const rooms = [
  { value: "b125", label: "B125" },
  { value: "b126", label: "B126" },
  { value: "b127", label: "B127" },
  { value: "a201", label: "A201" },
  { value: "a202", label: "A202" },
  { value: "c301", label: "C301" },
  { value: "c302", label: "C302" },
  { value: "d101", label: "D101" },
  { value: "d102", label: "D102" },
]

const periods = [
  { value: "1", label: "Period 1 (7:50 am - 8:35 am)" },
  { value: "2", label: "Period 2 (8:40 am - 9:25 am)" },
  { value: "raider", label: "Raider Time (9:25 am - 9:55 am)" },
  { value: "3", label: "Period 3 (10:00 am - 10:50 am)" },
  { value: "4a", label: "Period 4A (10:55 am - 11:25 am)" },
  { value: "4b", label: "Period 4B (11:25 am - 11:55 am)" },
  { value: "4c", label: "Period 4C (11:55 am - 12:25 pm)" },
  { value: "4d", label: "Period 4D (12:25 pm - 12:55 pm)" },
  { value: "5", label: "Period 5 (1:00 pm - 1:45 pm)" },
  { value: "6", label: "Period 6 (1:50 pm - 2:35 pm)" },
]

export function OpenRoomDialog() {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [roomOpen, setRoomOpen] = useState(false)
  const [room, setRoom] = useState("")
  const [periodOpen, setPeriodOpen] = useState(false)
  const [period, setPeriod] = useState("")
  const [capacity, setCapacity] = useState("15")
  const [description, setDescription] = useState("")
  const [recurring, setRecurring] = useState("single")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setOpen(false)

      // In a real app, you would show a toast notification here
      alert("Room opened successfully!")

      // Reset form
      setDate(undefined)
      setRoom("")
      setPeriod("")
      setCapacity("15")
      setDescription("")
      setRecurring("single")
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-raider-green hover:bg-raider-lightgreen dark:bg-raider-darkgray dark:hover:bg-gray-700 text-white px-6 py-2 h-auto rounded-lg transition-colors">
          Open Room?
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold dark:text-white">Open a Room for Raider Time</DialogTitle>
          <DialogDescription>Make your classroom available for students during Raider Time.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Date
              </Label>
              <div className="col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="room" className="text-right">
                Room
              </Label>
              <div className="col-span-3">
                <Popover open={roomOpen} onOpenChange={setRoomOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={roomOpen}
                      className="w-full justify-between"
                    >
                      {room ? rooms.find((r) => r.value === room)?.label : "Select room..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search room..." />
                      <CommandList>
                        <CommandEmpty>No room found.</CommandEmpty>
                        <CommandGroup>
                          {rooms.map((r) => (
                            <CommandItem
                              key={r.value}
                              value={r.value}
                              onSelect={(currentValue) => {
                                setRoom(currentValue === room ? "" : currentValue)
                                setRoomOpen(false)
                              }}
                            >
                              <Check className={cn("mr-2 h-4 w-4", room === r.value ? "opacity-100" : "opacity-0")} />
                              {r.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Period
              </Label>
              <div className="col-span-3">
                <Popover open={periodOpen} onOpenChange={setPeriodOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={periodOpen}
                      className="w-full justify-between"
                    >
                      {period ? periods.find((p) => p.value === period)?.label : "Select period..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search period..." />
                      <CommandList>
                        <CommandEmpty>No period found.</CommandEmpty>
                        <CommandGroup>
                          {periods.map((p) => (
                            <CommandItem
                              key={p.value}
                              value={p.value}
                              onSelect={(currentValue) => {
                                setPeriod(currentValue === period ? "" : currentValue)
                                setPeriodOpen(false)
                              }}
                            >
                              <Check className={cn("mr-2 h-4 w-4", period === p.value ? "opacity-100" : "opacity-0")} />
                              {p.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <div className="text-right flex items-center justify-end">
                <Label htmlFor="capacity" className="mr-1">
                  Capacity
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum number of students allowed</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="col-span-3">
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 students</SelectItem>
                    <SelectItem value="10">10 students</SelectItem>
                    <SelectItem value="15">15 students</SelectItem>
                    <SelectItem value="20">20 students</SelectItem>
                    <SelectItem value="25">25 students</SelectItem>
                    <SelectItem value="30">30 students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="What activities will be available? Any specific subjects?"
                className="col-span-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right pt-2">Recurrence</Label>
              <RadioGroup className="col-span-3" value={recurring} onValueChange={setRecurring}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <Label htmlFor="single">One time only</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly (same day each week)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily (every school day)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="bg-raider-green hover:bg-raider-lightgreen text-white"
              disabled={isSubmitting || !date || !room || !period}
            >
              {isSubmitting ? "Opening..." : "Open Room"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
