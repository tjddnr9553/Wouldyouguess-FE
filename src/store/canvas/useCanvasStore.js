import { create } from 'zustand'

export const useCanvasStore = create((set,get)=>({
    isDrawing : false,
    ctx: null,

    prepareCanvas: (canvasRef, containerRef, contextRef) => {
        const canvas = canvasRef.current;

        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;

        const context = canvas.getContext("2d");
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;

        set({ctx: contextRef.current});
    },

    startDrawing: ({nativeEvent}) => {
        const ctx = get().ctx;
        const { offsetX, offsetY } = nativeEvent;
        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        set({isDrawing: true});
    },

    finishDrawing: () => {
        const ctx = get().ctx;

        ctx.closePath();
        set({isDrawing: false});
    },

    draw: ({nativeEvent}) => {
        const isDrawing = get().isDrawing;
        const ctx = get().ctx;

        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    },

    drawSquare: ({nativeEvent}, canvasRef ) => {
        const isDrawing = get().isDrawing;
        const ctx = get().ctx;
        set({isDrawing: true});

        console.log('실행');

        if (!isDrawing) return;


        // ctx.strokeStyle = 'yellow';
        // const { offsetX, offsetY } = nativeEvent;

        // let x = offsetX;
        // let y = offsetY;

        // ctx.strokeRect(x, y, 50, 50);

        ctx.strokeStyle = "red";
        let x = nativeEvent.clientX - canvasRef.current.offsetLeft;
        let y = nativeEvent.clientY - canvasRef.current.offsetTop;
        let w = 50;
        let h = 50;
        ctx.strokeRect(x - w / 2, y - h / 2, w, h);
    },

    clearCanvas: (canvasRef) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");

        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
}))
