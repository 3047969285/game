import type { CourseId } from "./types";

/** 全部可用课程（读写3 优先） */
export const ALL_COURSES: CourseId[] = ["college_english_rw3", "cet4", "cet6"];

/** 默认主推课程 */
export const DEFAULT_COURSE: CourseId = "college_english_rw3";

/** 课程 Tab 显示名 */
export const COURSE_LABELS: Record<CourseId, string> = {
  college_english_rw3: "读写3",
  cet4: "四级",
  cet6: "六级",
};
