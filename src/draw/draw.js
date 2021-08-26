import { Matrix } from 'ml-matrix';
const cx = 500;
const cy = 300;
// window.new window.mlMatrix.SVD

let V = []
let U = []
let clicked = []
let e_values = [1, 1]
// 2 bases, 2 left-singular vectors, 2 e'evectors
let locked = [false, false, false, false, false, false]
let N = 16
let A = []
const bases = [0, 12]
const norm = 50
let s_values = [[norm, 0], [0, -norm]]
let svd

const red = '#fb8072'
const green = '#b3de69'
const orange = '#fdb462'
const blue = '#80b1d3'
const blue_orange = [blue, orange]



const draw = (ctx,) => {

    const w = ctx.width
    const h = ctx.height

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // console.log(ctx.canvas.width)

    const cx = w / 2;
    const cy = h / 2;
    for (let n = 0; n < N; n++) {
        V[n] = [];
        V[n][0] = norm * Math.cos(n * 2 * Math.PI / N);
        V[n][1] = norm * Math.sin(n * 2 * Math.PI / N);
        U[n] = [...V[n]];
    }
    A[0] = [1, 0]
    A[1] = [0, 1]

    // compute_singular_vectors()



    const color_matrix = Matrix.ones(6, 6);


    // vanilla javascript 
    console.log("Starting")
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            // console.log(i + " " + j);
            // console.log(m1.data[i][j])
            color_matrix.data[i][j] = Math.floor(255 - 42.5 * i)
            ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ', ' +
                Math.floor(255 - 42.5 * j) + ', 0)';
            ctx.fillRect(j * 25, i * 25, 25, 25);
        }
    }

    // ml-matrix javascript example


    ctx.moveTo(300, 300);
    ctx.font = "30px Arial";

    // for (var i = 0; i < 6; i++) {
    //     for (var j = 0; j < 6; j++) {
    //         ctx.fillText(color_matrix.data[i][j], j * 200 + 200, i * 200 + 200);
    //     }
    // }

    // let svd = new window.mlMatrix.SVD(A)
    // console.log(svd)
    // compute_singular_vectors()

    // Create reset button
    //   button = createButton('Reset')
    //   button.position(0, height-20)
    //   button.mousePressed(reset)
    //   button.style('background-color', 'black')
    //   button.style('color', '#bbbbbb')
    //   button.style('border', 'none')
}


// // Alfredo Canziani, 18 Aug 2021


// function setup() {





// }

function compute_singular_vectors() {
    svd = new window.mlMatrix.SVD(A)
    let S = window.mlMatrix.Matrix.diag(svd.s)
    let R = svd.U.mmul(window.mlMatrix.Matrix.diag(svd.s)).mmul(svd.V.transpose())
    let r = R.to1DArray().map(u => u.toFixed(2)).toString()
    let a = A.toString()
    // Fucking determinant!
    let det = window.mlMatrix.determinant(svd.U)
    // console.log(det.toFixed(2))
}

export default draw