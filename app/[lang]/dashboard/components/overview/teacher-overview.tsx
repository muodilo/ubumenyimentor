import { PlusIcon } from "lucide-react";
import AddCourseModal from "@/components/custom/AddCourseModal";

export const TeacherOverview: React.FC = () => {
    return (
        <div className="">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Welcome back Teacher!</h1>
                <AddCourseModal />
            </div>
        </div>
    );
}