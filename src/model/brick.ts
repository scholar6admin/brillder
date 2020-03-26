
import { Question } from "components/model/question";
import { UserType } from "./user";

export enum BrickStatus {
  Draft = 1,
  Review,
  Publish
}

export interface Author {
  email: string
  firstName: string
  googleId: string
  id: number
  lastName: string
  tutorialPassed: boolean
  type: UserType
}

export interface Brick {
  id: number
  subject: string
  topic: string
  subTopic: string
  title: string
  alternativeTopics: string
  alternativeSubject: string
  created: string
  openQuestion: string
  brief: string
  prep: string
  synthesis: string
  brickLength: number
  type: number
  questions: Question[]
  author: Author
  expanded?: boolean
  status: BrickStatus
}

export enum isAuthenticated {
  None,
  True,
  False
}
