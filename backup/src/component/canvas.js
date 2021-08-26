import React, { useRef, useEffect } from 'react'




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



const Canvas = props => {

    const { draw } = props
    const canvasRef = useRef(null)

    useEffect(() => {
        const w = Math.min(window.innerWidth, 500)
        const h = Math.min(window.innerHeight, 300)
        console.log(w)
        console.log(h)

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        canvas.width = w
        canvas.height = h



        const render = () => {

            draw(context)
        }





        render()

    }, [draw])

    return <canvas ref={canvasRef} />
}

export default Canvas