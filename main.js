//3*n^10+2*n^9+ 3*n^2
//log(n) +8*n!
require(['expr-eval'], function (exprEval) {
// a*n^b*n or an^bn
  const regex1 = /[\+\-\*/\s][\d\*]*n\^([\d\*]*n)[\+\-\*/\s]/;
  // a*n!
  const regex2 = /[\+\-\*/\s][\d\*]*n![\+\-\*/\s]/;
  // a^bn or a^b*n
  const regex3 = /[\+\-\*/\s][\d\*]*(\d+)\^[\d\*]*n[\+\-\*/\s]/;
  // a*n^b
  const regex4 = /[\+\-\*/\s][\d\*]*n\^(\d*)[\+\-\*/\s]/;
  // anlog(bn) or a*nlog(bn) or a*n*log(b*n) <-- can even work by deletion of [*] at all places
  const regex5 = /[\+\-\*/\s][\d\*]*n[\*]*log\([\d\*]*(n)\)[\+\-\*/\s]/;
  // an or a*n
  const regex6 = /[\+\-\*/\s][\d\*]*n[\+\-\*/\s]/;
  // a*log(b*n) or all combinations of *
  const regex7 = /[\+\-\*/\s][\d\*]*log\([\d\*]*(n)\)[\+\-\*/\s]/;
  // O(1)
  const regex8 = /[\+\-\*/\s]\d+[\+\-\*/\s]/;

// Get the button element and add a click event listener to it
let button = document.getElementById('my-button');
button.addEventListener('click', function() {
  // Get the value of the input field
  let input = document.getElementById('input-field').value;
  // Call the O function with the input value
  BigO(input);
});

  // Define the findC function
  function findC(input, g) {
    // inp = input.toString();
    // gn = g.toString();
    let c = null;
    let i = 1;
    while (i <= 1000) {
      const parser = new exprEval.Parser();
      let expr = parser.parse(input);
      let exp = parser.parse(g);
      let fnValue = expr.evaluate({ n: i });
      let gnValue = exp.evaluate({ n: i });
      console.log(fnValue);
      console.log(gnValue);
      if (fnValue <= c * gnValue || c === null) {
        c = Math.floor(fnValue / gnValue);
        if(c == 0)
          c = 1;
        i++;
      } else {
        break;
      }
    }
    return c;
  }

function find_n_not(input, g, c) {
  let found = false;
  let i = 1;
  // inp = input.toString();
  // gn = g.toString();
  const parser = new exprEval.Parser();
  let expr = parser.parse(input);
  let exp = parser.parse(g)
  while (i <= 1000) {
    const left = expr.evaluate({ n:i});
    const right = c * exp.evaluate({ n:i});
    if (left <= right) {
      found = true;
      break;
    }
    i++;
  }
  if (found) 
    return i;
  else 
  return 1;
}

function BigO(input) {
  let f;
  let g;
  let x;
  let n_0;
  // Remove all spaces
  input.replace(" ", "");
  // Add spaces left and right
  input = " " + input + " ";
  if (regex1.test(input)) {
    result = "O(n^n)";
    f = (n) => Math.pow(n, n);
    g = "n^n";
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result,f,x,n_0)
  }
  else if (regex2.test(input)) {
    result = "O(n!)";
    f = function (n) {
      let ans = n;
      while (--n > 0) {
        ans *= n;
      }
      return ans;
    }
    g = "n!";
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result, f,x,n_0)
  }
  else if (regex3.test(input)) {
    const match = regex3.exec(input)
    result = "O(" + match[1] + "^n)";
    f = (n) => Math.pow(match[1], n);
    g = "2^n";
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result, f,x,n_0)
  }
  else if (regex4.test(input)) {
    const match = regex4.exec(input);
    result = "O(n^" + match[1] + ")"
    f = (n) => Math.pow(n, match[1]);
    g = "n^"+match[1];
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result, f,x,n_0)
  }
  else if (regex5.test(input)) {
    result = "O(nlogn)"
    f = (n) => n * Math.log(n);
    g = "n*logn";
    // x = findC(input,g);
    document.getElementById('inputC-field').value = 1;
    // n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = 1;
    drawgraph(result, f,x,n_0)
  }
  else if (regex6.test(input)) {
    result = "O(n)"
    f = (n) => n;
    g ="n";
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result, f,x,n_0)
  }
  else if (regex7.test(input)) {
    result = "O(logn)"
    f = (n) => Math.log(n);
    g ="logn"; 
    // x = findC(input,g);
    document.getElementById('inputC-field').value = 1;
    // n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = 1;
    drawgraph(result, f,x,n_0)
  }
  else if (regex8.test(input)) {
    result = "O(1)"
    f = (n) => 1;
    g = "1";
    x = findC(input,g);
    document.getElementById('inputC-field').value = x;
    n_0 =find_n_not(input,g,x);
    document.getElementById('input_n_not-field').value = n_0;
    drawgraph(result, f,x,n_0)
  }
  else{
    window.alert("Invalid input. Please enter a valid expression.");
  }
}

