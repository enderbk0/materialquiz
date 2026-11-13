import type { AnswerKey, Quiz } from "../types/quiz";

const ANSWER_KEYS: AnswerKey[] = ["A", "B", "C", "D"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function validateQuiz(raw: string): Quiz {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Tệp không phải là JSON hợp lệ. Hãy kiểm tra lại nội dung tệp.");
  }

  if (!isRecord(parsed)) {
    throw new Error("Cấu trúc bài kiểm tra không hợp lệ: nội dung gốc phải là một đối tượng JSON.");
  }

  if (!isNonEmptyString(parsed.title)) {
    throw new Error("Thiếu hoặc sai trường \"title\": tiêu đề bài kiểm tra phải là một chuỗi không trống.");
  }

  if (parsed.description !== undefined && typeof parsed.description !== "string") {
    throw new Error("Trường \"description\" phải là một chuỗi.");
  }

  if (!Array.isArray(parsed.questions) || parsed.questions.length === 0) {
    throw new Error("Bài kiểm tra cần có ít nhất một câu hỏi trong mảng \"questions\".");
  }

  const seenIds = new Set<string>();
  const questions = parsed.questions.map((item, index) => {
    if (!isRecord(item)) {
      throw new Error(`Câu hỏi thứ ${index + 1} không hợp lệ: mỗi câu hỏi phải là một đối tượng.`);
    }

    if (!isNonEmptyString(item.id)) {
      throw new Error(`Câu hỏi thứ ${index + 1} thiếu trường \"id\" hợp lệ.`);
    }

    if (seenIds.has(item.id)) {
      throw new Error(`ID câu hỏi \"${item.id}\" bị trùng. Mỗi câu hỏi cần một ID riêng.`);
    }
    seenIds.add(item.id);

    if (!isNonEmptyString(item.question)) {
      throw new Error(`Câu hỏi \"${item.id}\" thiếu nội dung câu hỏi hợp lệ.`);
    }

    if (!isRecord(item.options)) {
      throw new Error(`Câu hỏi \"${item.id}\" thiếu các lựa chọn A, B, C, D.`);
    }

    const optionKeys = Object.keys(item.options);
    if (optionKeys.length !== 4 || !ANSWER_KEYS.every((key) => key in item.options)) {
      throw new Error(`Câu hỏi \"${item.id}\" phải có đúng bốn lựa chọn: A, B, C và D.`);
    }

    const options = {} as Record<AnswerKey, string>;
    for (const key of ANSWER_KEYS) {
      if (!isNonEmptyString(item.options[key])) {
        throw new Error(`Lựa chọn ${key} của câu hỏi \"${item.id}\" phải là một chuỗi không trống.`);
      }
      options[key] = item.options[key];
    }

    if (
      typeof item.correctAnswer !== "string" ||
      !ANSWER_KEYS.includes(item.correctAnswer as AnswerKey)
    ) {
      throw new Error(`Câu hỏi \"${item.id}\" có \"correctAnswer\" không hợp lệ. Chỉ chấp nhận A, B, C hoặc D.`);
    }

    if (item.explanation !== undefined && typeof item.explanation !== "string") {
      throw new Error(`Trường \"explanation\" của câu hỏi \"${item.id}\" phải là một chuỗi.`);
    }

    return {
      id: item.id,
      question: item.question,
      options,
      correctAnswer: item.correctAnswer as AnswerKey,
      explanation: item.explanation
    };
  });

  return {
    title: parsed.title,
    description: parsed.description,
    questions
  };
}
