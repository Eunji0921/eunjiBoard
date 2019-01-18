<template>
  <div id="map"></div>
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
    this.$nextTick(()=>{
      this.makeMap(exploder);
    })
  },
  watch: {
  },
  props: [],
  methods: {
    getColor(d) {
      return d > 1000 ? '#800026' :
      d > 500 ? '#BD0026' :
      d > 200 ? '#E31A1C' :
      d > 100 ? '#FC4E2A' :
      d > 50 ? '#FD8D3C' :
      d > 20 ? '#FEB24C' :
      d > 10 ? '#FED976' :
      '#FFEDA0';
    },
    makeMap(exploder) {

      console.log("version@@",  version, exploder, d3);

      var kor = area;
      var width = 800;
      var height = 600;
      var that = this;
      var projection = d3.geoMercator()
                                      .center([127.5, 35.9])
                                      .scale(5000)
                                      .translate([width / 4, height / 2]);

      var path = d3.geoPath().projection(projection);

      var svg = d3.select("#map").append("svg")
                                  .attr("width", width)
                                  .attr("height", height);

      var g = svg.append("g");

      var state_features = topojson.feature(kor, kor.objects.provinces).features;

      var provinces = g.append("g")
                                  .attr("id", "provinces")
                                  .selectAll("path")
                                  .data(state_features)
                                  .enter().append("path")
                                  .attr('id', function (d) {
                                    return "fips";
                                  })
                                  .attr("fill", function (d) {
                                    return that.getColor(Math.random() * 1000);
                                  })
                                  .attr("d", path);

      var explode_states = g.append("g")
                                      .attr("id", "explode-provinces")
                                      .selectAll("path")
                                      .data(state_features)
                                      .enter().append("path")
                                      .attr('id', function (d) {
                                        return "fips";
                                      })
                                      .attr("d", path);

      var exploder = exploder()
                              .projection(projection)
                              .size(function (d, i) {
                                return 150;
                              })
                              .position(function (d, i) {
                                document.getElementById("provName").innerHTML = d.properties.name + '('+d.properties.name_eng+')';
                                return [650, height / 6];
                              })

        var highlighted_state = null;

      explode_states.on('click', function () {
                                              d3.selectAll('.highlighted-state')
                                              .transition()
                                              .duration(500)
                                              .attr("d", path)
                                              .attr("transform", "translate(0,0)")
                                              .each('end', function () {
                                                d3.select(this).classed('highlighted-state', false);
                                              })

                                              d3.select(this)
                                              .classed('highlighted-state', true)
                                              .transition()
                                              .duration(500)
                                              .call(exploder);
      });
    }
  }
}
</script>