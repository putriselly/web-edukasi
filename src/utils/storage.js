const PROGRESS_KEY = 'web-edukasi-progress';
const QUIZ_KEY = 'web-edukasi-quiz';
const STREAK_KEY = 'web-edukasi-streak';

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

export const getStreak = () => {
  const data = localStorage.getItem(STREAK_KEY);
  return data ? JSON.parse(data) : { days: 0, lastVisit: null };
};

export const updateStreak = () => {
  const streak = getStreak();
  const today = new Date().toDateString();
  if (streak.lastVisit === today) return streak;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const isConsecutive = streak.lastVisit === yesterday.toDateString();
  const newStreak = {
    days: isConsecutive ? streak.days + 1 : 1,
    lastVisit: today
  };
  localStorage.setItem(STREAK_KEY, JSON.stringify(newStreak));
  return newStreak;
};