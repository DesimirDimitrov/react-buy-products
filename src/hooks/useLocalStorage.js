export const useLocalStorage = (key) => {
  const getItem = () => {
    try {
      const storage = localStorage.getItem(key);
      if (storage) {
        return JSON.parse(storage);
      }
      return [];
    } catch (error) {
      console.log(`Error getting item ${key} from localStorage`, error);
    }
  };

  const setItem = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`Error setting item ${key} to localStorage`, error);
    }
  };

  const removeItem = () => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log(`Error removing item ${key} from localStorage`, error);
    }
  };

  return { getItem, setItem, removeItem };
};
