"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "../ui/dropdown-menu"
  
import {useDispatch} from "react-redux";
import {setSearchFilters} from "../../redux/Search/searchAction"
import {SearchFilters} from "../../redux/Search/searchTypes"

export const SearchBar = ({ onSearch }: { onSearch: () => void }) => {
  const [dateFrom, setDateFrom] = React.useState<Date>()
  const [dateTo, setDateTo] = React.useState<Date>()
  const [category, setCategory] = React.useState<string>("Select Category")

  const dispatch = useDispatch();


  const handleSearch = () => {
    const filters: SearchFilters = {
      dateFrom: dateFrom ? format(dateFrom, "yyyy-MM-dd") : null,
      dateTo: dateTo ? format(dateTo, "yyyy-MM-dd") : null,
      category,
    };

    dispatch(setSearchFilters(filters));
  };

  return (
    
    <div className="mt-6 sm:mt-0 flex flex-col items-center">
    <h1 className="text-4xl font-bold text-white mb-5">Find a Car</h1>
       <div className="flex flex-row">
        
        <div>
        <Popover>
          <PopoverTrigger asChild>
           <Button
            variant={"outline"}
             className={cn(
              "w-[130px] sm:w-[280px] h-20 sm:h-9 justify-start text-left font-normal rounded-l-full bg-yellow-500 text-white","whitespace-normal break-words  bg-neutral-950 border-gray-700"
            
             )}
            >
            <CalendarIcon className="mr-2 h-4 w-4 text-sm" />
            {dateFrom ? format(dateFrom, "PPP") : <span>From</span>}
             </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={setDateFrom}
              initialFocus
             />
            </PopoverContent>
           </Popover>
        </div>
        <div>
        <Popover>
          <PopoverTrigger asChild>
           <Button
            variant={"outline"}
             className={cn(
              "w-[130px] sm:w-[280px] h-20 sm:h-9 justify-start text-left font-normal bg-yellow-500 text-white","whitespace-normal break-words bg-neutral-950 border-gray-700"
            
             )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateTo ? format(dateTo, "PPP") : <span>To</span>}
             </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={setDateTo}
              initialFocus
             />
            </PopoverContent>
           </Popover>
        </div>
        <div>
        <DropdownMenu>
           <DropdownMenuTrigger className="text-sm text-white border border-gray-800 p-1.75 rounded-r-full bg-neutral-950 w-[130px] sm:w-[280px] h-20 sm:h-9 hover:bg-white hover:text-black">
            {category}</DropdownMenuTrigger >
           <DropdownMenuContent >
           
              <DropdownMenuItem onSelect={() => setCategory("5 seater")}>5 seater</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setCategory("7 seater")}>7 seater</DropdownMenuItem>             
           </DropdownMenuContent>
        </DropdownMenu>

        </div>
    </div>
      <div>
        <Button className="text-lg h-10 w-40 mt-8 font-bold bg-yellow-500 rounded-md" onClick={()=>{handleSearch(); onSearch();}} >Search</Button>
      </div>
    </div>
    
    
    
  )
}
