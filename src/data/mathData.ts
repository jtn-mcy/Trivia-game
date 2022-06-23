import { Question, QuestionCategory, QuestionType } from "../types";
import { generateID } from "../utils/LocalScorage";

const mathData: Question[] = [
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.math,
    "question": "What is 2+2?",
    "answers": [
      "2",
      "23",
      "30",
      "4"
    ],
    "correct_answer": "4",
    "value": 1
  },
  {
    "id": generateID(),
    "type": QuestionType.multiple,
    "category": QuestionCategory.math,
    "question": "Which are prime numbers?",
    "answers": [
      "2",
      "1",
      "1230215612",
      "311"
    ],
    "correct_answer": [
      "2",
      "311"
    ],
    "value": 4
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.math,
    "question": "Icosahedrons have how many equal sides?",
    "answers": [
      "One",
      "Twenty",
      "Thirty",
      "One Hundred"
    ],
    "correct_answer": "Twenty",
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.math,
    "question": "What is does the P in PEMDAS acronym stand for?",
    "answers": [
      "Parentheses",
      "Power",
      "Proof",
      "Parallel"
    ],
    "correct_answer": "Parentheses",
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.math,
    "question": "What is the approximate value of the Golden Ratio?",
    "answers": [
      "1.215",
      "1.546",
      "1.218",
      "1.618"
    ],
    "correct_answer": "1.618",
    "value": 4
  }
];

export default mathData;