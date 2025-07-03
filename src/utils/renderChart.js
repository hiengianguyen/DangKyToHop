function renderChart(canvas, title, labels, data, color) {
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: title,
          data: data,
          borderWidth: 1,
          backgroundColor: color
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
