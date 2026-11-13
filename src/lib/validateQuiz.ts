import { AnswerKey, Quiz, QuizLoadResult } from '../types/quiz';

const ANSWER_KEYS: AnswerKey[] = ['A', 'B', 'C', 'D'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export async function parseQuizFile(file: File): Promise<QuizLoadResult> {
  if (!file.name.toLowerCase().endsWith('.json')) {
    throw new Error('Vui lòng chọn một tệp có phần mở rộng .json.');
  }

  let raw: string;
  try {
    raw = await file.text();
  } catch {
    throw new Error('Không thể đọc nội dung tệp. Vui lòng thử lại.');
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('Tệp không phải JSON hợp lệ. Vui lòng kiểm tra lại cú pháp.');
  }

  return { quiz: validateQuiz(parsed) };
}

export function validateQuiz(value: unknown): Quiz {
  if (!isRecord(value)) {
    throw new Error('Cấu trúc tệp không hợp lệ: nội dung gốc phải là một đối tượng JSON.');
  }

  if (!isNonEmptyString(value.title)) {
    throw new Error('Thiếu hoặc sai trường "title". Đây phải là chuỗi không rỗng.');
  }

  if (!Array.isArray(value.questions) || value.questions.length === 0) {
    throw new Error('Trường "questions" phải là một mảng có ít nhất một câu hỏi.');
  }

  const seenIds = new Set<string>();
  const questions = value.questions.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`Câu hỏi thứ ${index + 1} không hợp lệ: phải là một đối tượng.`);
    }

    if (!isNonEmptyString(item.id)) {
      throw new Error(`Câu hỏi thứ ${index + 1} thiếu hoặc sai trường "id".`);
    }

    if (seenIds.has(item.id)) {
      throw new Error(`ID câu hỏi "${item.id}" bị trùng lặp.`);
    }
    seenIds.add(item.id);

    if (!isNonEmptyString(item.question)) {
      throw new Error(`Câu hỏi "${item.id}" thiếu hoặc sai trường "question".`);
    }

    if (!isRecord(item.options)) {
      throw new Error(`Câu hỏi "${item.id}" thiếu trường "options".`);
    }

    const options = {} as Record<AnswerKey, string>;
    for (const key of ANSWER_KEYS) {
      if (!isNonEmptyString(item.options[key])) {
        throw new Error(`Câu hỏi "${item.id}" phải có lựa chọn "${key}" là chuỗi không rỗng.`);
      }
      options[key] = item.options[key] as string;
    }

    if (
      typeof item.correctAnswer !== 'string' ||
      !ANSWER_KEYS.includes(item.correctAnswer as AnswerKey)
    ) {
      throw new Error(`Câu hỏi "${item.id}" có "correctAnswer" không hợp lệ. Chỉ chấp nhận A, B, C hoặc D.`);
    }

    const question: Quiz['questions'][number] = {
      id: item.id,
      question: item.question,
      options,
      correctAnswer: item.correctAnswer as AnswerKey,
    };

    if (item.explanation !== undefined) {
      if (typeof item.explanation !== 'string') {
        throw new Error(`Câu hỏi "${item.id}" có "explanation" không hợp lệ.`);
      }
      if (item.explanation.trim().length > 0) {
        question.explanation = item.explanation;
      }
    }

    return question;
  });

  const quiz: Quiz = { title: value.title, questions };

  if (value.description !== undefined) {
    if (typeof value.description !== 'string') {
      throw new Error('Trường "description" phải là chuỗi.');
    }
    if (value.description.trim().length > 0) {
      quiz.description = value.description;
    }
  }

  return quiz;
}
