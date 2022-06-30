import { Question, QuestionCategory, QuestionType } from "../types";
import { generateID } from "../utils/LocalScorage";

const potpourriData: Question[] = [
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.potpourri,
    "question": "When was Indeed founded?",
    "answers": [
      "2000",
      "2004",
      "2021",
      "1998"
    ],
    "correct_answer": "2004",
    "value": 5
  },
  {
    "id": generateID(),
    "type": QuestionType.multiple,
    "category": QuestionCategory.potpourri,
    "question": "Which are programming languages?",
    "answers": [
      "C",
      "Python",
      "JavaScript",
      "Orc"
    ],
    "correct_answer": [
      "C",
      "Python",
      "JavaScript"
    ],
    "value": 3
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.potpourri,
    "question": "Which Jeopardy player has won the most amount of consecutive games?",
    "answers": [
      "Amy Schneider",
      "Ken Jennings",
      "James Holzhauer",
      "Matt Amodio"
    ],
    "correct_answer": "Ken Jennings",
    "value": 2
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.potpourri,
    "question": "Which month is Coachella Music Festival typically held every year?",
    "answers": [
      "January",
      "June",
      "April",
      "September"
    ],
    "correct_answer": "April",
    "value": 2
  },
  {
    "id": generateID(),
    "type": QuestionType.single,
    "category": QuestionCategory.potpourri,
    "question": "Who is the 14th president of the United States?",
    "answers": [
      "Abraham Lincoln",
      "John Tyler",
      "Grover Cleveland",
      "Franklin Pierce"
    ],
    "correct_answer": "Franklin Pierce",
    "value": 4
  },
];

export default potpourriData;