'use client';

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: 'rgb(51 65 85',
                    color: '#fff'
                }
            }}
        />
    );
}

export default ToasterContext;