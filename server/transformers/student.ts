export const studentBaseTransformer = (Student: any) => {
  return {
    id: Student.id,
    name: Student.name,
    nick: Student.nickname,
    pondok: Student.pondok,
    nis: Student.nis,
    photo: Student.photo,
    gender: Student.gender,
  };
};
