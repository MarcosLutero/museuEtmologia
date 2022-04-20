import React from "react";
import Toast from './Toast';

class Toasts extends React.Component {
    render(){
        
        const toasts = this.props.toasts.map ( (toast, key) => {
            return <Toast {...toast} key={key}  delToast={() => this.props.delToast(key)}/>
        });

       return (
            <div
                aria-live="polite"
                aria-atomic="true"
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    zIndex: 10000
                }}
            >
                {toasts}
            </div>
       );
    }
}

export default Toasts;