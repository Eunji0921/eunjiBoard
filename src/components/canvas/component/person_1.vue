<script>
import $ from 'jquery';
import person from 'Script/person.svg'
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
    styles: Object
  },
  data () {
    return {
      oldVal : 0,
      newVal : 0,
      img : null
    }
  },
  created(){
  },
  mounted(){
    this.$nextTick(()=>{
      this.loadImage().then(()=>{
        this.dataRender();
      })
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
    loadImage() {
      var that = this;
      return new Promise((resolve,reject) => {
          that.img = new Image();
          that.img.crossOrigin = "anonymous"
          that.img.addEventListener("load",function(){
            resolve();
          })
          that.img.src = person;
      })
    },
    dataRender(){
      if (!this.provider.context || !this.img) return;

      // 캔버스 컨트롤러 초기화
      this.provider.resize(this.width, this.height);

      var resultText=  this.value
      var percent = resultText / 100;
      this.provider.frame = [];
      for(var i = 30; i > 0; i--) {
          this.provider.frame.push({
              shape:'rectangle', 
              frame:true,
              x:this.width/2 - (this.width * percent/i/2),
              y:this.height - ((this.height-this.height/8)* percent/i),
              image:this.img,
              width:this.width * percent/i,height:(this.height-this.height/8)/i * percent,
              radius:{ lt : 0, lb : 0, rt : 0, rb : 0 },
              children:[{
                  shape:'rectangle',
                  frame:true,
                  x:this.width/2 - (this.width * percent/i/2),
                  y:this.height - ((this.height-this.height/8)/i* percent),
                  fill:this.styles.color,
                  width:this.width * percent/i,height:(this.height-this.height/8)/i * percent,
                  radius:{ lt : 0, lb : 0, rt : 0, rb : 0 },
                  composite:"source-in"
              },{
                  shape:'text',
                  baseline:'bottom',
                  x:0,y: this.height - ((this.height-this.height/8)/i* percent) - this.height/8,
                  width:this.width,height:this.height/8,
                  text: resultText,
                  font:this.height/8,
                  fill:this.styles.textColor,
                  frame:false
              }]
          });
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
  },
  destroyed(){
    this.provider.dispose();
  }
}
</script>