window.addEventListener("load", ()=>{
    const m = new madoi.Madoi("rooms/whiteboard-olkksdfeg3");
    const wb = new WhiteBoard("#whiteboard");
    m.register(wb, [
        {method: wb.draw, share: {maxLog: 100}},
        {method: wb.getState, getState: {maxInterval: 1000, maxUpdates: 100}},
        {method: wb.setState, setState: {}}
    ]);
});

class WhiteBoard {
    constructor(boardId) {
        this.boardElm = document.querySelector(boardId);
        this.colorInput = this.boardElm.querySelector("input[name='foreground-color']");
        this.sizeInput = this.boardElm.querySelector("input[name='pen-size']");
        this.canvas = this.boardElm.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.drawing = false;
        this.button = 0;
        this.prevPos = { x: 0, y: 0 };
        this.loading = false;
        this.pendingDrawings = new Array();
    
        this.canvas.addEventListener("mousedown", e => {
            this.drawing = true;
            this.button = e.button;
            this.prevPos.x = e.offsetX;
            this.prevPos.y = e.offsetY;
            this.ctx.lineCap = 'round';
            e.preventDefault();
        });
        this.canvas.addEventListener("mouseup", () => {
            this.drawing = false;
        });
        this.canvas.addEventListener("mousemove", e => {
            if (!this.drawing) return;
            let c = "#FFFFFF";
            let size = parseInt(this.sizeInput.value);
            if (this.button === 0) {
                c = this.colorInput.value;
            } else{
                size += 4;
            }
            this.draw(this.prevPos.x, this.prevPos.y, e.offsetX, e.offsetY, size, c);
            this.prevPos = {x: e.offsetX, y: e.offsetY};
        });
        this.canvas.oncontextmenu = () => false;
    }

    draw(prevX, prevY, x, y, size, color) {
        if(this.loading){
            // 画像がロード中の場合は描画を後回しにする
            this.pendingDrawings.push({
                prevX: prevX, prevY: prevY,
                x: x, y: y, size: size, color: color
            });
        } else{
            this.ctx.beginPath();
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = size;
            this.ctx.moveTo(prevX, prevY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    getState() {
        return this.canvas.toDataURL("image/png");
    }

    setState(state) {
        this.loading = true;
        const img = new Image();
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
            for(const p of this.pendingDrawings){
                this.ctx.beginPath();
                this.ctx.strokeStyle = p.color;
                this.ctx.lineWidth = p.size;
                this.ctx.moveTo(p.prevX, p.prevY);
                this.ctx.lineTo(p.x, p.y);
                this.ctx.stroke();
            }
            this.pendingDrawings = new Array();
            this.loading = false;
        };
        img.src = state;
    }
}
