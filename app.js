/**
 * Created by chris on 2017/5/1.
 */
vm = new Vue({
    el:'#app',
    data:{
        human:"",
        robots:"",
        items:[],
        isHumanStep:true,
        selectDialog:true,
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
            this.robots = (e == "O")?"X":"O";
            this.selectDialog = false;
        },
        step:function (e) {
            if(this.isHumanStep){
                this.items[e.itemIndex].piece = this.human;
                this.isHumanStep = false;
                this.items[e.itemIndex].checked = true;
                this.checkWin();
                this.step();
            }
            else{

                let humanResult = this.humanIndexList();
                let robotResult = this.robotsIndexList();
                humanResult = this.matchNumber(humanResult);
                robotResult = this.matchNumber(robotResult);
                if((this.matchNumber(humanResult)[0] == 2)&&(this.items[humanResult[1]].checked == false)){
                    this.items[humanResult[1]].piece = this.robots;
                    this.items[humanResult[1]].checked = true;
                }
                else if((this.matchNumber(robotResult)[0] == 2)&&(this.items[robotResult[1]].checked == false)){
                    this.items[robotResult[1]].piece = this.robots;
                    this.items[robotResult[1]].checked = true;
                }
                else{
                    var i = this.randomItemNumber();
                    this.items[i].piece = this.robots;
                    this.items[i].checked = true;
                    this.steps++;
                }
                this.checkWin();
                this.isHumanStep = true;
            }
        },
        //检查是否已取胜
        checkWin:function () {
            let vm = this;
            let humanResult = this.humanIndexList();
            let robotResult = this.robotsIndexList();
            humanResult = this.matchNumber(humanResult);
            robotResult = this.matchNumber(robotResult);
            //如果任意一方符合取胜结果数组中的数量为3个，则判断为已取胜
            if(humanResult[0] == 3){
                alert("human win");
            }
            if(robotResult[0] == 3){
                alert("robots win");
            }
        },
        positionLeft:function () {
            let self = this;
            return self.items.filter(function (e) {
                return e.checked == false;
            })
        },
        randomItemNumber:function () {
            let itemNumber = this.positionLeft().length;
            return this.positionLeft()[Math.floor(Math.random()*itemNumber)].itemIndex;
        },
        humanIndexList:function () {
            let vm = this;
            let arr = [];
            vm.items.forEach(function(item){
                if(item.piece == vm.human){
                    arr.push(item.itemIndex);
                }
            });
            return arr;
        },
        robotsIndexList:function () {
            let vm = this;
            let arr = [];
            vm.items.forEach(function(item){
                if(item.piece == vm.robots){
                    arr.push(item.itemIndex);
                }
            });
            return arr;
        },
        matchNumber:function (arr) {
            for(var i=0;i<this.results.length;i++) {
                if ((arr.indexOf(this.results[i][0]) > -1) && (arr.indexOf(this.results[i][1]) > -1) && (arr.indexOf(this.results[i][2]) > -1)) {
                    return [3, null];
                }
            }
            for(var i=0;i<this.results.length;i++) {
                    if((arr.indexOf(this.results[i][0])>-1)&&(arr.indexOf(this.results[i][1])>-1)){
                        return [2,this.results[i][2]];
                    }
                    else if((arr.indexOf(this.results[i][1])>-1)&&(arr.indexOf(this.results[i][2])>-1)){
                        return [2,this.results[i][0]];
                    }
                    else if((arr.indexOf(this.results[i][0])>-1)&&(arr.indexOf(this.results[i][2])>-1)){
                        return [2,this.results[i][1]];
                    }
            }
            return [1,null];
        }
    },
    created:function(){
        for(var i=0;i<9;i++){
            this.items.push(
                {
                    itemIndex:i,
                    checked:false,
                    piece:' '
                }
            );
        }
    }
});