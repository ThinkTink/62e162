export const range = (size, startAt = 1) => {
    /*
      returns an array with a range of integers starting at startAt and ending with
      startAt+size
    */
    return [...Array(size).keys()].map((i) => i + startAt);
  };
  