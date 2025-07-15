import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DatePickerProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DatePicker({ date, onDateChange, placeholder = "Selecciona una fecha" }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          disabled={(date) => date < new Date()}
          initialFocus
          className="p-3 pointer-events-auto"
        />
        <div className="p-3 border-t space-y-2">
          <div className="text-sm font-medium text-muted-foreground mb-2">Accesos rápidos:</div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const date = new Date();
                date.setDate(date.getDate() + 7);
                onDateChange(date);
              }}
            >
              7 días
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const date = new Date();
                date.setMonth(date.getMonth() + 1);
                onDateChange(date);
              }}
            >
              1 mes
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}