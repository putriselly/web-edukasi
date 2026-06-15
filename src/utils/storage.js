const PROGRESS_KEY = 'web-edukasi-progress';
const QUIZ_KEY = 'web-edukasi-quiz';

export const getProgress = () => {
  const data = localStorage.getItem(PROGRESS_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveChapterDone = (courseId, chapterId) => {
  const progress = getProgress();
  if (!progress[courseId]) progress[courseId] = [];
  if (!progress[courseId].includes(chapterId)) {
    progress[courseId].push(chapterId);
  }
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
};

export const getQuizScores = () => {
  const data = localStorage.getItem(QUIZ_KEY);
  return data ? JSON.parse(data) : {};
};

export const saveQuizScore = (courseId, chapterId, score) => {
  const scores = getQuizScores();
  if (!scores[courseId]) scores[courseId] = {};
  scores[courseId][chapterId] = score;
  localStorage.setItem(QUIZ_KEY, JSON.stringify(scores));
};