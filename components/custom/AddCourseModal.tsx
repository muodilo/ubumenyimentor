"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ClosedCaptionIcon, PlusIcon, X } from "lucide-react"
import { AddCourseForm } from "./AddCourseForm"
import { CourseSubmission } from "@/lib/course-schema"
import { useState } from "react"


const AddCourseModal = () => {
    const [open, setOpen] = useState(false)

    const handleSubmit = async (data: CourseSubmission) => {
        console.log('Course submission:', data)
        // Here you would typically send the data to your backend
        // await fetch('/api/courses', { method: 'POST', body: JSON.stringify(data) })
        setOpen(false)
    }

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center text-white bg-[#ff7500] px-5 py-2 rounded-lg  cursor-pointer hover:bg-[#ff8a1a] transition-colors"
            >
                <PlusIcon className="w-5 h-5 mr-2" />
                <p>Add Course</p>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                >
                    <div
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute top-3 right-3 cursor-pointer  transition-colors z-10"
                        >
                            <X/>
                        </button>
                        <div className="rounded-xl bg-background shadow-xl overflow-hidden h-[90vh]">
                            <div className="h-full overflow-y-auto p-4">
                                <AddCourseForm onSubmit={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddCourseModal