export const homeFor = (role: string) =>
  role === "TEACHER" ? "/teacher/subjects" : role === "ADMIN" ? "/admin/users" : "/home";

/** where /profile sends a user who isn't a student */
export const profileFor = (role: string) => (role === "TEACHER" ? "/teacher/profile" : homeFor(role));