const mockdata = [
  {
    name: "measurement1",
    created: "2020-12-09",
    datasets: [
      {
        "name": "Heidenhain MT-25",
        "data": Array.from({length: 40}, () => 40 - Math.random() * 5)
      },
      {
        "name": "Heidenhain ROD-420",
        "data": Array.from({length: 40}, () => 30 - Math.random() * 5)
      },
      {
        "name": "Electrical runout",
        "data": Array.from({length: 40}, () => 10 - Math.random() * 5)
      }
    ]
  },
  {
    name: "measurement2",
    created: "2020-12-09",
    datasets: [
      {
        "name": "Heidenhain MT-25",
        "data": Array.from({length: 100}, () => 30 - Math.random() * 2)
      },
      {
        "name": "Heidenhain ROD-420",
        "data": Array.from({length: 100}, () => 25 - Math.random() * 2)
      },
      {
        "name": "Electrical runout",
        "data": Array.from({length: 100}, () => 5 - Math.random() * 2)
      }
    ]
  },
  {
    name: "measurement3",
    created: "2020-12-09",
    datasets: [
      {
        "name": "Heidenhain MT-25",
        "data": Array.from({length: 500}, () => 100 - Math.random() * 5)
      },
      {
        "name": "Heidenhain ROD-420",
        "data": Array.from({length: 500}, () => 95 - Math.random() * 5)
      },
      {
        "name": "Electrical runout",
        "data": Array.from({length: 500}, () => 5 - Math.random() * 5)
      }
    ]
  }
]

module.exports = mockdata