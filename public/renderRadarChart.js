  const ctx = document.getElementById('myChart');

  let data = {
  datasets: [],
};

  let chart =new Chart(ctx, {
  type: 'radar',
  data: data,
  options: {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  },
});