$( () => {

  let myChart = echarts.init($("#echarView").get(0));
  let option = {
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
    },{
      name: '销量',
      type: 'bar',
      data: [5, 10, 25, 30, 35, 20, 20]
    }]
  };

  let Table = {

    /**
     * 更新数据
     * @param {Object} _data     原始数据
     * @param {[type]} _tdIndex  [description]
     * @param {[type]} _valIndex [description]
     * @param {[type]} _val      需要更新的数据
     */
    _set(_data,_tdIndex, _valIndex, _val){
      let {series} = _data
      series.map( (_item, _index) =>{
        if(_tdIndex === _index){
          let {data} = _item
          data[_valIndex] = _val
          return false
        }
      })

      // 重新渲染图表
      myChart.setOption(_data);
    },

    /**
     * 给表单绑定值变化事件
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    _modify(_data){
      let self = this
      $('#control').delegate('input', 'input', function(){
        let $this = $(this)
        let value = $this.val() - 0
        let tdIndex = $this.closest('td').data('index')
        let valIndex = $this.data('index')
        self._set(_data,tdIndex,valIndex,value)
      })
    },

    /**
     * 表格模板
     * @param  {[type]} _data [description]
     * @return {[type]}       [description]
     */
    _tpl(_data){
      let tpl = ``
      let axisTpl = ``
      let seriesTpl = ``
      _data.xAxis.data.map( (_item, _index) => {
        axisTpl += `<td>${_item}</td>`
      })
      _data.series.map( (_item, _index) => {
        seriesTpl += `<tr>`
        _item.data.map( (_secItem, _secIndex) => {
          seriesTpl += `<td data-index="${_index}"><input type="text" data-index="${_secIndex}" value="${_secItem}" /></td>`
        })
        seriesTpl += `</tr>`
      })
      tpl = `<tr>
              ${axisTpl}
             </tr>
             ${seriesTpl}`
      $('#control').html(tpl)
    },

    init(_data){

      this._tpl(_data)
      this._modify(_data)
    }
  }
  Table.init(option)
  myChart.setOption(option);
})