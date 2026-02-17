"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import type { QuizQuestion } from "@/types";

interface QuizBlockProps {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
}

export function QuizBlock({ questions, onComplete }: QuizBlockProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [
    currentQuestion.correct_answer,
    ...currentQuestion.wrong_answers,
  ].sort(() => Math.random() - 0.5);

  const handleAnswerSelect = (answer: string) => {
    if (answeredQuestions.has(currentQuestionIndex)) return;
    
    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correct_answer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setAnsweredQuestions(new Set([...answeredQuestions, currentQuestionIndex]));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCorrect(false);
    } else {
      // Final score calculation
      const finalScore = selectedAnswer === currentQuestion.correct_answer ? score + 1 : score;
      onComplete(finalScore, questions.length);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <p className="text-3xl font-bold mb-2">
              {score} / {questions.length}
            </p>
            <p className="text-muted-foreground">
              {score === questions.length
                ? "Perfect! 🎉"
                : score >= questions.length * 0.7
                ? "Great job! 👍"
                : "Keep practicing! 💪"}
            </p>
          </div>
          <Button onClick={handleRestart} className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        <div className="space-y-2">
          {allAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer;
            const isCorrectAnswer = answer === currentQuestion.correct_answer;
            const showCorrect = showResult && isCorrectAnswer;
            const showWrong = showResult && isSelected && !isCorrectAnswer;

            return (
              <Button
                key={index}
                variant={showCorrect ? "default" : showWrong ? "destructive" : "outline"}
                className="w-full justify-start h-auto py-3 px-4"
                onClick={() => handleAnswerSelect(answer)}
                disabled={showResult}
              >
                <div className="flex items-center gap-2 w-full">
                  {showResult && (
                    <>
                      {showCorrect && <Check className="h-5 w-5" />}
                      {showWrong && <X className="h-5 w-5" />}
                    </>
                  )}
                  <span className="flex-1 text-left">{answer}</span>
                </div>
              </Button>
            );
          })}
        </div>
        {showResult && (
          <div className="pt-4">
            <Button onClick={handleNext} className="w-full">
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
