class MatrixEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'matrixCanvas';
        document.body.prepend(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        // Increase font size
        this.fontSize = 30;
        this.characters = '10';
        this.columns = 0;
        this.drops = [];

        // Bind the animation to ensure it keeps running
        this.animate = this.animate.bind(this);
        
        window.addEventListener('resize', () => this.resizeCanvas());
        this.resizeCanvas();
        this.initMatrix();
        // Start animation immediately
        requestAnimationFrame(this.animate);
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.initMatrix();
    }

    initMatrix() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    animate() {
        // Lighter fade for more visible trails
        this.ctx.fillStyle = 'rgba(10, 10, 42, 0.04)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = `bold ${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;

            // Add slight variance to character opacity
            this.ctx.globalAlpha = Math.random() * 0.5 + 0.5;
            this.ctx.fillText(char, x, y);
            this.ctx.globalAlpha = 1;

            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
        
        // Ensure animation continues
        requestAnimationFrame(this.animate);
    }
}
