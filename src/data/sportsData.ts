import { Question, QuestionCategory, QuestionType } from "../types";
import { generateID } from "../utils/LocalScorage";

const sportsData: Question[] = [
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.sports,
    "question": "Who won the 2022 NBA Championships?",
    "answers": [
      "Boston Celtics",
      "Golden State Warriors",
      "Miami Heat",
      "LA Lakers"
    ],
    "correct_answer": "Golden State Warriors",
    "value": 2
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.sports,
    "question": "Who won the Superbowl LVI (2022)?",
    "answers": [
      "Los Angeles Rams",
      "Cincinnati Bengals",
      "San Francisco 49ers",
      "New England Patriots"
    ],
    "correct_answer": "Los Angeles Rams",
    "value": 2
  },
  {
    "id": generateID(),
    "type": QuestionType.multiple,
    "category": QuestionCategory.sports,
    "question": "Which are racket sports??",
    "answers": [
      "Pickleball",
      "Tennis",
      "Badminton",
      "Squash"
    ],
    "correct_answer": [
      "Pickleball",
      "Tennis",
      "Badminton",
      "Squash"
    ],
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.sports,
    "question": "Who won 2022's NBA Finals Most Valuable Player Award?",
    "answers": [
      "Stephen Curry",
      "Andrew Wiggins",
      "Klay Thompson",
      "Andre Iguodala"
    ],
    "correct_answer": "Stephen Curry",
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.sports,
    "question": "What is the current world record for the 100 meter sprint (as of 2021)?",
    "answers": [
      "10.11 seconds",
      "8.90 seconds",
      "9.01 seconds",
      "9.58 seconds"
    ],
    "correct_answer": "9.58 seconds",
    "value": 4
  }
];

export default sportsData;