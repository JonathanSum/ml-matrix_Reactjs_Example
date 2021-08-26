import React, { Component } from "react";
import Sketch from "react-p5";

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


export default class P5 extends Component {
    x = 50
    y = 50

    setup = (p5, parent) => {
        const w = Math.min(window.innerWidth, 600)
        const h = Math.min(window.innerHeight, 400)
        // p5.createCanvas(600, 400).parent(parent)
        // console.log(w, h)
        p5.createCanvas(w, h).parent(parent);
        // Centre coordinates
        p5.cx = p5.width / 2;
        p5.cy = p5.height / 2;
        for (let n = 0; n < N; n++) {
            V[n] = [];
            V[n][0] = norm * p5.cos(n * 2 * p5.PI / N);
            V[n][1] = norm * p5.sin(n * 2 * p5.PI / N);
            U[n] = [...V[n]];
        }
        A[0] = [1, 0]
        A[1] = [0, 1]

        compute_singular_vectors()

        // Create reset button
        p5.button = p5.createButton('Reset')


        p5.button.position(0, p5.height - 20)
        p5.button.mousePressed(p5.reset)
        p5.button.style('background-color', 'black')
        p5.button.style('color', '#bbbbbb')
        p5.button.style('border', 'none')
    }
    draw = p5 => {
        p5.background("black")
        p5.fill("#bbbbbb")
        for (let i = 0; i < 2; i++) {
            p5.sx = svd.U.data[i][0] * svd.s[i] * norm + p5.cx
            p5.sy = -svd.U.data[i][1] * svd.s[i] * norm * p5.det + p5.cy
            p5.d = 10; p5.fill(blue_orange[i]); p5.noStroke()
            p5.ellipse(p5.sx, p5.sy, p5.d)
            p5.stroke(blue_orange[i])
            p5.line(p5.sx, p5.sy, 2 * p5.cx - p5.sx, 2 * p5.cy - p5.sy)
        }

        for (let n = 0; n < N; n++) {
            // Update u vectors
            U[n] = mult(V[n])

            // Move u and v to the centre
            p5.ux = U[n][0] + p5.cx
            p5.uy = U[n][1] + p5.cy
            p5.vx = V[n][0] + p5.cx
            p5.vy = V[n][1] + p5.cy

            // Draw the input points in grey
            // Draw i and j in R and G
            p5.fill('grey')
            switch (n) {
                case bases[0]: p5.fill(red); break
                case bases[1]: p5.fill(green); break
            }
            p5.d = 5
            p5.noStroke()
            p5.ellipse(p5.vx, p5.vy, p5.d)

            // Set output points in white
            p5.fill('white')

            // Highlight cicles under the mouse
            // if (dist(mouseX, mouseY, ux, uy) <= 5 && clicked.length < 2)
            //   d = 15;

            // Draw lines through the e'vectors, set colour and size
            for (let i = 0; i < clicked.length; i++)
                if (clicked[i] == n) {
                    p5.stroke("grey")
                    p5.line(
                        p5.cx - V[n][0] * 10, p5.cy - V[n][1] * 10,
                        p5.cx + V[n][0] * 10, p5.cy + V[n][1] * 10
                    )
                    p5.d = 10
                    p5.fill(181, 223, 108)
                }

            // Draw i and j in R and G
            switch (n) {
                case bases[0]: p5.d = 10; p5.fill(red); break
                case bases[1]: p5.d = 10; p5.fill(green); break
            }


            // Draw output points
            p5.ellipse(p5.ux, p5.uy, p5.d)
        }



    }

    render() {
        return <Sketch setup={this.setup} draw={this.draw} />
    }
}



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

function mult(v) {
    let ux, uy
    ux = A[0][0] * v[0] + A[0][1] * v[1]
    uy = A[1][0] * v[0] + A[1][1] * v[1]
    return [ux, uy]
}

function mousePressed(p5) {

    // Selecting e'vectors
    // if (clicked.length < 2)
    //   for (let n = 0; n < N; n++) {
    //     vx = V[n][0] + cx
    //     vy = V[n][1] + cy
    //     if (dist(mouseX, mouseY, vx, vy) <= 5 && !clicked.includes(n))
    //       clicked.push(n);
    //   }

    // Holding on e'vector
    if (clicked.length == 2)
        for (let i = 0; i < 2; i++) {
            p5.ux = U[clicked[i]][0] + p5.cx
            p5.uy = U[clicked[i]][1] + p5.cy
            if (p5.dist(p5.mouseX, p5.mouseY, p5.ux, p5.uy) <= 5)
                locked[i] = true;
        }

    // Holding on bases vectors
    for (let i = 0; i < 2; i++) {
        p5.ux = U[bases[i]][0] + p5.cx
        p5.uy = U[bases[i]][1] + p5.cy
        if (p5.dist(p5.mouseX, p5.mouseY, p5.ux, p5.uy) <= 5)
            locked[i] = true;
    }

}

function mouseReleased(p5) {
    for (let i = 0; i < 6; i++)
        locked[i] = false;

}

function mouseDragged(p5) {
    // for (let i = 0; i < 2; i++)  // Check both e'vectors
    //   if (locked[i]) {           // If I'm clicking on it
    //   //   V[clicked[i]][0] = mouseX - cx
    //   //   V[clicked[i]][1] = mouseY - cy
    //     // d = dist(mouseX, mouseY, cx, cy) / 50
    //     d = ((mouseX - cx) * V[clicked[i]][0] + 
    //         (mouseY - cy) * V[clicked[i]][1]) / norm ** 2
    //     e_values[i] = d
    //     // A[i][i] = d
    //   }
    for (let i = 0; i < 2; i++)
        if (locked[i]) {
            A[0][i] = (p5.mouseX - p5.cx) / norm * (-1) ** i
            A[1][i] = (p5.mouseY - p5.cy) / norm * (-1) ** i
            compute_singular_vectors()
        }
}


function update_matrix() {
    let u1, u2, v1, v2, l1, l2
    u1 = V[clicked[0]][0]
    u2 = V[clicked[0]][1]
    v1 = V[clicked[1]][0]
    v2 = V[clicked[1]][1]
    l1 = e_values[0]
    l2 = e_values[1]

    let d = u1 * v2 - u2 * v1
    A[0][0] = (v2 * l1 * u1 - u2 * l2 * v1) / d
    A[0][1] = (u1 * l2 * v1 - v1 * l1 * u1) / d
    A[1][0] = (v2 * l1 * u2 - u2 * l2 * v2) / d
    A[1][1] = (u1 * l2 * v2 - v1 * l1 * u2) / d
}

function reset() {
    A[0] = [1, 0]
    A[1] = [0, 1]
    clicked = []
    e_values = [1, 1]
    locked = [false, false]
}