/** Bases **/

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

/** Extends **/

interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string;
  kind: "background";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
