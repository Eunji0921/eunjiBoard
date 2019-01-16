<template>
  <div id="map"></div>
</template>

<script>
import Vue from 'vue'
import * as d3 from 'd3'
import * as topojson from 'topojson'
import { exploder } from 'd3-exploder'
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
    this.makeMap();
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
    makeMap() {
      var kor = area;
      var width = 800;
      var height = 600;

      var projection = d3.geo.mercator()
        .center([127.5, 35.9])
        .scale(5000)
        .translate([width / 4, height / 2]);

      var path = d3.geo.path()
        .projection(projection);

      var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height);

      var g = svg.append("g");

      var state_features = topojson.feature(
          kor, kor.objects.provinces).features;

      var provinces = g.append("g")
        .attr("id", "provinces")
        .selectAll("path")
        .data(state_features)
        .enter().append("path")
        .attr('id', function (d) {
          return "fips_" + d.id;
        })
        .attr("fill", function (d) {
          return getColor(Math.random() * 1000);
        })
        .attr("d", path);

      var explode_states = g.append("g")
        .attr("id", "explode-provinces")
        .selectAll("path")
        .data(state_features)
        .enter().append("path")
        .attr('id', function (d) {
          return "fips_" + d.id;
        })
        .attr("d", path);

      var exploder = d3.geo.exploder()
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