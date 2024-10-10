/** Bases **/

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

/** Extends **/

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

export interface CoursePartBasic extends CoursePartDescriptionBase {
  kind: "basic";
}

export interface CoursePartBackground extends CoursePartDescriptionBase {
  backgroundMaterial: string;
  kind: "background";
}

export interface CoursePartSpecial extends CoursePartDescriptionBase {
  requirements: string[];
  kind: "special";
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;
