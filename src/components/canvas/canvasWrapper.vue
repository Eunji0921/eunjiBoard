<template>
  <div class="canvas-wrapper">
    <canvas ref="canvas-backElement"></canvas>
    <canvas ref="canvas-element"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name : 'canvasWrapper',
  data(){
    return{
      provider : {
        backContext : null,
        context : null,  // CanvasRenderingContext 
        frame : [],
        options : {
          refresh : false,
          back_loop: false
        },
        draw : this.draw,
        animate : this.animate,
        resize : this.resize,
        dispose :  this.dispose
      },
      req_back : null
    }
  },
  provide() {
    return {
      provider: this.provider
    };
  },
  mounted () {
    this.provider.context = this.$refs['canvas-element'].getContext('2d');
    this.provider.backContext = this.$refs['canvas-backElement'].getContext('2d');
    var clientWidth = this.$refs['canvas-element'].parentElement.clientWidth;
    var clientHeight = this.$refs['canvas-element'].parentElement.clientHeight;
    this.$refs['canvas-backElement'].width = clientWidth;
    this.$refs['canvas-backElement'].height = clientHeight;
    this.$refs['canvas-element'].width = clientWidth;
    this.$refs['canvas-element'].height = clientHeight;
  },
  methods: {
    draw() {
      cancelAnimationFrame(this.req_back);
      var frame_count = 0;
      var draw_items = this.provider.frame.filter(function(a) {return !a.frame});

      var self = this;
      function loop() {
          self.drawShape('back', draw_items[frame_count]);

          frame_count++
          if(draw_items.length <= frame_count) frame_count = 0;

          self.req_back = requestAnimationFrame(loop);
      }

      if(this.provider.options.back_loop) {
          loop();
      } else {
          draw_items.forEach(function(d){
              self.drawShape('back',d);
          })
      }
    },
    animate(callback) {
      var self = this;
      cancelAnimationFrame(self.req);
      var frame_count = 0;
      var draw_items = this.provider.frame.filter(function(d){return d.frame});
      
      function loop() {
          // draw
          self.drawShape('data', draw_items[frame_count]);
          // update
          frame_count++;

          if(draw_items.length > frame_count) {
              self.req = requestAnimationFrame(loop);
          } else {
              callback();
          }
      }
      if(draw_items.length > 0) loop();
      else callback();
    },
      drawShape(type, config) {
        var self = this;
        var ctx = type == 'back' ? this.provider.backContext : this.provider.context;
        ctx.save();
        if(config.composite) ctx.globalCompositeOperation = config.composite;
        if(config.shadowBlur) {
            ctx.shadowBlur = config.shadowBlur;
            ctx.shadowColor = config.shadowColor;
        }
        switch(config.shape) {
            case "circle":
                ctx.beginPath();
                ctx.strokeStyle = config.stroke;
                ctx.lineWidth = config.strokewidth;
                ctx.arc(config.x, config.y, config.width, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.fillStyle = config.fill;
                ctx.fill();
                if(config.strokewidth > 0) ctx.stroke();
            break;
            case "arc":
                ctx.beginPath();
                ctx.strokeStyle = config.stroke;
                ctx.lineWidth = config.strokewidth;
                ctx.moveTo(config.x, config.y);
                ctx.arc(config.x, config.y, config.width, config.sRadian, config.eRadian, false);
                ctx.closePath();
                ctx.fillStyle = config.fill;
                ctx.fill();
                if(config.strokewidth > 0) ctx.stroke();
            break;
            case "rectangle":
                ctx.strokeStyle = config.stroke;
                ctx.lineWidth = config.strokewidth;
                ctx.beginPath();
                ctx.moveTo(config.x + config.radius.lt, config.y);
                ctx.lineTo(config.x + config.width - config.radius.rt, config.y),
                ctx.quadraticCurveTo(config.x + config.width, config.y, config.x + config.width, config.y + config.radius.rt);
                ctx.lineTo(config.x + config.width, config.y + config.height - config.radius.rb),
                ctx.quadraticCurveTo(config.x + config.width, config.y + config.height, config.x + config.width - config.radius.rb, config.y + config.height);
                ctx.lineTo(config.x + config.radius.lb, config.y + config.height),
                ctx.quadraticCurveTo(config.x, config.y + config.height, config.x, config.y + config.height - config.radius.lb);
                ctx.lineTo(config.x, config.y + config.radius.lt), ctx.quadraticCurveTo(config.x, config.y, config.x + config.radius.lt, config.y);
                ctx.closePath();
                if(config.image) {
                    var srcImage = config.image;
                    ctx.drawImage(srcImage, config.x, config.y, config.width, config.height);
                } else {
                    ctx.fillStyle = config.fill;
                    ctx.fill();
                }
                if(config.strokewidth > 0) ctx.stroke();
            break;
            case "donut":
                ctx.beginPath();
                    ctx.arc(config.x, config.y, config.outterRadius, config.sRadian, config.eRadian, false);
                    ctx.arc(config.x, config.y, config.innerRadius, config.eRadian, config.sRadian, true);
                ctx.closePath();
                ctx.fillStyle = config.fill;
                ctx.fill();
            break;
            case "path" :
                ctx.strokeStyle = config.stroke;
                ctx.lineWidth = config.strokewidth;
                ctx.beginPath();
                ctx.moveTo(config.x, config.y);
                config.points.forEach(function(d){
                    if(d.type === 'line') {
                        ctx.lineTo(d.x, d.y);
                    } else if(d.type === 'beizer') {
                        ctx.bezierCurveTo(d.cp1x, d.cp1y, d.cp2x, d.cp2y, d.x, d.y);
                    } else {
                        ctx.quadraticCurveTo(d.cpx, d.cpy, d.x, d.y)
                    }
                });
                ctx.closePath();
                ctx.fillStyle = config.fill;
                ctx.fill();
                if(config.strokewidth > 0) ctx.stroke();
            break;
            case "text" :
                ctx.fillStyle = config.fill;
                ctx.textBaseline = config.baseline;
                ctx.textAlign = 'center';
                var tempText = config.text;
                ctx.font = config.font + "px Arial";
                //if(ctx.measureText(config.text).width > config.width) tempText = tempText.toFixed(2);
                if(config.text.toString().includes('\n')) {
                    ctx.fillTextMultiLine(tempText,config.x + (config.width / 2), config.y + (config.height/2), config.font)
                } else {
                    ctx.fillText(tempText, config.x + (config.width / 2), config.y + (config.height/2) + (config.font*1/2));
                }
            break;
        }
        ctx.restore();
        if(config.children && config.children.length > 0) {
            config.children.forEach(function(d){
                self.drawShape(type,d);
            })
        }
    },
    resize(width,height) {
        this.provider.context.width = width;
        this.provider.context.height = height;
        this.provider.backContext.width = width;
        this.provider.backContext.height = height;
    },
    dispose() {
        if(this.req) cancelAnimationFrame(this.req);
        if(this.req_back) cancelAnimationFrame(this.req_back);
        this.frame = null;
    }
  }
}
</script>

<style>
  .canvas-wrapper{
    position: relative;
  }
  .canvas-wrapper > canvas{
    position: absolute;
  }
</style>