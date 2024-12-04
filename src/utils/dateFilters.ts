export const dateFilters = {
  today: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  },
  
  yesterday: () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    return yesterday;
  },
  
  last7Days: () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    date.setHours(0, 0, 0, 0);
    return date;
  },
  
  last30Days: () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    date.setHours(0, 0, 0, 0);
    return date;
  }
};