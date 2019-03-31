import React from 'react'
// import PropTypes from 'prop-types';

import Do from '../../assets/videos/do.ogv';
import Re from '../../assets/videos/re.ogv';
import Mi from '../../assets/videos/mi.ogv';
import Fa from '../../assets/videos/fa.ogv';
import So from '../../assets/videos/so.ogv';
import La from '../../assets/videos/la.ogv';
import Xi from '../../assets/videos/xi.ogv';
import Do2 from '../../assets/videos/do2.ogv';
import Do3 from '../../assets/videos/do3.ogv';
import Re3 from '../../assets/videos/re3.ogv';
import Mi3 from '../../assets/videos/mi3.ogv';
import Fa3 from '../../assets/videos/fa3.ogv';
import So3 from '../../assets/videos/so3.ogv';
import './PianoKey.css';

const audios={
    'Do':Do,
    'Re':Re,
    'Mi':Mi,
    'Fa':Fa,
    'So':So,
    'La':La,
    'Xi':Xi,
    'Do2':Do2,
    'Do3':Do3,
    'Re3':Re3,
    'Mi3':Mi3,
    'Fa3':Fa3,
    'So3':So3

};

const keyType = {
    white:'whitekey',
    black:'blackkey'
};

class PianoKey extends React.Component {
    constructor(props) {
        super(props);
        //点击过的这个key的map
        this.state = {
            // keyType:{
            //     white:'whiteKey',
            //     black:'blackKey'
            // },          //
            audioMap:[],   //按下的audio的dom节点数组{index,url}
            count:0,        //计数
            press:false    //按下状态
        };

    } 

    /**
     * 播放音频事件
     */
    audioPlay = (e) => {
        //如果是鼠标点击事件
        if(e.type === 'mousedown'){
            // let currentAudio = this.audioCreate();
            this.audioCreate();
            // currentAudio.play();

        }
        //如果是键盘事件
        if(e.type === 'keydown'){
            if (e.key.toLowerCase() === this.props.keyBind.toLowerCase()) {
                this.audioCreate();
            }
        }
    }

    /**
     * 动态创建audio元素并添加到指定的dom节点中
     */
    audioCreate = ()=>{
        
        this.setState((state)=>{
            state.audioMap.push({
                index:++state.count,
                url:audios[this.props.musicBind]
            });

            // var arr=state.audioMap.concat([audios[this.props.musicBind]])
            return {
                // audioMap:arr
                audioMap:Object.assign(state.audioMap),
                count:state.count
            }
        });

    }

    /**
     * 播放完成之后移除audio
     */
    audioRemove =(audioKey) =>{
        return function(audioKey){
           
            this.setState((state) =>{
                // var arr;
                // if(this.state.audioMap.length > 0){
                //     arr = this.state.audioMap.slice(0,this.state.audioMap.length - 1);
                // }
                state.audioMap.shift();
                return {
                    // audioMap:arr
                    audioMap:state.audioMap
                }
            });
        }.bind(this);
    }

    /**
     * 键盘按下时触发的事件
     */
    onKeyDownEventHandler = (e)=>{
        if(!this.props.isEdit){
            //非编辑状态
            if(e.key.toLowerCase() === this.props.keyBind.toLowerCase()){
                this.setState({
                    press:true
                });
            }
            
            this.audioPlay(e);
        }else{
            //编辑状态
            // console.log('键盘事件编辑状态')
            // console.log(this.props.musicBind);
            this.props.onKeyDownEventHandler(e,this);
        }
        
    }

    onKeyUpEventHandler = (e)=>{
        if(!this.props.isEdit){
            //非编辑状态
            if(e.key.toLowerCase() === this.props.keyBind.toLowerCase()){
                this.setState({
                    press:false
                });
            }
        }
    }

    /**
     * 鼠标点击时触发的事件
     */
    onClickEventHandler = (e) =>{
        if(!this.props.isEdit){
            //非编辑状态
            this.setState({
                press:true
            });
            this.audioPlay(e);
        }else{
            this.props.onClickEventHandler(this.props.musicBind,this.props.editing);
            //编辑状态
            console.log('鼠标点击编辑状态');
            console.log(this.props.musicBind);
        }
    }

    onMouseUpEventHandler = (e)=>{
        //非编辑状态鼠标抬起时移除点击样式
        console.log(e.type);
        this.setState({
            press:false
        });
    }

    /**
     * 组件挂载时触发的事件
     */
    componentDidMount() {
        
        document.addEventListener('keydown', this.onKeyDownEventHandler);
        document.addEventListener('keyup',this.onKeyUpEventHandler);
    }

    /**
     * 组件卸载时触发的事件
     */
    componentWillUnmount()
    {
        document.removeEventListener('keydown', this.onKeyDownEventHandler);
        document.removeEventListener('keydown', this.onKeyUpEventHandler);
    }

    render() {
        let KeyRender;

        KeyRender = (
            <div ref='pianokey__content' 
                className= {'pianokey__content ' + (this.props.editing?'pianokey__content_editing':'') + (this.state.press?'pianokey__content_press':'')} 
                onMouseDown ={this.onClickEventHandler}
                onMouseUp = {this.onMouseUpEventHandler}>
                <div className='pianokeybind'>{this.props.keyBind}</div>
                {   
                    <div className='pianokey__mask'>
                        <div className='pianokey__mask__content'>点击任意键已编辑</div>
                    </div>
                }
                {
                    this.state.audioMap.map(
                        (val,key) =>
                        <audio data-index={'audio'+ val.index} autoPlay key={'audio'+ val.index} src={val.url} onEnded={this.audioRemove(key)}></audio>
                    )
                }
            </div>   
        );

    
        
        return (
            <div className={'pianokey pianokey_' + keyType[this.props.type] + ' ' + this.props.customStyleName} >

                {KeyRender}

            </div>
        );
    }
}

PianoKey.defaultProps = {
    type:'white',
    keyBind: 'A',
    musicBind: 'A6',
    customStyleName:'',
    isEdit:false, // 是否处于可编辑状态
    editing:false // 正在编辑该按键
}

// PianoKey.prototype = {
//     changeKeyEventHandler:PropTypes.func
// }

export default PianoKey;