function drawgraph(result, f,x1,n_0) {
  const canvas = document.getElementById('myChart');
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  const chart = new Chart(canvas, {
    type: 'line',
    data: {
      labels: [], 
      datasets: [{
        label: result, 
        data: [], 
        borderColor: 'rgba(255, 99, 132, 1)', 
        borderWidth: 2, // Increase line width for better visibility
        pointRadius: 0, // Remove points on the line for a cleaner look
        fill: false 
      }]
    },
    options: {
      responsive: true, 
      maintainAspectRatio: false, 
      scales: {
        xAxes: [{
          gridLines: {
            display: false // Remove x-axis grid lines for a cleaner look
          },
          ticks: {
            autoSkip: false, // Disable auto-skipping of x-axis labels
            maxRotation: 0, // Set maximum rotation angle for x-axis labels to 0
            fontColor: '#666', // Set x-axis label color
            fontSize: 12 // Set x-axis label font size
          },
          scaleLabel: {
            display: true,
            labelString: 'x', 
            fontColor: '#666', // Set x-axis label color
            fontSize: 14 // Set x-axis label font size
          }
        }],
        yAxes: [{
          gridLines: {
            color: '#ddd', // Set y-axis grid line color
            lineWidth: 1, // Set y-axis grid line width
            borderDash: [3, 3] // Set y-axis grid line style
          },
          ticks: {
            fontColor: '#666', // Set y-axis label color
            fontSize: 12, // Set y-axis label font size
            callback: function(value, index, values) {
              // Format y-axis labels using short number notation
              return value > 1000000 ? (value / 1000000).toFixed(1) + 'M' : value > 1000 ? (value / 1000).toFixed(1) + 'K' : value;
            }
          },
          scaleLabel: {
            display: true,
            labelString: 'y', 
            fontColor: '#666', // Set y-axis label color
            fontSize: 14 // Set y-axis label font size
          }
        }]
      }
    }
  });
  console.log(n_0);
  console.log(x1);
  const step = 1; // Use smaller step size for smoother curve
  for (let x = 1; x <= 10; x += step) {
    chart.data.labels.push(x.toFixed(1));
    chart.data.datasets[0].data.push(x1*f(x));
  }

  chart.update();
  canvas.chart = chart;

}
});

  // let f;
  // // Remove all spaces
  // input.replace(" ", "");
  // // Add spaces left and right
  // input = " " + input + " ";
  // if (regex1.test(input)) {
  //   result = "O(n^n)";
  //   f = (n) => Math.pow(n, n);
  //   drawgraph(result, f)
  // }
  // else if (regex2.test(input)) {
  //   result = "O(n!)";
  //   f = function (n) {
  //     let ans = n;
  //     while (--n > 0) {
  //       ans *= n;
  //     }

  //     return ans;
  //   }
  //   drawgraph(result, f)
  // }
  // else if (regex3.test(input)) {
  //   const match = regex3.exec(input)
  //   result = "O(" + match[1] + "^n)";
  //   f = (n) => Math.pow(match[1], n);
  //   drawgraph(result, f)
  // }
  // else if (regex4.test(input)) {
  //   const match = regex4.exec(input);
  //   result = "O(n^" + match[1] + ")"
  //   f = (n) => Math.pow(n, match[1]);
  //   drawgraph(result, f)
  // }
  // else if (regex5.test(input)) {
  //   result = "O(nlogn)"
  //   f = (n) => n * Math.log(n);
  //   drawgraph(result, f)
  // }
  // else if (regex6.test(input)) {
  //   result = "O(n)"
  //   f = (n) => n;
  //   drawgraph(result, f)
  // }
  // else if (regex7.test(input)) {
  //   result = "O(logn)"
  //   f = (n) => Math.log(n);
  //   drawgraph(result, f)
  // }
  // else if (regex8.test(input)) {
  //   result = "O(1)"
  //   f = (n) => 1;
  //   drawgraph(result, f)
  // }
