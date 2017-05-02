/**
 * Created by chris on 2017/5/1.
 */
vm = new Vue({
    el:'#app',
    data:{
        circle:"O",
        cross:"X",
        human:"",
        robots:"",
        items:[],
        isHumanStep:true
    },
    methods:{
        step:function (e) {
            if(this.isHumanStep){

            }
            this.items[e.itemIndex].checked = true;
        },
        checkWin:function () {

        }
    },
    created:function(){
        for(var i=0;i<9;i++){
            this.items.push(
                {
                    itemIndex:i,
                    checked:false,
                    piece:'O'
                }
            );
        }
    }
});