import React from 'react'
import Piano from '../Piano/Piano'
import './PianoController.css'
import {song} from '../../assets/javascript/song.js'
// import {keyMap} from '../../assets/javascript/keyMap.js'


class PianoCmp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            isEdit:false,
            Piano:[
                {keyBind:'A',musicBind:'Do'},
                {keyBind:'W',musicBind:'Do3',type:'black'},
                {keyBind:'S',musicBind:'Re'},
                {keyBind:'E',musicBind:'Re3',type:'black'},
                {keyBind:'D',musicBind:'Mi'},
                {keyBind:'F',musicBind:'Fa'},
                {keyBind:'T',musicBind:'Mi3',type:'black'},
                {keyBind:'G',musicBind:'So'},
                {keyBind:'Y',musicBind:'Fa3',type:'black'},
                {keyBind:'H',musicBind:'La'},
                {keyBind:'U',musicBind:'So3',type:'black'},
                {keyBind:'J',musicBind:'Xi'},
                {keyBind:'K',musicBind:'Do2'}
            ]
        };
        console.log(song);
    }

    /**
     * 编辑状态
     */
    editStateChangeHandler = (e)=>{
        if(this.state.isEdit){
            ////如果是从编辑到非编辑状态
            //移除editing标记
            let assPinaos = [];
            for(let piano of this.state.Piano){
                let assPiano = Object.assign(piano);
                assPiano.editing = false;
                assPinaos.push(assPiano);
            }

            this.setState((state)=>{
                return {
                    isEdit:!state.isEdit,
                    Piano:assPinaos
                }
            });
        }else{
            this.setState((state)=>{
                return {
                    isEdit:!state.isEdit
                }
            });
        }
    }


    /**
     * 键盘事件
     */
    onKeyDownEventHandler = function(e,that){
        if(that.props.editing){
            //编辑中的话判断
            let keyPress = e.key;
            let musicBind = that.props.musicBind;
            let asspianos = [];
            this.state.Piano.forEach(function(val,index){
                let asspiano = Object.assign(val);
                //先判断原始值是否存在，存在清空
                if(asspiano.keyBind.toLowerCase() === keyPress.toLowerCase()){
                    asspiano.keyBind = '';
                }
                //清空原始值之后，更新新绑定的按键值，如果存在
                if(asspiano.musicBind.toLowerCase() === musicBind.toLowerCase()){
                    asspiano.keyBind = e.key.toUpperCase();
                }
                asspianos.push(asspiano);
            });
            this.setState({
                piano:asspianos
            });
        }
    }.bind(this);

    /**
     * 点击鼠标事件
     */
    onClickEventHandler = (musicbind,editing)=>{
        if(this.state.isEdit){
            //1.如果当前按键处于编辑状态，取消编辑状态
            if(editing){
                this.setState((state)=>{
                    let assPinaos = [];
                    for(var piano of state.Piano){
                        let assPiano = Object.assign(piano);
                        if(assPiano.musicBind === musicbind){
                            assPiano.editing = false;
                        }
                        assPinaos.push(assPiano);
                    }

                    return {
                        Piano:assPinaos
                    }
                })
            }else{
                //2.如果当前按键不处于编辑状态，移除其他案件的编辑状态，将该按键状态更新为编辑中
                this.setState((state)=>{
                    let assPinaos = [];
                    for(var piano of state.Piano){
                        let assPiano = Object.assign(piano);
                        if(assPiano.musicBind === musicbind){
                            assPiano.editing = true;
                        }else{
                            assPiano.editing = false;
                        }
                        assPinaos.push(assPiano);
                    }

                    return {
                        Piano:assPinaos
                    }
                })
            }
           
        }
    }


    /**
     * 模拟键盘事件
     * @param el html元素
     * @param evtType 事件类型
     * @param keyCode 键值
     */
    fireKeyEvent = (el, evtType, keyCode,key)=>{  
        var doc = el.ownerDocument?el.ownerDocument:el,  
            win = doc.defaultView || doc.parentWindow,  
            evtObj;  
        if(doc.createEvent){  
            if(win.KeyEvent) {  
                evtObj = doc.createEvent('KeyEvents');  
                evtObj.initKeyEvent( evtType, true, true, win, false, false, false, false, keyCode, key );  
            }  
            else {  
                evtObj = doc.createEvent('UIEvents');  
                Object.defineProperty(evtObj, 'keyCode', {  
                    get : function() { return this.keyCodeVal; }  
                });       
                Object.defineProperty(evtObj, 'which', {  
                    get : function() { return this.keyCodeVal; }  
                });  
        
                evtObj.initUIEvent( evtType, true, true, win, 1 );  
                evtObj.keyCodeVal = keyCode;  
                evtObj.key = key;
                if (evtObj.keyCode !== keyCode) {  
                    console.log("keyCode " + evtObj.keyCode + " 和 (" + evtObj.which + ") 不匹配");  
                }  
            }  
            el.dispatchEvent(evtObj);  
        }else if(doc.createEventObject){  
            evtObj = doc.createEventObject();  
            evtObj.keyCode = keyCode;  
            el.fireEvent('on' + evtType, evtObj);  
        }  
    }  

    /**
     * 自动播放
     */
    // autoPlay = (e)=>{
    //     console.log('autoplay function');
    //     const timeOut = 1000;
    //     //计时
    //     for(let index in song){
    //         console.log(index,song[index]);
    //         setTimeout(function(){
    //             this.fireKeyEvent(document,'keydown','','a');
    //             this.fireKeyEvent(document,'keyup','','a');
    //         },timeOut).bind(this);
    //     }
        
        
    // }

    render() {
        return (
            <div>
                <div className='ctl'>
                    <button className='ctl__btn' onClick={this.editStateChangeHandler}>
                        {this.state.isEdit?'Back':'Edit'}
                    </button>

                    {/* <button className='ctl__btn' onClick = {this.autoPlay}>
                        auto play
                    </button> */}

                </div>
                <Piano 
                        isEdit={this.state.isEdit}
                        Piano={this.state.Piano}
                        onClickEventHandler={this.onClickEventHandler}
                        onKeyDownEventHandler={this.onKeyDownEventHandler}>
                </Piano>
            </div>
        );
    }
}

export default PianoCmp;