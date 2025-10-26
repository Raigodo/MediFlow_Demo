/**
 * Shadcn Datetime Picker with support for timezone, date and time selection, minimum and maximum date limits, and 12-hour format...
 * Check out the live demo at https://shadcn-datetime-picker-pro.vercel.app/
 * Find the latest source code at https://github.com/huybuidac/shadcn-datetime-picker
 */
import { useLocalDate } from '@/lib/hooks/locale/useLocalDate';
import { cn } from '@/lib/utils';
import {
    addMonths,
    endOfMonth,
    endOfYear,
    format,
    getMonth,
    getYear,
    setMonth as setMonthFns,
    setYear,
    startOfMonth,
    startOfYear,
    subMonths,
} from 'date-fns';
import { lv } from 'date-fns/locale';
import {
    CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from 'lucide-react';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DayPicker, Matcher, TZDate } from 'react-day-picker';
import { Button, buttonVariants } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

export type CalendarProps = Omit<React.ComponentProps<typeof DayPicker>, 'mode'>;

export type DatePickerProps = {
    /**
     * The modality of the popover. When set to true, interaction with outside elements will be disabled and only popover content will be visible to screen readers.
     * If you want to use the datetime picker inside a dialog, you should set this to true.
     * @default false
     */
    modal?: boolean;
    /**
     * The datetime value to display and control.
     */
    value: Date | undefined;
    /**
     * Callback function to handle datetime changes.
     */
    onChange: (date: Date | undefined) => void;
    /**
     * The minimum datetime value allowed.
     * @default undefined
     */
    min?: Date;
    /**
     * The maximum datetime value allowed.
     */
    max?: Date;
    /**
     * The timezone to display the datetime in, based on the date-fns.
     * For a complete list of valid time zone identifiers, refer to:
     * https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
     * @default undefined
     */
    timezone?: string;
    /**
     * Whether the datetime picker is disabled.
     * @default false
     */
    disabled?: boolean;
    /**
     * Custom class names for the component.
     */
    classNames?: {
        /**
         * Custom class names for the trigger (the button that opens the picker).
         */
        trigger?: string;
    };
    /**
     * Custom render function for the trigger.
     */
    renderTrigger?: (props: DateTimeRenderTriggerProps) => React.ReactNode;
};

export type DateTimeRenderTriggerProps = {
    value: Date | undefined;
    open: boolean;
    timezone?: string;
    disabled?: boolean;
    use12HourFormat?: boolean;
    setOpen: (open: boolean) => void;
};

