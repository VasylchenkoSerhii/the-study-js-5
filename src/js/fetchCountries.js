fetch('https://restcountries.com/v2/name/ukraine').then(response => response.json()).then(date => console.log(date))