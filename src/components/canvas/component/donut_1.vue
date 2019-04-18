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
      default : 150
    },
    height : {
      type : Number,
      default : 150
    },
    styles: Object
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

      // 캔버스 컨트롤러 초기화
      this.provider.frame = [];
      this.provider.resize(this.width, this.height);
      this.provider.options.refresh = true;

      let radius = (this.width < this.height ? this.width : this.height) -5;

      this.provider.frame.push({
              shape:'text',
              baseline:'bottom',
              x:0, y:0,
              width: this.width, height: this.height,
              fill:this.styles.textColor,
              text: this.value,
              font:radius / 4,
              frame:false
          });

      // 원 Path 안의 원 모양        
      var unit = 360 /19;
      var percent = this.value;
      var unitPercent = 0;
      for(var i = 0; i < 20; i++) {
          var target_x = (this.width /2) + (radius / 2 - radius / 20) *Math.cos((Math.PI*1.5)- (Math.PI*2*unit*i));
          var target_y = (this.height /2) + (radius / 2 - radius / 20) *Math.sin((Math.PI*1.5)- (Math.PI*2*unit*i));
          this.provider.frame.push(
              {
                  shape:'circle',
                  x:target_x, y:target_y,
                  width:radius / 20,
                  fill:'rgba(77,79,92,0.5)'
              }
          )
          if(percent > unitPercent) {
              this.provider.frame.push(
                  {
                      shape:'circle',
                      x:target_x, y:target_y,
                      width:radius / 20,
                      fill:this.styles.color,
                      frame:true
                  }
              )
          }
          unitPercent += 5;
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