export function DatePicker({
    value,
    onChange,
    renderTrigger,
    min,
    max,
    timezone,
    disabled,
    classNames,
    modal = false,
    ...props
}: DatePickerProps & CalendarProps) {
    const { shorterDate } = useLocalDate();
    const [open, setOpen] = useState(false);
    const [monthYearPicker, setMonthYearPicker] = useState<'month' | 'year' | false>(false);
    const initDate = useMemo(
        () => (value ? new TZDate(value || new Date(), timezone) : undefined),
        [value, timezone],
    );

    const [month, setMonth] = useState<Date | undefined>(initDate);
    const [date, setDate] = useState<Date | undefined>(initDate);

    const today = useMemo(() => new Date(), []);

    const endMonth = useMemo(() => {
        return setYear(month ?? today, getYear(month ?? today) + 1);
    }, [month, today]);
    const minDate = useMemo(() => (min ? new TZDate(min, timezone) : undefined), [min, timezone]);
    const maxDate = useMemo(() => (max ? new TZDate(max, timezone) : undefined), [max, timezone]);

    const onDayChanged = useCallback(
        (d: Date) => {
            d.setHours(date?.getHours() ?? 0, date?.getMinutes() ?? 0, date?.getSeconds() ?? 0);
            if (min && d < min) {
                d.setHours(min.getHours(), min.getMinutes(), min.getSeconds());
            }
            if (max && d > max) {
                d.setHours(max.getHours(), max.getMinutes(), max.getSeconds());
            }

            if (d.getDate() === date?.getDate()) {
                setDate(undefined);
            } else {
                setDate(d);
            }
        },
        [setDate, date, min, max],
    );

    const onMonthYearChanged = useCallback(
        (d: Date, mode: 'month' | 'year') => {
            setMonth(d);
            if (mode === 'year') {
                setMonthYearPicker('month');
            } else {
                setMonthYearPicker(false);
            }
        },
        [setMonth, setMonthYearPicker],
    );
    const onNextMonth = useCallback(() => {
        setMonth(addMonths(month ?? today, 1));
    }, [month, today]);
    const onPrevMonth = useCallback(() => {
        setMonth(subMonths(month ?? today, 1));
    }, [month, today]);

    useEffect(() => {
        if (open && initDate) {
            setDate(initDate);
            setMonth(initDate);
            setMonthYearPicker(false);
        } else if (!open) {
            setDate(undefined);
        }
    }, [open, initDate]);

    const displayValue = useMemo(() => {
        if (!open && !value) return value;
        return open ? date : initDate;
    }, [date, value, open, initDate]);

    const dislayFormat = useMemo(() => {
        return shorterDate(displayValue, 'Pick a date');
    }, [displayValue, shorterDate]);

    function handleOpenChange(isOpen: boolean) {
        if (disabled) {
            setOpen(false);
            return;
        }
        setOpen(isOpen);
    }

    const onSubmit = useCallback(() => {
        onChange(date);
        setOpen(false);
    }, [date, onChange]);

    return (
        <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
            <PopoverTrigger asChild>
                {renderTrigger ? (
                    renderTrigger({
                        value: displayValue,
                        open,
                        timezone,
                        disabled,
                        setOpen,
                    })
                ) : (
                    <div
                        className={cn(
                            buttonVariants({ variant: 'underline' }),
                            !displayValue && 'text-muted-foreground',
                            disabled && 'cursor-not-allowed opacity-50',
                            classNames?.trigger,
                            'flex min-w-36 justify-center',
                        )}
                        tabIndex={0}
                    >
                        <div className="flex flex-grow items-center">
                            <CalendarIcon className="mr-2 size-4" />
                            {dislayFormat}
                        </div>
                    </div>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2">
                <div className="flex items-center justify-between">
                    <div className="text-md ms-2 flex cursor-pointer items-center gap-1 font-bold">
                        <div className="space-x-1.5">
                            <span
                                className="ms-1"
                                onClick={() =>
                                    setMonthYearPicker(monthYearPicker === 'year' ? false : 'year')
                                }
                            >
                                {format(month ?? today, 'yyyy', { locale: lv })}
                            </span>
                            <span
                                onClick={() =>
                                    setMonthYearPicker(
                                        monthYearPicker === 'month' ? false : 'month',
                                    )
                                }
                            >
                                {format(month ?? today, 'MMM', { locale: lv })}
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setMonthYearPicker(monthYearPicker ? false : 'year')}
                        >
                            {monthYearPicker ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        </Button>
                    </div>
                    <div className={cn('flex space-x-2', monthYearPicker ? 'hidden' : '')}>
                        <Button type="button" variant="ghost" size="icon" onClick={onPrevMonth}>
                            <ChevronLeftIcon />
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={onNextMonth}>
                            <ChevronRightIcon />
                        </Button>
                    </div>
                </div>
                <div className="relative overflow-hidden">
                    <DayPicker
                        lang="lv"
                        locale={lv}
                        timeZone={timezone}
                        mode="single"
                        selected={date}
                        // onSelect={(d) => d && onDayChanged(d)}
                        onDayClick={(d) => d && onDayChanged(d)}
                        month={month}
                        endMonth={endMonth}
                        disabled={
                            [max ? { after: max } : null, min ? { before: min } : null].filter(
                                Boolean,
                            ) as Matcher[]
                        }
                        onMonthChange={setMonth}
                        classNames={{
                            dropdowns: 'flex w-full gap-2',
                            months: 'flex w-full h-fit',
                            month: 'flex flex-col w-full',
                            month_caption: 'hidden',
                            button_previous: 'hidden',
                            button_next: 'hidden',
                            month_grid: 'w-full border-collapse',
                            weekdays: 'flex justify-between mt-2',
                            weekday:
                                'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                            week: 'flex w-full justify-between mt-2',
                            day: 'h-9 w-9 text-center text-sm p-0 relative flex items-center justify-center [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 rounded-1',
                            day_button: cn(
                                buttonVariants({ variant: 'ghost' }),
                                'size-9 rounded-md p-0 font-normal aria-selected:opacity-100',
                            ),
                            range_end: 'day-range-end',
                            selected:
                                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-l-md rounded-r-md',
                            today: 'bg-accent text-accent-foreground',
                            outside:
                                'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
                            disabled: 'text-muted-foreground opacity-50',
                            range_middle:
                                'aria-selected:bg-accent aria-selected:text-accent-foreground',
                            hidden: 'invisible',
                        }}
                        showOutsideDays={true}
                        {...props}
                    />
                    <div
                        className={cn(
                            'absolute top-0 right-0 bottom-0 left-0',
                            monthYearPicker ? 'bg-popover' : 'hidden',
                        )}
                    ></div>
                    {monthYearPicker && (
                        <MonthYearPicker
                            value={month ?? today}
                            mode={monthYearPicker}
                            onChange={onMonthYearChanged}
                            minDate={minDate}
                            maxDate={maxDate}
                            className={cn(
                                'absolute top-0 right-0 bottom-0 left-0',
                                monthYearPicker ? '' : 'hidden',
                            )}
                        />
                    )}
                </div>

                <div className="mt-2 flex flex-row-reverse items-center justify-between">
                    <Button type="button" size={'sm'} className="px-4" onClick={onSubmit}>
                        Done
                    </Button>
                    {timezone && (
                        <div className="text-sm">
                            <span>Timezone:</span>
                            <span className="ms-1 font-semibold">{timezone}</span>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

function MonthYearPicker({
    value,
    minDate,
    maxDate,
    mode = 'month',
    onChange,
    className,
}: {
    value: Date;
    mode: 'month' | 'year';
    minDate?: Date;
    maxDate?: Date;
    onChange: (value: Date, mode: 'month' | 'year') => void;
    className?: string;
}) {
    const yearRef = useRef<HTMLDivElement>(null);
    const years = useMemo(() => {
        const years: TimeOption[] = [];
        for (let i = 1912; i < 2100; i++) {
            let disabled = false;
            const startY = startOfYear(setYear(value, i));
            const endY = endOfYear(setYear(value, i));
            if (minDate && endY < minDate) disabled = true;
            if (maxDate && startY > maxDate) disabled = true;
            years.push({ value: i, label: i.toString(), disabled });
        }
        return years;
    }, [value, minDate, maxDate]);
    const months = useMemo(() => {
        const months: TimeOption[] = [];
        for (let i = 0; i < 12; i++) {
            let disabled = false;
            const startM = startOfMonth(setMonthFns(value, i));
            const endM = endOfMonth(setMonthFns(value, i));
            if (minDate && endM < minDate) disabled = true;
            if (maxDate && startM > maxDate) disabled = true;
            months.push({
                value: i,
                label: format(new Date(0, i), 'LLL', { locale: lv }),
                disabled,
            });
        }
        return months;
    }, [value, minDate, maxDate]);

    const onYearChange = useCallback(
        (v: TimeOption) => {
            let newDate = setYear(value, v.value);
            if (minDate && newDate < minDate) {
                newDate = setMonthFns(newDate, getMonth(minDate));
            }
            if (maxDate && newDate > maxDate) {
                newDate = setMonthFns(newDate, getMonth(maxDate));
            }
            onChange(newDate, 'year');
        },
        [onChange, value, minDate, maxDate],
    );

    useEffect(() => {
        if (mode === 'year') {
            yearRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    }, [mode, value]);
    return (
        <div className={cn(className)}>
            <ScrollArea className="h-full">
                {mode === 'year' && (
                    <div className="grid grid-cols-4">
                        {years.map((year) => (
                            <div
                                key={year.value}
                                ref={year.value === getYear(value) ? yearRef : undefined}
                            >
                                <Button
                                    type="button"
                                    disabled={year.disabled}
                                    variant={getYear(value) === year.value ? 'default' : 'ghost'}
                                    className="rounded-full"
                                    onClick={() => onYearChange(year)}
                                >
                                    {year.label}
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
                {mode === 'month' && (
                    <div className="grid grid-cols-3 gap-4">
                        {months.map((month) => (
                            <Button
                                type="button"
                                key={month.value}
                                size="lg"
                                disabled={month.disabled}
                                variant={getMonth(value) === month.value ? 'default' : 'ghost'}
                                className="rounded-full"
                                onClick={() => onChange(setMonthFns(value, month.value), 'month')}
                            >
                                {month.label}
                            </Button>
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    );
}

interface TimeOption {
    value: number;
    label: string;
    disabled: boolean;
}
