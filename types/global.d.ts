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

type Field = "TAHFIZH" | "IT" | "BAHASA" | "KARAKTER";
