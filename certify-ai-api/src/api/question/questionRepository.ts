import type { Question, QuestionOption } from "@/api/question/questionModel";
import questionData from "@/common/data/questions/questions.json";

const questions: Question[] = [];
questionData.certifications.forEach((cert) => {
  cert.questions.forEach((question) => {
    // extract the answer options
    const options: Record<string, string>[] = [];
    question.options.forEach((option) => {
      options.push(option as any);
    });

    // extract the answer
    const answer: Record<string, string> = question.answer as any;

    // push the question
    questions.push({
      id: Number(question.id),
      certificationID: cert.id,
      question: question.question,
      type: question.type,
      category: question.category,
      options: options,
      answer: answer,
      explanation: question.explanation,
      citation: question.citation,
    });
  });
});

export class QuestionRepository {
  async findAllAsync(): Promise<Question[]> {
    return questions;
  }

  async findByIdAsync(id: number): Promise<Question | null> {
    return questions.find((question) => question.id === id) || null;
  }

  async findAllByCertificationIdAsync(
    certificationID: number
  ): Promise<Question[] | null> {
    return (
      questions.filter(
        (question) => question.certificationID === certificationID
      ) || null
    );
  }
}
