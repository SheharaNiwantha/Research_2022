const ctx = document.getElementById('myWeekChart').getContext('2d');
const ctx2 = document.getElementById('myMonthChart').getContext('2d');
const ctx3 = document.getElementById('myYearChart').getContext('2d');

//week chart
const myWeekChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6','Week7'],
        
        datasets: [{
            label: 'Weekly Data',
            data: [12, 19, 3, 5, 2, 3,5],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2,
           
        }]
    },
    options: {
        scales : {
                y: {
                    title:{
                        display: true,
                        text:'Weight',
                        color:'red',
                        font: {
                            size: 12,
                            weight:'bold',
                        }
                    }
                },
                X:{
                    title:{
                        display: true,
                        text:'week',
                        color:'Black',
                        font: {
                            size: 12,
                            weight:'bold',
                        }
                    }
                }
            }
       
    }
});

// month chart
const myMonthChart = new Chart(ctx2, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July','August','September','October','November','December'],
        datasets: [{
            label: 'Monthly Data',
            data: [12, 19, 3, 5, 2, 3,5,12, 19, 3, 5, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales : {
            y: {
                title:{
                    display: true,
                    text:'Weight',
                    color:'red',
                    font: {
                        size: 12,
                        weight:'bold',
                    }
                }
            },
            X:{
                title:{
                    display: true,
                    text:'Month',
                    color:'Black',
                    font: {
                        size: 12,
                        weight:'bold',
                    }
                }
            }
        }
    }
});

//year chart
const myYearChart = new Chart(ctx3, {
    type: 'line',
    data: {
        labels: ['2015', '2016', '2017', '2018', '2019', '2020','2021','2022'],
        datasets: [{
            label: 'Yearly Data',
            data: [12, 19, 3, 5, 2, 3,5,12],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
           
            borderWidth: 2
        }]
    },
    options: {
        scales : {
            y: {
                title:{
                    display: true,
                    text:'Weight',
                    color:'red',
                    font: {
                        size: 12,
                        weight:'bold',
                    }
                    
                }
            },
            X:{
                title:{
                    display: true,
                    text:'Year',
                    color:'Black',
                    font: {
                        size: 12,
                        weight:'bold',
                    }
                }
            }
        }
    }
});