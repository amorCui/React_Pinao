import React from 'react';

import './Piano.css';
// import './Piano.less';
import PianoKey from '../PianoKey/PianoKey.js';
// import '../../../node_modules/less/dist/less.js';


class Piano extends React.Component {
    // constructor(props) {
    //     super(props);

    //     // this.state = {
    //     //     Piano:[
    //     //         {keyBind:'A',musicBind:'Do'},
    //     //         {keyBind:'W',musicBind:'Do3',type:'black'},
    //     //         {keyBind:'S',musicBind:'Re'},
    //     //         {keyBind:'E',musicBind:'Re3',type:'black'},
    //     //         {keyBind:'D',musicBind:'Mi'},
    //     //         {keyBind:'F',musicBind:'Fa'},
    //     //         {keyBind:'T',musicBind:'Mi3',type:'black'},
    //     //         {keyBind:'G',musicBind:'So'},
    //     //         {keyBind:'Y',musicBind:'Fa3',type:'black'},
    //     //         {keyBind:'H',musicBind:'La'},
    //     //         {keyBind:'U',musicBind:'So3',type:'black'},
    //     //         {keyBind:'J',musicBind:'Xi'},
    //     //         {keyBind:'K',musicBind:'Do2'}
    //     //     ]
    //     // }

    //     //如果传递了Keys
    // }

   
    
    // onKeyDownEventHandler = (e)=>{
    //     // console.log(this);
    //     if(this.editing){
    //         //编辑中的话判断
    //         console.log(e.key);
    //         console.log(this.musicBind);
    //     }
    // }
    
/**
     * 键盘按下时触发的事件
     */
    onKeyDownEventHandler = (e,that)=>{
        console.log('Piano组件的键盘按下事件');
        this.props.onKeyDownEventHandler(e,that);
    }

     /**
     * 鼠标点击时触发的事件
     */
    onClickEventHandler = (musicbind,editing) =>{
        console.log('Piano组件的鼠标点击事件');
        this.props.onClickEventHandler(musicbind,editing);
    }


    render() {
        let PianoRender;
        PianoRender = (
           this.props.Piano.map((keyObj,key)=>(
                <PianoKey 
                    onClickEventHandler={this.onClickEventHandler} 
                    onKeyDownEventHandler={this.onKeyDownEventHandler} 
                    isEdit={this.props.isEdit} key={key} {...keyObj}>
                </PianoKey>
           ))
        );

        return (
            <div className='piano'>
                {PianoRender}
            </div>
        );
    }
}

Piano.defaultProps ={
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
}

export default Piano;