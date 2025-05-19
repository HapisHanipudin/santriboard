export function isAdmin(user: any): boolean {
  return user.role === "ADMIN";
}

export function isTeacher(user: any): boolean {
  return user.role === "TEACHER" && user.teacher !== null;
}

export function isKadiv(user: any): boolean {
  return (
    isTeacher(user) &&
    user.teacher.divisions.some(
      ({ division, role }: { division: any; role: string }) => {
        return role === "KADIV";
      }
    )
  );
}
