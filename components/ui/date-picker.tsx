"use client";

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithPresets({
  selected,
  onSelect,
  fromDate,
  showDayNavigation = true,
  showOutsideDays = true,
  className,
}: {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  fromDate?: Date
  showDayNavigation?: boolean
  showOutsideDays?: boolean
  className?: string
}) {
  const [date, setDate] = React.useState<Date | undefined>(selected)

  React.useEffect(() => {
    setDate(selected)
  }, [selected])

  const handleSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    onSelect(newDate)
  }

  // Preset dates
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // Next Monday
  const nextMon = new Date(today)
  nextMon.setDate(today.getDate() + ((1 + 7 - today.getDay()) % 7 || 7))

  // Next Week
  const nextWeek = new Date(today)
  nextWeek.setDate(today.getDate() + 7)

  const presets = [
    { label: "Today", value: today },
    { label: "Tomorrow", value: tomorrow },
    { label: "Next Monday", value: nextMon },
    { label: "Next Week", value: nextWeek },
  ]

  return (
    <div className={cn("grid gap-2", className)}>
      <div className="grid grid-cols-2 gap-2 p-2">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            onClick={() => handleSelect(preset.value)}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      <div className="border-t border-border p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          fromDate={fromDate}
          showOutsideDays={showOutsideDays}
          className="p-0"
          classNames={{
            nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            cell: "h-9 w-9 p-0 text-center text-sm",
            day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            day_selected:
              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_hidden: "invisible",
          }}
          components={{
            IconLeft: () => showDayNavigation ? <span className="h-4 w-4">◀</span> : null,
            IconRight: () => showDayNavigation ? <span className="h-4 w-4">▶</span> : null,
          }}
        />
      </div>
    </div>
  )
}
