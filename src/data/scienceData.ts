import { Question, QuestionCategory, QuestionType } from "../types";
import { generateID } from "../utils/LocalScorage";

const scienceData: Question[] = [
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.science,
    "question": "What is fastest land animal?",
    "answers": [
      "Cheetah",
      "Goldfish",
      "Human",
      "Bald Eagle"
    ],
    "correct_answer": "Cheetah",
    "value": 2
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.science,
    "question": "What is the purpose of a mitochondria?",
    "answers": [
      "Copies DNA",
      "Kills germs",
      "The powerhouse of the cell",
      "Cleans waste"
    ],
    "correct_answer": "The powerhouse of the cell",
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.multiple,
    "category": QuestionCategory.science,
    "question": "Which are arachnids?",
    "answers": [
      "Wolf Spider",
      "Brown Recluse",
      "Praying Mantis",
      "Red Ant"
    ],
    "correct_answer": [
      "Wolf Spider",
      "Brown Recluse"
    ],
    "value": 4
  },

  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.science,
    "question": "What is the approximate speed of light in meters per second?",
    "answers": [
      "300,000,000 m/s",
      "40,000,000 m/s",
      "120,000,000 m/s",
      "5,000,000,000 m/s"
    ],
    "correct_answer": "300,000,000 m/s",
    "value": 2
  },

  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.science,
    "question": "Who discovered radioactivity?",
    "answers": [
      "Marie Curie",
      "Henri Becquerel",
      "Albert Einstein",
      "Michael Faraday"
    ],
    "correct_answer": "Henri Becquerel",
    "value": 5
  },
];

export default scienceData;