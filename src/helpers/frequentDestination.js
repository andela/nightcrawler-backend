export const maxDestination = myArr => {
  const destStat = {};
  const mostVisited = [];
  myArr.forEach(destination => {
    // eslint-disable-next-line no-unused-expressions
    destStat[destination] > 0 ? destStat[destination] += 1 : destStat[destination] = 1;
  });
  const maxValue = Math.max(...Object.values(destStat));

  Object.keys(destStat).forEach(key => {
    if (destStat[key] === maxValue) {
      mostVisited.push(key);
    }
  });

  return mostVisited;
};
