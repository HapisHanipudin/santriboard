interface Class {
  name: string;
  division: string;
}

interface Student {
  id: number;
  name: string;
  nickname: string;
  image: string;
  birthdate: string;
  classes: Class[];
}

type teacherRole = "KADIV" | "ASATIDZ";

type Field = "TAHFIZH" | "IT" | "BAHASA" | "KARAKTER";
