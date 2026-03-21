"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { ExamData, Section } from "@/lib/types/types";
import HadithSidebarDrawer from "@/components/viewers/HadithSidebarDrawer";

interface ExamViewerProps {
  data: ExamData;
  hadithSections?: Section[];
  bookSlug?: string;
  currentHadithId?: string;
  examSlugs?: Record<string, string>;
  sharhSlugs?: Record<string, string>;
}

type ExamState = "taking" | "submitted";

export default function ExamViewer({
  data,
  hadithSections,
  bookSlug,
  currentHadithId,
  examSlugs,
  sharhSlugs,
}: ExamViewerProps) {
  const { darkMode } = useTheme();
  const { questions, title, desc } = data;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [examState, setExamState] = useState<ExamState>("taking");

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  const hasSidebar = !!(
    hadithSections &&
    bookSlug &&
    currentHadithId &&
    examSlugs &&
    sharhSlugs
  );

  const correctCount = useMemo(() => {
    if (examState !== "submitted") return 0;
    return questions.reduce((sum, q) => {
      if (answers[q.id] === undefined) return sum;
      return sum + (answers[q.id] === q.correctAnswer ? 1 : 0);
    }, 0);
  }, [examState, answers, questions]);

  const selectOption = useCallback(
    (optionIndex: number) => {
      if (examState === "submitted") return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    },
    [examState, currentQuestion.id],
  );

  const goNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const goToQuestion = (index: number) => setCurrentIndex(index);

  const submitExam = () => setExamState("submitted");

  const resetExam = () => {
    setAnswers({});
    setExamState("taking");
    setCurrentIndex(0);
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-amber-200 selection:text-amber-900 ${
        darkMode ? "bg-slate-900 text-slate-100" : "bg-[#FFF7EA] text-slate-800"
      }`}
    >
      {hasSidebar && (
        <HadithSidebarDrawer
          sections={hadithSections!}
          bookSlug={bookSlug!}
          currentHadithId={currentHadithId!}
          examSlugs={examSlugs!}
          sharhSlugs={sharhSlugs!}
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ExamHeader title={title} desc={desc} darkMode={darkMode} />

        {examState === "submitted" ? (
          <ScoreCard
            correctCount={correctCount}
            answeredCount={answeredCount}
            darkMode={darkMode}
            onReset={resetExam}
          />
        ) : null}

        <QuestionNav
          totalQuestions={totalQuestions}
          currentIndex={currentIndex}
          answers={answers}
          questions={questions}
          examState={examState}
          darkMode={darkMode}
          onSelect={goToQuestion}
        />

        <QuestionCard
          question={currentQuestion}
          questionIndex={currentIndex}
          selectedAnswer={answers[currentQuestion.id]}
          examState={examState}
          darkMode={darkMode}
          onSelect={selectOption}
        />

        <NavigationButtons
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          darkMode={darkMode}
          onPrev={goPrev}
          onNext={goNext}
        />

        {examState === "taking" && (
          <SubmitSection
            answeredCount={answeredCount}
            totalQuestions={totalQuestions}
            darkMode={darkMode}
            onSubmit={submitExam}
          />
        )}
      </div>
    </div>
  );
}

function ExamHeader({
  title,
  desc,
  darkMode,
}: {
  title: string;
  desc?: string;
  darkMode: boolean;
}) {
  return (
    <div className="text-center mb-8">
      <h1
        className={`text-3xl md:text-4xl font-bold font-amiri mb-2 ${
          darkMode ? "text-amber-400" : "text-amber-800"
        }`}
      >
        {title}
      </h1>
      {desc && (
        <p
          className={`text-sm md:text-base ${
            darkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

function ScoreCard({
  correctCount,
  answeredCount,
  darkMode,
  onReset,
}: {
  correctCount: number;
  answeredCount: number;
  darkMode: boolean;
  onReset: () => void;
}) {
  const percentage =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  const isPassing = percentage >= 60;

  return (
    <div
      className={`mb-8 p-6 rounded-2xl text-center border-2 ${
        isPassing
          ? darkMode
            ? "bg-green-900/30 border-green-700"
            : "bg-green-50 border-green-300"
          : darkMode
            ? "bg-red-900/30 border-red-700"
            : "bg-red-50 border-red-300"
      }`}
    >
      <Trophy
        className={`mx-auto mb-3 ${
          isPassing
            ? "text-yellow-500"
            : darkMode
              ? "text-slate-500"
              : "text-slate-400"
        }`}
        size={48}
      />
      <p
        className={`text-4xl font-bold mb-1 ${
          isPassing
            ? darkMode
              ? "text-green-400"
              : "text-green-700"
            : darkMode
              ? "text-red-400"
              : "text-red-700"
        }`}
      >
        {correctCount} / {answeredCount}
      </p>
      <p
        className={`text-lg mb-4 ${
          darkMode ? "text-slate-300" : "text-slate-600"
        }`}
      >
        نسبة النجاح: {percentage}%
      </p>
      <button
        onClick={onReset}
        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${
          darkMode
            ? "bg-amber-600 hover:bg-amber-500 text-white"
            : "bg-amber-500 hover:bg-amber-600 text-white"
        }`}
      >
        <RotateCcw size={18} />
        إعادة الاختبار
      </button>
    </div>
  );
}

function QuestionNav({
  totalQuestions,
  currentIndex,
  answers,
  questions,
  examState,
  darkMode,
  onSelect,
}: {
  totalQuestions: number;
  currentIndex: number;
  answers: Record<number, number>;
  questions: ExamData["questions"];
  examState: ExamState;
  darkMode: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className={`rounded-2xl p-4 md:p-6 mb-6 border ${
        darkMode
          ? "bg-slate-800/60 border-slate-700"
          : "bg-white border-amber-100 shadow-sm"
      }`}
    >
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const qId = questions[i].id;
          const isAnswered = answers[qId] !== undefined;
          const isCurrent = i === currentIndex;
          const isCorrect =
            examState === "submitted" &&
            answers[qId] === questions[i].correctAnswer;
          const isWrong =
            examState === "submitted" &&
            answers[qId] !== undefined &&
            answers[qId] !== questions[i].correctAnswer;

          let btnClass = "";
          if (isCurrent) {
            btnClass = "bg-red-500 text-white scale-110";
          } else if (isCorrect) {
            btnClass = darkMode
              ? "bg-green-700 text-white"
              : "bg-green-500 text-white";
          } else if (isWrong) {
            btnClass = darkMode
              ? "bg-red-800 text-white"
              : "bg-red-400 text-white";
          } else if (isAnswered) {
            btnClass = darkMode
              ? "bg-amber-700 text-white"
              : "bg-amber-400 text-white";
          } else {
            btnClass = darkMode
              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300";
          }

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${btnClass}`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NavigationButtons({
  currentIndex,
  totalQuestions,
  darkMode,
  onPrev,
  onNext,
}: {
  currentIndex: number;
  totalQuestions: number;
  darkMode: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const btnBase = `flex items-center gap-2 px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-200`;
  const btnActive = darkMode
    ? "bg-teal-700 hover:bg-teal-600 text-white"
    : "bg-teal-600 hover:bg-teal-700 text-white";
  const btnDisabled = darkMode
    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
    : "bg-slate-200 text-slate-400 cursor-not-allowed";

  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={onPrev}
        disabled={currentIndex <= 0}
        className={`${btnBase} ${currentIndex <= 0 ? btnDisabled : btnActive}`}
      >
        <ChevronRight size={18} />
        السابق
      </button>
      <button
        onClick={onNext}
        disabled={currentIndex >= totalQuestions - 1}
        className={`${btnBase} ${currentIndex >= totalQuestions - 1 ? btnDisabled : btnActive}`}
      >
        التالي
        <ChevronLeft size={18} />
      </button>
    </div>
  );
}

function QuestionCard({
  question,
  questionIndex,
  selectedAnswer,
  examState,
  darkMode,
  onSelect,
}: {
  question: ExamData["questions"][number];
  questionIndex: number;
  selectedAnswer: number | undefined;
  examState: ExamState;
  darkMode: boolean;
  onSelect: (index: number) => void;
}) {
  const isSubmitted = examState === "submitted";

  return (
    <div
      className={`rounded-2xl p-5 md:p-8 mb-8 border ${
        darkMode
          ? "bg-slate-800/40 border-slate-700"
          : "bg-white border-amber-100 shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3 mb-6">
        <span
          className={`shrink-0 text-lg md:text-xl font-bold font-amiri ${
            darkMode ? "text-amber-400" : "text-amber-800"
          }`}
        >
          {questionIndex + 1})
        </span>
        <p
          className={`text-lg md:text-xl font-bold font-amiri leading-relaxed ${
            darkMode ? "text-slate-100" : "text-slate-800"
          }`}
        >
          {question.text}
        </p>
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === question.correctAnswer;

          let optionStyle = "";
          if (isSubmitted) {
            if (isCorrect) {
              optionStyle = darkMode
                ? "bg-green-900/40 border-green-600 text-green-300"
                : "bg-green-50 border-green-500 text-green-800";
            } else if (isSelected && !isCorrect) {
              optionStyle = darkMode
                ? "bg-red-900/40 border-red-600 text-red-300"
                : "bg-red-50 border-red-500 text-red-700";
            } else {
              optionStyle = darkMode
                ? "bg-slate-800 border-slate-700 text-slate-400"
                : "bg-slate-50 border-slate-200 text-slate-500";
            }
          } else if (isSelected) {
            optionStyle = darkMode
              ? "bg-amber-900/30 border-amber-500 text-amber-300"
              : "bg-amber-50 border-amber-500 text-amber-900";
          } else {
            optionStyle = darkMode
              ? "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
              : "bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:bg-amber-50/50";
          }

          return (
            <button
              key={idx}
              onClick={() => onSelect(idx)}
              disabled={isSubmitted}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-right transition-all duration-200 ${optionStyle} ${
                isSubmitted ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span className="shrink-0">
                {isSubmitted && isCorrect ? (
                  <CheckCircle2
                    size={22}
                    className={darkMode ? "text-green-400" : "text-green-600"}
                  />
                ) : isSubmitted && isSelected && !isCorrect ? (
                  <XCircle
                    size={22}
                    className={darkMode ? "text-red-400" : "text-red-500"}
                  />
                ) : (
                  <span
                    className={`inline-block w-5 h-5 rounded-full border-2 ${
                      isSelected
                        ? darkMode
                          ? "border-amber-500 bg-amber-500"
                          : "border-amber-600 bg-amber-600"
                        : darkMode
                          ? "border-slate-600"
                          : "border-slate-300"
                    }`}
                  >
                    {isSelected && (
                      <span className="block w-2 h-2 mx-auto mt-0.75 rounded-full bg-white" />
                    )}
                  </span>
                )}
              </span>
              <span className="text-base md:text-lg font-amiri">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SubmitSection({
  answeredCount,
  totalQuestions,
  darkMode,
  onSubmit,
}: {
  answeredCount: number;
  totalQuestions: number;
  darkMode: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="text-center space-y-3">
      <p
        className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-500"}`}
      >
        أجبت على {answeredCount} من {totalQuestions} سؤال
      </p>
      <button
        onClick={onSubmit}
        className={`px-10 py-3 rounded-full font-bold text-lg transition-all duration-300 ${
          darkMode
            ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30"
            : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
        }`}
      >
        تسليم الاختبار
      </button>
    </div>
  );
}
