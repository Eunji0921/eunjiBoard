<script>
export default {
  inject: ["provider"],
  props: {
    value : {
      type : Number,
      default : 0
    },
    width : {
      type : Number,
      default : 50
    },
    height : {
      type : Number,
      default : 50
    },
    styles: Object,
    row : {
      type : Number,
      default : 20
    },
    column : {
      type : Number,
      default : 5
    },
    gaugeColor : {
      type : String,
      default : "rgba(221,77,136,1)"
    },
    gridColor : {
      type : String,
      default : "rgba(221,77,136,0.5)"
    },
    direction : {
      type : String,
      default : "top"
    }
  },
  data () {
    return {
      oldVal : 0,
      newVal : 0
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.dataRender();
    })
  },
  watch : {
    value(newVal, oldVal){
      this.oldVal = this.value;
      this.newVal = newVal;
      this.$nextTick(()=>{
        this.dataRender();
      })
    }
  },
  methods : {
    dataRender(){
      if (!this.provider.context) return;

      var margin = 1;
      var radius = 0;

      // 캔버스 컨트롤러 초기화
      this.provider.frame = [];
      this.provider.resize(this.width, this.height);
      this.provider.options.refresh = true;
      var deco = this.provider.context.canvas.height/ this.row * 2;
      var unit_width = this.provider.context.canvas.width / this.column - (margin * 2);
      var unit_height = (this.provider.context.canvas.height - deco) / this.row - (margin * 2);
      var rate = (this.column * this.row) / 100;
      var calculated_percent = this.value;
      var i = this.direction === "top" ? this.row - 1 : 0;
      var j = this.direction === "left" ? this.column - 1 : 0;
      
      this.provider.frame = [];
      this.provider.frame.push({
          shape: 'rectangle', 
          x: margin,
          y: this.height - deco + this.margin,
          width: this.width - (margin*2), 
          height: deco/2 - margin,
          fill: this.gaugeColor,radius:{ lt : radius, lb : radius, rt : radius, rb : radius },
          children:[
              {
                  shape:'path',
                  strokewidth:0,
                  stroke:this.gridColor,
                  fill:this.gridColor,
                  x:0,
                  y:this.height - (deco/2),
                  points:[{type:'line',x:this.width/2,y:this.height},
                  {type:'line',x:this.width,y:this.height - (deco/2)}]
              }
          ],
          frame:false
      })

      var flag = true;
      while(flag) {
          var position = 0;
          switch(this.direction) {
              case 'top':
                  position = (Math.abs(i - this.row + 1) * this.column) + j;
              break;
              case 'bottom':
                  position = (i* this.column) + j;
              break;
              case 'left':
                  position = (Math.abs(j - this.column + 1) * this.row) + i;
              break;
              case 'right':
                  position = (j* this.row) + i;
              break;
          }
          position = position / rate;
          
          this.provider.frame.push({
              shape: 'rectangle',
              x: unit_width * j + (this.margin * j * 2) + this.margin,
              y: unit_height * i + (margin * i * 2) + margin,
              width: unit_width,
              height: unit_height,
              fill: this.gridColor,
              radius:{ lt : radius, lb : radius, rt : radius, rb : radius },
              frame:false
          })
          
          if(position < calculated_percent) {
              var percent = 1;
              if(Math.abs(position - calculated_percent) < (1 / rate) && Math.abs(position - calculated_percent) > 0) {
                  percent = Math.abs(position - calculated_percent) / (1 / rate);
              }
              this.provider.frame.push({
                  shape:'rectangle',
                  x: (this.direction === "left" ? unit_width * j + unit_width * (1 - percent) : unit_width * j) + (margin * j * 2) + margin,
                  y: (this.direction === "top" ? unit_height * i + unit_height * (1 - percent) : unit_height * i) + (margin * i * 2) + margin,
                  width: (this.direction === "left" || this.direction === "right" ? unit_width * percent : unit_width),
                  height: (this.direction === "top" || this.direction === "bottom" ? unit_height * percent : unit_height),
                  fill: this.gaugeColor,radius:{ lt : radius, lb : radius, rt : radius, rb : radius },
                  frame:true
              })
          }

          switch(this.direction) {
              case 'top':

                  j++;
                  if(j >= this.column) {
                      j = 0;
                      i--;
                  }
              break;
              case 'bottom':

                  j++;
                  if(j >= this.column) {
                      j = 0;
                      i++;
                  }
              break;
              case 'left':

                  i++;
                  if(i >= this.row) {
                      i = 0;
                      j--;
                  }
              break;
              case 'right':

                  i++;
                  if(i >= this.row) {
                      i = 0;
                      j++;
                  }
              break;
          }
          
          if(!(i >= 0 && i < this.row && j >= 0 && j < this.column)) {
              flag = false;
          }
      }
    }
  },
  render() {
    if (!this.provider.context) return;
    const ctx = this.provider.context;
    const ctx_ = this.provider.backContext;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx_.clearRect(0, 0, this.width, this.height);
    this.provider.draw();
    this.provider.animate(function(){
    });
  }
}
</script>