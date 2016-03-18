'use strict';

$(function () {

  var myChart = echarts.init($("#echarView").get(0));
  var option = {
    title: {
      text: 'Echarts 表格'
    },
    tooltip: {},
    legend: {
      data: ['销量']
    },
    xAxis: {
      data: ['苹果', '橘子', '香蕉', '梨子', '橙子', '西瓜', '猕猴桃']
    },
    yAxis: {},
    series: [{
      name: '进口',
      type: 'bar',
      data: [1, 20, 15, 70, 45, 40, 10]
    }, {
      name: '销量',
      type: 'bar',
      data: [5, 10, 25, 30, 35, 20, 20]
    }]
  };

  var Table = {

    /**
     * 更新数据
     * @param {Object} _data     原始数据
     * @param {[type]} _tdIndex  [description]
     * @param {[type]} _valIndex [description]
     * @param {[type]} _val      需要更新的数据
     */

    _set: function _set(_data, _tdIndex, _valIndex, _val) {
      var series = _data.series;

      series.map(function (_item, _index) {
        if (_tdIndex === _index) {
          var data = _item.data;

          data[_valIndex] = _val;
          return false;
        }
      });

      // 重新渲染图表
      myChart.setOption(_data);
    },


    /**
     * 给表单绑定值变化事件
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    _modify: function _modify(_data) {
      var self = this;
      $('#control').delegate('input', 'input', function () {
        var $this = $(this);
        var value = $this.val() - 0;
        var tdIndex = $this.closest('td').data('index');
        var valIndex = $this.data('index');
        self._set(_data, tdIndex, valIndex, value);
      });
    },


    /**
     * 表格模板
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    _tpl: function _tpl(_data) {
      var tpl = '';
      var axisTpl = '';
      var seriesTpl = '';
      _data.xAxis.data.map(function (_item, _index) {
        axisTpl += '<td>' + _item + '</td>';
      });
      _data.series.map(function (_item, _index) {
        seriesTpl += '<tr>';
        _item.data.map(function (_secItem, _secIndex) {
          seriesTpl += '<td data-index="' + _index + '"><input type="text" data-index="' + _secIndex + '" value="' + _secItem + '" /></td>';
        });
        seriesTpl += '</tr>';
      });
      tpl = '<tr>\n              ' + axisTpl + '\n             </tr>\n             ' + seriesTpl;
      $('#control').html(tpl);
    },
    init: function init(_data) {

      this._tpl(_data);
      this._modify(_data);
    }
  };
  Table.init(option);
  myChart.setOption(option);
});