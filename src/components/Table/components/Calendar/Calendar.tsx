import { useEffect, useState } from "react";

type CalendarProps = {
  callback: (startDate: Date | undefined, endDate: Date | undefined) => void;
};

export const Calendar: React.FC<CalendarProps> = ({ callback }) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  useEffect(() => {
    callback(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div>
      <div>
        <span>Дата начала</span>
        <input
          type="date"
          onChange={(e) =>
            setStartDate(e.target.value ? new Date(e.target.value) : undefined)
          }
        ></input>
      </div>
      <div>
        <span>Дата конца</span>
        <input
          type="date"
          onChange={(e) =>
            setEndDate(e.target.value ? new Date(e.target.value) : undefined)
          }
        ></input>
      </div>
    </div>
  );
};
