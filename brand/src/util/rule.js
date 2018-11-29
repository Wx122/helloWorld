/**
 * 本对象初始化生成option对象 用于存储每一题单选项的次数
 * @setOption: 调用该方法传入 op 参数为选项的 字符串 如: "A" "B" ...
 * @getResult: 调用该方法 传入 result 答案排列的数组数据 对应返回测试完成最后的结果
 * @description: 调用静态方法 initRule 挂载到vue原型对象上 然后即可全局调用
 */

class Rule{
    constructor() {
        this.option = {A: 0, B: 0, C: 0, D: 0};
    }

    setOption(op){
        ++ this.option[op];
    }

    getResult(result){
        const num = this.option;

        //单项结果
        if(num.A > num.B && num.A > num.C && num.A > num.D){
            return this.getRandom(result.A);
        }
        if(num.B > num.A && num.B > num.C && num.B > num.D){
            return this.getRandom(result.B);
        }
        if(num.C > num.A && num.C > num.B && num.C > num.D){
            return this.getRandom(result.C);
        }
        if(num.D > num.A && num.D > num.B && num.D > num.C){
            return this.getRandom(result.D);
        }

        //两项结果
        if(num.A !== 0 && num.A > num.C && num.A > num.D && num.A === num.B){
            return this.getRandom(result.AB);
        }
        if(num.B !== 0 && num.B > num.A && num.B > num.D && num.B === num.C){
            return this.getRandom(result.BC);
        }
        if(num.C !== 0 && num.C > num.A && num.C > num.B && num.C === num.D){
            return this.getRandom(result.CD);
        }
        if(num.A !== 0 && num.A > num.B && num.A > num.D && num.A === num.C){
          return this.getRandom(result.AC);
        }
        if(num.A !== 0 && num.A > num.B && num.A > num.C && num.A === num.D){
            return this.getRandom(result.AD);
        }
        if(num.B !== 0 && num.B > num.A && num.B > num.C && num.B === num.D){
            return this.getRandom(result.BD);
        }

        //三项结果
        if(num.A !== 0 && num.A === num.B && num.A === num.C){
            return this.getRandom(result.ABC);
        }
        if(num.B !== 0 && num.B === num.C && num.B === num.D){
            return this.getRandom(result.BCD);
        }
        if(num.A !== 0 && num.A === num.B && num.A === num.D){
            return this.getRandom(result.ABD);
        }
        if(num.A !== 0 && num.A === num.C && num.A === num.D){
            return this.getRandom(result.ACD);
        }
    }

    getRandom(data){
        let ran = parseInt(Math.random()*((data.length - 1) - 0 + 1 )+0,10);
        return data[ran];
    }

    static initRule(){
        if(!this.instance){
            this.instance = new Rule();
        }
        return this.instance;
    }
}

export default Rule
