import { Router } from "express";
import { z } from "zod";

const course = z.object({
  name: z.string(),
  grade: z.string().regex(/^[A-F]$/),
  status: z.string(),
});

const CoursesSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  courses: course,
});
export type Courses = z.infer<typeof CoursesSchema>;

export const createService = (db: any) => {
  return {
    getRouter() {
      const router = Router();

      router.get("/", async (req, res) => {
        const courses: Courses[] = await db.getAll();
        res.status(200);
        res.json(courses);
      });
      return router;
    },
  };
};