<template>
  <div class="mapWrap">
    <div id="map"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import * as d3 from 'd3v4'
import { exploder, version } from 'd3-exploder'
import * as topojson from 'topojson'
import area from 'Script/area.json'

export default {
  name : 'baseContainer',
  components : {

  },
  data(){
    return{
    }
  },
  mounted () {
    this.createInitMap();
  },
  watch: {
  },
  props: [],
  methods: {
    createInitMap(){
      this.$nextTick(()=>{
        this.makeMap(exploder);
      });    
    },
    getColor(d) {
      return d > 1000 ? '#1A237E' :
      d > 500 ? '#1A237E' :
      d > 200 ? '#1A237E' :
      d > 100 ? '#1A237E' :
      d > 50 ? '#1A237E' :
      d > 20 ? '#1A237E' :
      d > 10 ? '#1A237E' :
      '#1A237E';
    },
    makeMap(exploder) {

      var kor = area;
      var width = 750;
      var height = 1000;
      var that = this;
      var projection = d3.geoMercator()
                                      .center([127.5, 35.9])
                                      .scale(6000)
                                      .translate([width / 2, height / 2]);

      var path = d3.geoPath().projection(projection);

      var svg = d3.select("#map").append("svg")
                                  .attr("width", "100%")
                                  .attr("height", "100%");

      var g = svg.append("g");

      var state_features = topojson.feature(kor, kor.objects.provinces).features;

      var provinces = g.append("g")
                                  .attr("id", "provinces")
                                  .selectAll("path")
                                  .data(state_features)
                                  .enter().append("path")
                                  .attr('id', function (d) {
                                    return "fips_" + d.properties.code;
                                  })
                                  .attr("fill", function (d) {
                                    return that.getColor(Math.random() * 1000);
                                  })
                                  .attr("d", path);

      var explode_states = g.append("g")
                                      .attr("id", "explode-provinces")
                                      .selectAll("path")
                                      .data(state_features)
                                      .enter()
                                      .append("path")
                                      .attr('id', function (d) {
                                        return "fips_" + d.properties.code;
                                      })
                                      .attr("d", path);
    
      g.selectAll(".place-label")
        .data(state_features)
        .enter()
        .append("text")
        .attr("class", function(d) {
          return "place-label";
          })
        .attr("transform", function(d) {
          let posi = path.centroid(d);
          posi[0] = posi[0]-20;
          if(d.properties.code == 31){
            posi[1] = posi[1]+40;
          }
          return "translate(" + posi + ")";
          })
        .text(function(d) {
          var s = d.properties.name;
          if (!s) return;
          return s;
        });

      // var exploder = exploder()
      //                     .projection(projection)
      //                     .size(function (d, i) {
      //                       return 200;
      //                     })
      //                     .position(function (d, i) {
      //                       return "translate(" + path.centroid(d) + ")";
      //                     })

      explode_states.on('click', function () {
                                              d3.selectAll('.highlighted-state')
                                              .transition()
                                              .duration(50)
                                              .attr("d", path)
                                              .attr("transform", "translate(0,0)")
                                              .on('end', function () {
                                                d3.select(this).classed('highlighted-state', false);
                                              })

                                              d3.select(this)
                                              .classed('highlighted-state', true)
                                              .transition()
                                              .duration(1000)
                                              // .call(exploder);
      });
    }
  }
}
</script>

<style lang="scss">
  @import '~Styles/geoDashBoard.scss';
</style>