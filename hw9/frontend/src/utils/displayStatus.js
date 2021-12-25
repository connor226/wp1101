import { message } from 'antd';

const displayStatus = (payload) => {
  if(payload.msg){
    const {type, msg} = payload;
    const content = {content: msg, duration: 0.5};
    switch(type){
      case 'success':{
        message.success(content);
        break;
      }
      case 'info':{
        message.info(content);
        break;
      }
      case 'error':{
        message.error(content);
        break;
      }
      default: break;
    }
  }
}

export default displayStatus;