export const homeFor = (role: string) =>
  role === "TEACHER" ? "/teacher/subjects" : role === "ADMIN" ? "/admin/users" : "/subjects";