  const ctx = document.getElementById('myChart');

  let data = {
  datasets: [],
};

  let chart =new Chart(ctx, {
  type: 'scatter',
  data: data,
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }
});