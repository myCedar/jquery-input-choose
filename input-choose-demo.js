(function($) {
    function Input (dom) {
        this.dom = dom
        this.width = dom.outerWidth()
        this.height = dom.outerHeight()
        this.fontSize = dom.css('font-size')
        this.border = dom.css('border')
        let list = []
        dom.find('option').each(function (index,item) {
            list.push({
                value:$(item).attr('value') || '',
                name:$(item).html() || ''
            })
        })
        this.dataList = list
    }
    Input.prototype = {
        init:function(){
            // console.log(this.width,this.height,this.fontSize,this.border,this.dataList)
            this.dom.hide()
            let divDom = $(this.myDiv())
            this.bindEvent(divDom)
            this.dom.after(divDom)
            return this
        },
        myDiv:function(){
            var str = '<div class="input-choose" style="width: '+this.width+'px;line-height: '+this.height+'px;height: '+this.height+'px;border: '+this.border+';font-size: '+this.fontSize+'">'
            str += '<input type="text" class="input-choose-input">'
            str += '<ul class="input-choose-ul" style="top:'+this.height+'px;border: '+this.border+'">'
            for(var i = 0;i<this.dataList.length;i++){
                str += '<li data-val="'+this.dataList[i].value+'" class="input-choose-li">'+this.dataList[i].name+'</li>'
            }
            str += '</ul></div>'
            return str
        },
        bindEvent:function(divDom){
            var that =this
            var domInput = divDom.find('.input-choose-input')
            var domUl = divDom.find('.input-choose-ul')
            var domli = divDom.find('.input-choose-li')
            domInput.focus(function () {
                domUl.show()
            })
            domInput.blur(function () {
                setTimeout(function(){
                    domUl.hide()
                },100)
            })
            domInput.on('input propertychange',function (e) {
                that.dom.data('val',$(this).val())
                // console.log(that.dom.val())
                var value = $(e.target).val()
                domli.each(function (index,item) {
                    if(value == ''){
                        $(item).show()
                    }else{
                        if($(item).html().indexOf(value) != '-1'){
                            $(item).show()
                        }else{
                            $(item).hide()
                        }
                    }
                })
            })
            domli.click(function () {
                // console.log($(this))
                that.dom.data('val',$(this).data('val'))
                domInput.val($(this).html())
                domUl.hide()
            })
        },
        getData:function(){
            return this.dom.data('val') || ''
        }
    }
    $.fn.inputChoose = function() {
        if(this[0].tagName == 'SELECT'){
             return new Input(this).init()
        }else{
            console.log('只有select元素才可以使用这个插件')
        }
    };
})(jQuery);