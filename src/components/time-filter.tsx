"use client"

import { useState } from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function TimeFilter() {
  const [timeInterval, setTimeInterval] = useState("days")

  return (
    <Select value={timeInterval} onValueChange={setTimeInterval}>
      <SelectTrigger className="w-full sm:w-[150px]">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Time Interval</SelectLabel>
          <SelectItem value="days">Days</SelectItem>
          <SelectItem value="months">Months</SelectItem>
          <SelectItem value="years">Years</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

