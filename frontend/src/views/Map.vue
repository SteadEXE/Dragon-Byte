<template>
    <div id="map"></div>
</template>

<script>
    import L from 'leaflet'
    import 'leaflet/dist/leaflet.css'

    export default {
        data () {
            return {
                map: null,
                tileLayer: null
            }
        },
        mounted () {
            this.initMap()
            this.initLayer()
        },
        methods: {
            initMap () {
                this.map = L.map('map')
                this.map.setView([47, 7], 4)
            },
            initLayer () {
                this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                })

                this.tileLayer.addTo(this.map)
            }
        }
    }
</script>

<style>
    #map {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
    }
</style>
