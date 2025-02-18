-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('l', 'p');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('timeline', 'stepline', 'mayor_agenda', 'minor_routine');

-- CreateEnum
CREATE TYPE "Field" AS ENUM ('TAHFIZH', 'IT', 'KARAKTER', 'BAHASA');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'STUDENT', 'FAMILY');

-- CreateEnum
CREATE TYPE "TeacherRole" AS ENUM ('ASATIDZ', 'KADIV');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Role" NOT NULL DEFAULT 'STUDENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" INTEGER,
    "familyId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teachers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TeacherRole" NOT NULL DEFAULT 'ASATIDZ',
    "nik" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teachers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "notes" TEXT,
    "type" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlpStudents" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "plp_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,

    CONSTRAINT "PlpStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Behaviors" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "type" TEXT,

    CONSTRAINT "Behaviors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plans" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDetails" (
    "id" SERIAL NOT NULL,
    "plan_id" INTEGER NOT NULL,
    "type" "PlanType" NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Divisions" (
    "id" TEXT NOT NULL,
    "name" "Field" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Divisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherDivisions" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "role" "TeacherRole" NOT NULL DEFAULT 'ASATIDZ',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherDivisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Classes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "divisionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherClasses" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classId" TEXT NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherClasses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Families" (
    "id" SERIAL NOT NULL,
    "kk" TEXT NOT NULL,
    "father_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "father_job" TEXT,
    "mother_job" TEXT,
    "children" INTEGER NOT NULL,
    "address" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Families_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "familiesId" INTEGER,
    "nik" TEXT,
    "nis" TEXT,
    "name" TEXT NOT NULL,
    "nickname" TEXT,
    "gender" "Gender",
    "birth_date" TIMESTAMP(3),
    "birth_place" TEXT,
    "birth_order" INTEGER,
    "school" TEXT,
    "height" INTEGER,
    "weight" INTEGER,
    "photo" TEXT,
    "is_active" BOOLEAN NOT NULL,
    "is_graduated" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grades" (
    "id" SERIAL NOT NULL,
    "grade" TEXT NOT NULL,
    "type" TEXT,

    CONSTRAINT "Grades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Semesters" (
    "id" SERIAL NOT NULL,
    "semester" INTEGER NOT NULL,
    "period" TEXT NOT NULL,

    CONSTRAINT "Semesters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plps" (
    "id" SERIAL NOT NULL,
    "plp" TEXT,
    "type" TEXT,

    CONSTRAINT "Plps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GradeStudents" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "grade_id" INTEGER NOT NULL,
    "semester_id" INTEGER NOT NULL,

    CONSTRAINT "GradeStudents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluations" (
    "id" SERIAL NOT NULL,
    "field" "Field" NOT NULL,
    "score" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "Evaluations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentClasses" (
    "id" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "classId" TEXT NOT NULL,
    "semesterId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StudentClasses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Users_studentId_key" ON "Users"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_familyId_key" ON "Users"("familyId");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_userId_key" ON "Teachers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Teachers_nik_key" ON "Teachers"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "PlpStudents_student_id_plp_id_semester_id_key" ON "PlpStudents"("student_id", "plp_id", "semester_id");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherDivisions_teacherId_divisionId_key" ON "TeacherDivisions"("teacherId", "divisionId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherClasses_teacherId_classId_key" ON "TeacherClasses"("teacherId", "classId");

-- CreateIndex
CREATE UNIQUE INDEX "Families_kk_key" ON "Families"("kk");

-- CreateIndex
CREATE UNIQUE INDEX "Students_nik_key" ON "Students"("nik");

-- CreateIndex
CREATE UNIQUE INDEX "Students_nis_key" ON "Students"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "Grades_grade_type_key" ON "Grades"("grade", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Semesters_semester_period_key" ON "Semesters"("semester", "period");

-- CreateIndex
CREATE UNIQUE INDEX "Plps_plp_type_key" ON "Plps"("plp", "type");

-- CreateIndex
CREATE UNIQUE INDEX "GradeStudents_student_id_grade_id_semester_id_key" ON "GradeStudents"("student_id", "grade_id", "semester_id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentClasses_studentId_classId_key" ON "StudentClasses"("studentId", "classId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "Families"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teachers" ADD CONSTRAINT "Teachers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlpStudents" ADD CONSTRAINT "PlpStudents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlpStudents" ADD CONSTRAINT "PlpStudents_plp_id_fkey" FOREIGN KEY ("plp_id") REFERENCES "Plps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlpStudents" ADD CONSTRAINT "PlpStudents_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Behaviors" ADD CONSTRAINT "Behaviors_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plans" ADD CONSTRAINT "Plans_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDetails" ADD CONSTRAINT "PlanDetails_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDivisions" ADD CONSTRAINT "TeacherDivisions_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherDivisions" ADD CONSTRAINT "TeacherDivisions_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Classes" ADD CONSTRAINT "Classes_divisionId_fkey" FOREIGN KEY ("divisionId") REFERENCES "Divisions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherClasses" ADD CONSTRAINT "TeacherClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_familiesId_fkey" FOREIGN KEY ("familiesId") REFERENCES "Families"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeStudents" ADD CONSTRAINT "GradeStudents_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeStudents" ADD CONSTRAINT "GradeStudents_grade_id_fkey" FOREIGN KEY ("grade_id") REFERENCES "Grades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GradeStudents" ADD CONSTRAINT "GradeStudents_semester_id_fkey" FOREIGN KEY ("semester_id") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluations" ADD CONSTRAINT "Evaluations_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_semesterId_fkey" FOREIGN KEY ("semesterId") REFERENCES "Semesters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentClasses" ADD CONSTRAINT "StudentClasses_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
