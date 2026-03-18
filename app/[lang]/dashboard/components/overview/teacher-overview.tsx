import { PlusIcon } from "lucide-react";

export const TeacherOverview: React.FC = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Welcome back Teacher!</h1>
                <button className="flex items-center bg-[#ff7500] px-5 py-2 rounded-lg text-white cursor-pointer">
                    <PlusIcon/>
                    <p>Add Course</p>
                </button>
            </div>
        </div>
    );
}