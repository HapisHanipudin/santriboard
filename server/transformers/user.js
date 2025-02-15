export const userTransformer = (user) => {
  const user = {
    id: user.id,
    username: user.username,
    name: user.type === "ADMIN" ? "Admin" : user.type === "TEACHER" ? user.teacher.name : user.type === "STUDENT" ? user.student.name : user.type === "PARENT" ? user.parent.name : "Unknown",
    email: user.email,
    role: user.type,
    handle: "@" + user.username,
  };

  return user;
};
