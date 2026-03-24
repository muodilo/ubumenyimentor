import { TeacherOverview } from "./overview/teacher-overview"
import { StudentOverview } from "./overview/student-overview"
import { AdminOverview } from "./overview/admin-overview"
export const overviewPages = [
    {
        id:"teacher-overview",
        components:TeacherOverview,
        roles:['TEACHER']
    },
    {
        id:"student-overview",
        components:StudentOverview,
        roles:['STUDENT']
    },
    {
        id:"student-overview",
        components:AdminOverview,
        roles:['ADMIN']
    },
]