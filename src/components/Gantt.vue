<script setup>
import editIconRaw from '../assets/EpEdit.svg?raw'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
import { data } from './gantt-data'

const svgBase64 = btoa(editIconRaw)
const svgDataUrl = `image://data:image/svg+xml;base64,${svgBase64}`

const chartContainer = ref(null)
let myChart = null
let resizeObserver = null

let HEIGHT_RATIO = 0.6
let DIM_CATEGORY_INDEX = 0
let DIM_TIME_ARRIVAL = 1
let DIM_TIME_DEPARTURE = 2
let DATA_ZOOM_AUTO_MOVE_THROTTLE = 30
let DATA_ZOOM_X_INSIDE_INDEX = 1
let DATA_ZOOM_Y_INSIDE_INDEX = 3
let DATA_ZOOM_AUTO_MOVE_SPEED = 0.2
let DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH = 30
let _draggable
let _draggingEl
let _dropShadow
let _draggingCursorOffset = [0, 0]
let _draggingTimeLength
let _draggingRecord
let _dropRecord
let _cartesianXBounds = []
let _cartesianYBounds = []
let _rawData
let _autoDataZoomAnimator

const createChartOption = () => {
  return {
    tooltip: {},
    animation: false,
    toolbox: {
      left: 20,
      top: 0,
      itemSize: 20,
      feature: {
        myDrag: {
          show: true,
          title: 'Make bars\ndraggable',
          icon: svgDataUrl,
          onclick: onDragSwitchClick
        }
      }
    },
    title: {
      text: 'Gantt of Airport Flight',
      left: 'center'
    },
    dataZoom: [
      {
        type: 'slider',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 20,
        bottom: 0,
        start: 0,
        end: 26,
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideX',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        start: 0,
        end: 26,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true
      },
      {
        type: 'slider',
        yAxisIndex: 0,
        zoomLock: true,
        width: 10,
        right: 10,
        top: 70,
        bottom: 20,
        start: 95,
        end: 100,
        handleSize: 0,
        showDetail: false
      },
      {
        type: 'inside',
        id: 'insideY',
        yAxisIndex: 0,
        start: 95,
        end: 100,
        zoomOnMouseWheel: false,
        moveOnMouseMove: true,
        moveOnMouseWheel: true
      }
    ],
    grid: {
      show: true,
      top: 70,
      bottom: 20,
      left: 100,
      right: 20,
      backgroundColor: '#fff',
      borderWidth: 0
    },
    xAxis: {
      type: 'time',
      position: 'top',
      splitLine: {
        lineStyle: {
          color: ['#E9EDFF']
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        lineStyle: {
          color: '#929ABA'
        }
      },
      axisLabel: {
        color: '#929ABA',
        inside: false,
        align: 'center'
      }
    },
    yAxis: {
      axisTick: { show: false },
      splitLine: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
      min: 0,
      max: _rawData.parkingApron.data.length
    },
    series: [
      {
        id: 'flightData',
        type: 'custom',
        renderItem: renderGanttItem,
        dimensions: _rawData.flight.dimensions,
        encode: {
          x: [DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE],
          y: DIM_CATEGORY_INDEX,
          tooltip: [DIM_CATEGORY_INDEX, DIM_TIME_ARRIVAL, DIM_TIME_DEPARTURE]
        },
        data: _rawData.flight.data
      },
      {
        type: 'custom',
        renderItem: renderAxisLabelItem,
        dimensions: _rawData.parkingApron.dimensions,
        encode: {
          x: -1,
          y: 0
        },
        data: _rawData.parkingApron.data.map(function (item, index) {
          return [index].concat(item)
        })
      }
    ]
  }
}

const initChart = () => {
  if (chartContainer.value) {
    myChart = echarts.init(chartContainer.value)
    myChart.setOption(createChartOption())
  }
}

const handleResize = () => {
  if (myChart) {
    myChart.resize()
  }
}

const disposeChart = () => {
  if (myChart) {
    myChart.dispose()
    myChart = null
  }
}

onMounted(() => {
  nextTick(() => {
    _rawData = data
    initChart()
    initDrag()
    resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(chartContainer.value)
  })
})

onUnmounted(() => {
  disposeChart()
  resizeObserver?.disconnect()
})

function renderGanttItem(params, api) {
  let categoryIndex = api.value(DIM_CATEGORY_INDEX)
  let timeArrival = api.coord([api.value(DIM_TIME_ARRIVAL), categoryIndex])
  let timeDeparture = api.coord([api.value(DIM_TIME_DEPARTURE), categoryIndex])
  let coordSys = params.coordSys
  _cartesianXBounds[0] = coordSys.x
  _cartesianXBounds[1] = coordSys.x + coordSys.width
  _cartesianYBounds[0] = coordSys.y
  _cartesianYBounds[1] = coordSys.y + coordSys.height
  let barLength = timeDeparture[0] - timeArrival[0]
  // Get the heigth corresponds to length 1 on y axis.
  let barHeight = api.size([0, 1])[1] * HEIGHT_RATIO
  let x = timeArrival[0]
  let y = timeArrival[1] - barHeight
  let flightNumber = api.value(3) + ''
  let flightNumberWidth = echarts.format.getTextRect(flightNumber).width
  let text =
    barLength > flightNumberWidth + 40 && x + barLength >= 180
      ? flightNumber
      : ''
  let rectNormal = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  })
  let rectVIP = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength / 2,
    height: barHeight
  })
  let rectText = clipRectByRect(params, {
    x: x,
    y: y,
    width: barLength,
    height: barHeight
  })
  return {
    type: 'group',
    children: [
      {
        type: 'rect',
        ignore: !rectNormal,
        shape: rectNormal,
        style: api.style()
      },
      {
        type: 'rect',
        ignore: !rectVIP && !api.value(4),
        shape: rectVIP,
        style: api.style({ fill: '#ddb30b' })
      },
      {
        type: 'rect',
        ignore: !rectText,
        shape: rectText,
        style: api.style({
          fill: 'transparent',
          stroke: 'transparent',
          text: text,
          textFill: '#fff'
        })
      }
    ]
  }
}
function renderAxisLabelItem(params, api) {
  let y = api.coord([0, api.value(0)])[1]
  if (y < params.coordSys.y + 5) {
    return
  }
  return {
    type: 'group',
    position: [10, y],
    children: [
      {
        type: 'path',
        shape: {
          d: 'M0,0 L0,-20 L30,-20 C42,-20 38,-1 50,-1 L70,-1 L70,0 Z',
          x: 0,
          y: -20,
          width: 90,
          height: 20,
          layout: 'cover'
        },
        style: {
          fill: '#368c6c'
        }
      },
      {
        type: 'text',
        style: {
          x: 24,
          y: -3,
          text: api.value(1),
          textVerticalAlign: 'bottom',
          textAlign: 'center',
          textFill: '#fff'
        }
      },
      {
        type: 'text',
        style: {
          x: 75,
          y: -2,
          textVerticalAlign: 'bottom',
          textAlign: 'center',
          text: api.value(2),
          textFill: '#000'
        }
      }
    ]
  }
}
function clipRectByRect(params, rect) {
  return echarts.graphic.clipRectByRect(rect, {
    x: params.coordSys.x,
    y: params.coordSys.y,
    width: params.coordSys.width,
    height: params.coordSys.height
  })
}
function onDragSwitchClick(model, api, type) {
  _draggable = !_draggable
  myChart.setOption({
    dataZoom: [
      {
        id: 'insideX',
        disabled: _draggable
      },
      {
        id: 'insideY',
        disabled: _draggable
      }
    ]
  })
  this.model.setIconStatus(type, _draggable ? 'emphasis' : 'normal')
}
function initDrag() {
  _autoDataZoomAnimator = makeAnimator(dispatchDataZoom)
  myChart.on('mousedown', function (param) {
    if (!_draggable || !param || param.seriesIndex == null) {
      return
    }
    // Drag start
    _draggingRecord = {
      dataIndex: param.dataIndex,
      categoryIndex: param.value[DIM_CATEGORY_INDEX],
      timeArrival: param.value[DIM_TIME_ARRIVAL],
      timeDeparture: param.value[DIM_TIME_DEPARTURE]
    }
    let style = {
      lineWidth: 2,
      fill: 'rgba(255,0,0,0.1)',
      stroke: 'rgba(255,0,0,0.8)',
      lineDash: [6, 3]
    }
    _draggingEl = addOrUpdateBar(_draggingEl, _draggingRecord, style, 100)
    _draggingCursorOffset = [
      _draggingEl.position[0] - param.event.offsetX,
      _draggingEl.position[1] - param.event.offsetY
    ]
    _draggingTimeLength =
      _draggingRecord.timeDeparture - _draggingRecord.timeArrival
  })
  myChart.getZr().on('mousemove', function (event) {
    if (!_draggingEl) {
      return
    }
    let cursorX = event.offsetX
    let cursorY = event.offsetY
    // Move _draggingEl.
    _draggingEl.attr('position', [
      _draggingCursorOffset[0] + cursorX,
      _draggingCursorOffset[1] + cursorY
    ])
    prepareDrop()
    autoDataZoomWhenDraggingOutside(cursorX, cursorY)
  })
  myChart.getZr().on('mouseup', function () {
    // Drop
    if (_draggingEl && _dropRecord) {
      updateRawData() &&
        myChart.setOption({
          series: {
            id: 'flightData',
            data: _rawData.flight.data
          }
        })
    }
    dragRelease()
  })
  myChart.getZr().on('globalout', dragRelease)
  function dragRelease() {
    _autoDataZoomAnimator.stop()
    if (_draggingEl) {
      myChart.getZr().remove(_draggingEl)
      _draggingEl = null
    }
    if (_dropShadow) {
      myChart.getZr().remove(_dropShadow)
      _dropShadow = null
    }
    _dropRecord = _draggingRecord = null
  }
  function addOrUpdateBar(el, itemData, style, z) {
    let pointArrival = myChart.convertToPixel('grid', [
      itemData.timeArrival,
      itemData.categoryIndex
    ])
    let pointDeparture = myChart.convertToPixel('grid', [
      itemData.timeDeparture,
      itemData.categoryIndex
    ])
    let barLength = pointDeparture[0] - pointArrival[0]
    let barHeight =
      Math.abs(
        myChart.convertToPixel('grid', [0, 0])[1] -
        myChart.convertToPixel('grid', [0, 1])[1]
      ) * HEIGHT_RATIO
    if (!el) {
      el = new echarts.graphic.Rect({
        shape: { x: 0, y: 0, width: 0, height: 0 },
        style: style,
        z: z
      })
      myChart.getZr().add(el)
    }
    el.attr({
      shape: { x: 0, y: 0, width: barLength, height: barHeight },
      position: [pointArrival[0], pointArrival[1] - barHeight]
    })
    return el
  }
  function prepareDrop() {
    // Check droppable place.
    let xPixel = _draggingEl.shape.x + _draggingEl.position[0]
    let yPixel = _draggingEl.shape.y + _draggingEl.position[1]
    let cursorData = myChart.convertFromPixel('grid', [xPixel, yPixel])
    if (cursorData) {
      // Make drop shadow and _dropRecord
      _dropRecord = {
        categoryIndex: Math.floor(cursorData[1]),
        timeArrival: cursorData[0],
        timeDeparture: cursorData[0] + _draggingTimeLength
      }
      let style = { fill: 'rgba(0,0,0,0.4)' }
      _dropShadow = addOrUpdateBar(_dropShadow, _dropRecord, style, 99)
    }
  }
  // This is some business logic, don't care about it.
  function updateRawData() {
    let flightData = _rawData.flight.data
    let movingItem = flightData[_draggingRecord.dataIndex]
    // Check conflict
    for (let i = 0; i < flightData.length; i++) {
      let dataItem = flightData[i]
      if (
        dataItem !== movingItem &&
        _dropRecord.categoryIndex === dataItem[DIM_CATEGORY_INDEX] &&
        _dropRecord.timeArrival < dataItem[DIM_TIME_DEPARTURE] &&
        _dropRecord.timeDeparture > dataItem[DIM_TIME_ARRIVAL]
      ) {
        alert('Conflict! Find a free space to settle the bar!')
        return
      }
    }
    // No conflict.
    movingItem[DIM_CATEGORY_INDEX] = _dropRecord.categoryIndex
    movingItem[DIM_TIME_ARRIVAL] = _dropRecord.timeArrival
    movingItem[DIM_TIME_DEPARTURE] = _dropRecord.timeDeparture
    return true
  }
  function autoDataZoomWhenDraggingOutside(cursorX, cursorY) {
    // When cursor is outside the cartesian and being dragging,
    // auto move the dataZooms.
    let cursorDistX = getCursorCartesianDist(cursorX, _cartesianXBounds)
    let cursorDistY = getCursorCartesianDist(cursorY, _cartesianYBounds)
    if (cursorDistX !== 0 || cursorDistY !== 0) {
      _autoDataZoomAnimator.start({
        cursorDistX: cursorDistX,
        cursorDistY: cursorDistY
      })
    } else {
      _autoDataZoomAnimator.stop()
    }
  }
  function dispatchDataZoom(params) {
    let option = myChart.getOption()
    let optionInsideX = option.dataZoom[DATA_ZOOM_X_INSIDE_INDEX]
    let optionInsideY = option.dataZoom[DATA_ZOOM_Y_INSIDE_INDEX]
    let batch = []
    prepareBatch(
      batch,
      'insideX',
      optionInsideX.start,
      optionInsideX.end,
      params.cursorDistX
    )
    prepareBatch(
      batch,
      'insideY',
      optionInsideY.start,
      optionInsideY.end,
      -params.cursorDistY
    )
    batch.length &&
      myChart.dispatchAction({
        type: 'dataZoom',
        batch: batch
      })
    function prepareBatch(batch, id, start, end, cursorDist) {
      if (cursorDist === 0) {
        return
      }
      let sign = cursorDist / Math.abs(cursorDist)
      let size = end - start
      let delta = DATA_ZOOM_AUTO_MOVE_SPEED * sign
      start += delta
      end += delta
      if (end > 100) {
        end = 100
        start = end - size
      }
      if (start < 0) {
        start = 0
        end = start + size
      }
      batch.push({
        dataZoomId: id,
        start: start,
        end: end
      })
    }
  }
  function getCursorCartesianDist(cursorXY, bounds) {
    let dist0 = cursorXY - (bounds[0] + DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH)
    let dist1 = cursorXY - (bounds[1] - DATA_ZOOM_AUTO_MOVE_DETECT_AREA_WIDTH)
    return dist0 * dist1 <= 0
      ? 0 // cursor is in cartesian
      : dist0 < 0
        ? dist0 // cursor is at left/top of cartesian
        : dist1 // cursor is at right/bottom of cartesian
  }
  function makeAnimator(callback) {
    let requestId
    let callbackParams
    // Use throttle to prevent from calling dispatchAction frequently.
    callback = echarts.throttle(callback, DATA_ZOOM_AUTO_MOVE_THROTTLE)
    function onFrame() {
      callback(callbackParams)
      requestId = requestAnimationFrame(onFrame)
    }
    return {
      start: function (params) {
        callbackParams = params
        if (requestId == null) {
          onFrame()
        }
      },
      stop: function () {
        if (requestId != null) {
          cancelAnimationFrame(requestId)
        }
        requestId = callbackParams = null
      }
    }
  }
}
</script>

<template>
  <div
    class="h-[80vh]"
    ref="chartContainer"
  ></div>
</template>

<style scoped></style>
