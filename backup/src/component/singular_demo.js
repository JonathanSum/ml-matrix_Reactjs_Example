// // Alfredo Canziani, 18 Aug 2021

// let V = []
// let U = []
// let clicked = []
// let e_values = [1, 1]
// // 2 bases, 2 left-singular vectors, 2 e'evectors
// let locked = [false, false, false, false, false, false]
// let N = 16
// let A = []
// const bases = [0, 12]
// const norm = 50
// let s_values = [[norm, 0], [0, -norm]]
// let svd

// const red = '#fb8072'
// const green = '#b3de69'
// const orange = '#fdb462'
// const blue = '#80b1d3'
// const blue_orange = [blue, orange]

// function setup() {
//     const w = Math.min(window.innerWidth, 600)
//     const h = Math.min(window.innerHeight, 400)
//     // console.log(w, h)
//     createCanvas(w, h);
//     // Centre coordinates
//     cx = width / 2;
//     cy = height / 2;
//     for (let n = 0; n < N; n++) {
//         V[n] = [];
//         V[n][0] = norm * cos(n * 2 * PI / N);
//         V[n][1] = norm * sin(n * 2 * PI / N);
//         U[n] = [...V[n]];
//     }
//     A[0] = [1, 0]
//     A[1] = [0, 1]

//     compute_singular_vectors()

//     // Create reset button
//     button = createButton('Reset')
//     button.position(0, height - 20)
//     button.mousePressed(reset)
//     button.style('background-color', 'black')
//     button.style('color', '#bbbbbb')
//     button.style('border', 'none')
// }

// function draw() {
//     background("black")
//     fill("#bbbbbb")
//     // if (clicked.length < 2)
//     //   text("Select two eigenvectors", 20, 30)
//     // if (clicked.length == 2) {
//     //   text("Drag 'em around", 20, 30)
//     //   update_matrix()
//     // }

//     for (let i = 0; i < 2; i++) {
//         sx = svd.U.data[i][0] * svd.s[i] * norm + cx
//         sy = -svd.U.data[i][1] * svd.s[i] * norm * det + cy
//         d = 10; fill(blue_orange[i]); noStroke()
//         ellipse(sx, sy, d)
//         stroke(blue_orange[i])
//         line(sx, sy, 2 * cx - sx, 2 * cy - sy)
//     }

//     for (let n = 0; n < N; n++) {
//         // Update u vectors
//         U[n] = mult(V[n])

//         // Move u and v to the centre
//         ux = U[n][0] + cx
//         uy = U[n][1] + cy
//         vx = V[n][0] + cx
//         vy = V[n][1] + cy

//         // Draw the input points in grey
//         // Draw i and j in R and G
//         fill('grey')
//         switch (n) {
//             case bases[0]: fill(red); break
//             case bases[1]: fill(green); break
//         }
//         d = 5
//         noStroke()
//         ellipse(vx, vy, d)

//         // Set output points in white
//         fill('white')

//         // Highlight cicles under the mouse
//         // if (dist(mouseX, mouseY, ux, uy) <= 5 && clicked.length < 2)
//         //   d = 15;

//         // Draw lines through the e'vectors, set colour and size
//         for (let i = 0; i < clicked.length; i++)
//             if (clicked[i] == n) {
//                 stroke("grey")
//                 line(
//                     cx - V[n][0] * 10, cy - V[n][1] * 10,
//                     cx + V[n][0] * 10, cy + V[n][1] * 10
//                 )
//                 d = 10
//                 fill(181, 223, 108)
//             }

//         // Draw i and j in R and G
//         switch (n) {
//             case bases[0]: d = 10; fill(red); break
//             case bases[1]: d = 10; fill(green); break
//         }


//         // Draw output points
//         ellipse(ux, uy, d)
//     }
// }


// function mult(v) {
//     let ux, uy
//     ux = A[0][0] * v[0] + A[0][1] * v[1]
//     uy = A[1][0] * v[0] + A[1][1] * v[1]
//     return [ux, uy]
// }

// function mousePressed() {

//     // Selecting e'vectors
//     // if (clicked.length < 2)
//     //   for (let n = 0; n < N; n++) {
//     //     vx = V[n][0] + cx
//     //     vy = V[n][1] + cy
//     //     if (dist(mouseX, mouseY, vx, vy) <= 5 && !clicked.includes(n))
//     //       clicked.push(n);
//     //   }

//     // Holding on e'vector
//     if (clicked.length == 2)
//         for (let i = 0; i < 2; i++) {
//             ux = U[clicked[i]][0] + cx
//             uy = U[clicked[i]][1] + cy
//             if (dist(mouseX, mouseY, ux, uy) <= 5)
//                 locked[i] = true;
//         }

//     // Holding on bases vectors
//     for (let i = 0; i < 2; i++) {
//         ux = U[bases[i]][0] + cx
//         uy = U[bases[i]][1] + cy
//         if (dist(mouseX, mouseY, ux, uy) <= 5)
//             locked[i] = true;
//     }

// }

// function mouseReleased() {
//     for (let i = 0; i < 6; i++)
//         locked[i] = false;

// }

// function mouseDragged() {
//     // for (let i = 0; i < 2; i++)  // Check both e'vectors
//     //   if (locked[i]) {           // If I'm clicking on it
//     //   //   V[clicked[i]][0] = mouseX - cx
//     //   //   V[clicked[i]][1] = mouseY - cy
//     //     // d = dist(mouseX, mouseY, cx, cy) / 50
//     //     d = ((mouseX - cx) * V[clicked[i]][0] + 
//     //         (mouseY - cy) * V[clicked[i]][1]) / norm ** 2
//     //     e_values[i] = d
//     //     // A[i][i] = d
//     //   }
//     for (let i = 0; i < 2; i++)
//         if (locked[i]) {
//             A[0][i] = (mouseX - cx) / norm * (-1) ** i
//             A[1][i] = (mouseY - cy) / norm * (-1) ** i
//             compute_singular_vectors()
//         }
// }

// function compute_singular_vectors() {
//     svd = new mlMatrix.SVD(A)
//     let S = mlMatrix.Matrix.diag(svd.s)
//     R = svd.U.mmul(mlMatrix.Matrix.diag(svd.s)).mmul(svd.V.transpose())
//     r = R.to1DArray().map(u => u.toFixed(2)).toString()
//     a = A.toString()
//     // Fucking determinant!
//     det = mlMatrix.determinant(svd.U)
//     // console.log(det.toFixed(2))
// }

// function update_matrix() {
//     let u1, u2, v1, v2, l1, l2
//     u1 = V[clicked[0]][0]
//     u2 = V[clicked[0]][1]
//     v1 = V[clicked[1]][0]
//     v2 = V[clicked[1]][1]
//     l1 = e_values[0]
//     l2 = e_values[1]

//     let d = u1 * v2 - u2 * v1
//     A[0][0] = (v2 * l1 * u1 - u2 * l2 * v1) / d
//     A[0][1] = (u1 * l2 * v1 - v1 * l1 * u1) / d
//     A[1][0] = (v2 * l1 * u2 - u2 * l2 * v2) / d
//     A[1][1] = (u1 * l2 * v2 - v1 * l1 * u2) / d
// }

// function reset() {
//     A[0] = [1, 0]
//     A[1] = [0, 1]
//     clicked = []
//     e_values = [1, 1]
//     locked = [false, false]
// }