// function BigO(input) {
//   let f;
//   let g;
//   // Remove all spaces
//   input.replace(" ", "");
//   // Add spaces left and right
//   input = " " + input + " ";
//   if (regex1.test(input)) {
//     result = "O(n^n)";
//     f = (n) => Math.pow(n, n);
//     g = "n^n";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex2.test(input)) {
//     result = "O(n!)";
//     f = function (n) {
//       let ans = n;
//       while (--n > 0) {
//         ans *= n;
//       }
//       return ans;
//     }
//     g = "n!";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex3.test(input)) {
//     const match = regex3.exec(input)
//     result = "O(" + match[1] + "^n)";
//     f = (n) => Math.pow(match[1], n);
//     g = "2^n";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex4.test(input)) {
//     const match = regex4.exec(input);
//     result = "O(n^" + match[1] + ")"
//     f = (n) => Math.pow(n, match[1]);
//     g = "n^"+match[1];
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex5.test(input)) {
//     result = "O(nlogn)"
//     f = (n) => n * Math.log(n);
//     g = "n*logn";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex6.test(input)) {
//     result = "O(n)"
//     f = (n) => n;
//     g ="n";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex7.test(input)) {
//     result = "O(logn)"
//     f = (n) => Math.log(n);
//     g ="logn"; 
//     c = findC(input,g);
//     drawgraph(result, f,c,n)
//   }
//   else if (regex8.test(input)) {
//     result = "O(1)"
//     f = (n) => 1;
//     g = "1";
//     c = findC(input,g);
//     n =find_n_not(input,g,c);
//     drawgraph(result, f)
//   }
//   console.log(result, f,c,n)

// }

// function drawgraph(result,f,c,n) {
//   // Get the canvas element from the DOM
//   const canvas = document.getElementById('myChart');
//   // Destroy existing chart instance if it exists
//   if (canvas.chart) {
//     canvas.chart.destroy();
//   }
//   // Create a new Chart object with the canvas element
//   const chart = new Chart(canvas, {
//     type: 'line',
//     data: {
//       labels: [], // The x-axis labels will be added dynamically
//       datasets: [{
//         label: result, // The name of the dataset
//         data: [], // The y-axis data will be added dynamically
//         borderColor: 'rgba(255, 99, 132, 1)', // Set the line color
//         fill: false // Disable area fill under the line
//       }]
//     },
//     options: {
//       responsive: true, // Make the chart responsive
//       maintainAspectRatio: false, // Disable aspect ratio locking
//       scales: {
//         xAxes: [{
//           scaleLabel: {
//             display: true,
//             labelString: 'x' // The x-axis label
//           }
//         }],
//         yAxes: [{
//           scaleLabel: {
//             display: true,
//             labelString: 'y' // The y-axis label
//           },
//           ticks: {
//             suggestedMin: 1, // Set the minimum y-axis value
//             suggestedMax: 1000000 // Set the maximum y-axis value
//           }
//         }]
//       }
//     }
//   });

//   // Add the function values to the chart data
//   const step = 1; // The step size for x values
//   for (let x = n; x <= 10; x += step) {
//     chart.data.labels.push(x.toFixed(1));
//     chart.data.datasets[0].data.push(c*f(x));
//   }

//   // Update the chart
//   chart.update();
//   // Store the chart instance on the canvas element
//   canvas.chart = chart;
// }


