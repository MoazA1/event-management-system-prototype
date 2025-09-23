import DayPicker from "@/components/DatePickers/homeDayPicker";
export default function HomePage() {
    return (
        
        <div className="mt-[0px] ml-[12px] pt-[0px]">
            <div className="mb-[20px] ml-[10px] text-[28px]">
                <h1>Tasks & Events</h1>
            </div>
            <div className="mt-[10px] ml-[5px]">
                <DayPicker />
            </div>
            
        </div>
    );
}

