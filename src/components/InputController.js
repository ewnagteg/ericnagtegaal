
export class InputController {
    constructor(xclip, yclip) {
        this.state = {
            x: 0,
            y: 0,
        };
        this.xclip = Math.round(xclip * window.innerWidth / 2);
        this.yclip = Math.round(yclip * window.innerHeight / 2);
    }

    _mouseMove(event) {
        this.state.x = event.x - window.innerWidth / 2;
        this.state.y = event.y - window.innerHeight / 2;
        this.clip();
    }

    clip() {
        if (Math.abs(this.state.x) > this.xclip)
            this.state.x = this.xclip * (this.state.x > 0 ? 1 : -1);
        if (Math.abs(this.state.y) > this.yclip)
            this.state.y = this.yclip * (this.state.y > 0 ? 1 : -1);
        this.state.px = this.state.x / this.xclip;
        this.state.py = this.state.y / this.yclip;
    }
}