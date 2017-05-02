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
        isHumanStep:true,
        selected:true,
        steps:0,
        results:[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
    },
    methods:{
        choose:function (e) {
          this.human = e;
          if(e == "O") {
              this.robots = "X";
          }
          else{
              this.robots = "O";
          }
          this.selected = false;
        },
        step:function (e) {
            if(this.isHumanStep){
                this.items[e.itemIndex].piece = this.human;
                this.isHumanStep = false;
                this.items[e.itemIndex].checked = true;
                this.step();
            }
            else{
                if(this.steps === 0){
                    var i = this.randomItemNumber();
                    this.items[i].piece = this.robots;
                    this.items[i].checked = true;
                }
                this.isHumanStep = true;
            }

        },
        checkWin:function () {
            let self = this;
            let humanResult = [];
            let robotResult = [];

            this.items.reduce(function(acc,cur,index,arr){
                if(item.piece == self.human){
                    humanResult.push(item.itemIndex);
                }
                else{
                    robotResult.push(item.itemIndex);
                }
            });
        },
        defence:function () {

        },
        positionLeft:function () {
            var self = this;
            return self.items.filter(function (e) {
                return e.checked == false;
            })
        },
        randomItemNumber:function () {
            var itemNumber = this.positionLeft().length;
            return this.positionLeft()[Math.floor(Math.random()*itemNumber)].itemIndex;
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