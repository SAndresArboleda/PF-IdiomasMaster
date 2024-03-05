import './Chat.css';
import React, { useEffect, useState, useRef } from 'react';
import classnames from 'classnames';
import ScrollToBottom from 'react-scroll-to-bottom';

import { FaRocketchat } from "react-icons/fa";
import { RiMessage2Fill } from "react-icons/ri";


import { t } from 'i18next';


export const Chat = ({ socket, username, room }) => {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messagesList, setMessagesList] = useState([]);
    const messagesContainerRef = useRef(null);

    const sendMessage = async () => {
        if (username && currentMessage) {
            const info = {
                message: currentMessage,
                room: room,
                autor: username,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            await socket.emit("send_message", info);
            setMessagesList((list) => [...list, info]);
            setCurrentMessage("");
            // No es necesario llamar a scrollToBottom() aquí, ya que se llamará automáticamente después de actualizar messagesList
        }
    };

    const scrollToBottom = () => {
        messagesContainerRef.current?.scrollToBottom(); // Desplaza hacia abajo el contenedor de mensajes
    };

    useEffect(() => {
        const messageHandle = (data) => {
            setMessagesList((list) => [...list, data]);
            scrollToBottom(); // Desplaza hacia abajo cuando se recibe un mensaje
        };
        socket.on("receive_message", messageHandle);
        // Cuando se desmonta el componente, elimina el listener del socket
        return () => socket.off("receive_message", messageHandle);
    }, [socket]);

    // Llama a scrollToBottom() cuando se carga el componente
    useEffect(() => {
        scrollToBottom();
        const savedMessages = JSON.parse(localStorage.getItem('chatMessages'));
        if (savedMessages) {
            setMessagesList(savedMessages);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('chatMessages', JSON.stringify(messagesList));
    }, [messagesList]);

    return (

        <div className="w-full h-[90vh] flex items-center justify-center flex-col ">

            <div className="w-[97%] h-[95%] mt-[5px] bg-[#1e1f23] flex flex-row rounded-[5px] overflow-hidden">
            <div className='h-full w-[15%] bg-[#1e1f23] flex justify-center'>
                <div className='h-[40%] w-[90%] bg-[#2c2d31] mt-[26px] ml-[15px] rounded-[10px] '>
                <h1 className='mt-[20px] mx-[10px] text-[30px] flex flex-row items-center text-white border-b-[1px] border-gray-500'> Chat en vivo</h1>
                <h1 className='mt-[20px] mx-[10px] text-[17px] font-light flex flex-row items-center text-gray-300'> CANALES TEXTO</h1>
                <h1 className='mt-[0px] mx-[10px] text-[30px] flex flex-row items-center text-white '>  {room} <FaRocketchat className="mx-[20px] text-[40px] text-gray-400"/></h1>
                <h1 className='mt-[20px] mx-[10px] text-[17px] font-light flex flex-row items-center text-gray-300'>USUARIO</h1>
                <h1 className='mt-[0px] mx-[10px] text-[25px] font-light flex flex-row items-center text-white'> {username}</h1>
                </div>
            </div>
            <div className="w-[85%] h-full mt-[5px] bg-[#1e1f23] flex flex-col rounded-[5px] items-center justify-center overflow-hidden">
                <div className="w-[97%] h-[80%] mt-[5px] bg-[#3a3c41] flex flex-row rounded-[5px] overflow-hidden">
              
                    <ScrollToBottom className=" w-full h-full" messagesContainerRef={messagesContainerRef}>
                        <div className='bg-transparent'>
                            {messagesList.map((item, i) => (
                                <h3 key={i}>
                                    <div className={classnames({
                                        'message-container': true,
                                        'text-right': username === item.autor,
                                        'text-left': username !== item.autor
                                    }) }>
                                        <strong>{item.message}</strong>
                                        <p className='Autor'>{item.autor} <i>{item.time}</i></p>
                                    </div>
                                </h3>
                            ))}
                        </div>
                    </ScrollToBottom>
                
                </div>
                <div className="w-[97%] h-[15%] mt-[5px] bg-[#2c2d31] flex flex-row items-center justify-center rounded-[5px] overflow-hidden p-[20px]">
                <RiMessage2Fill className="text-white text-[55px] mr-[30px] mb-[10px]"/>
                <section className=" h-full w-[90%] ">
                    <input className="bg-white h-[50px] w-[80%] rounded-[10px] pl-[20px] text-[18px] font-ligth" value={currentMessage} type="text" placeholder='Escribe tu Mensaje'
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => {
                            e.key === 'Enter' && sendMessage();
                        }} />
                        <button className="ml-[15px] h-[50px] w-[120px] bg-sky-800 rounded-[10px] text-white" onClick={sendMessage}>Enviar &#9658; </button>

                </section>

                </div>

            </div>


            {/* <div className='mensajes'>
                <section>
                    <ScrollToBottom className="scroll-container" messagesContainerRef={messagesContainerRef}>
                        <div className='mensajesss'>
                            {messagesList.map((item, i) => (
                                <h3 key={i}>
                                    <div className={classnames({
                                        'message-container': true,
                                        'text-right': username === item.autor,
                                        'text-left': username !== item.autor
                                    })}>
                                        <strong>{item.message}</strong>
                                        <p className='Autor'>{item.autor} <i>{item.time}</i></p>
                                    </div>
                                </h3>
                            ))}
                        </div>
                    </ScrollToBottom>
                </section>
            </div>

            <div>
                <section className='newMessge'>
                    <input className='inputNewMessage' value={currentMessage} type="text" placeholder={t("MENSAJE")}
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyPress={(e) => {
                            e.key === 'Enter' && sendMessage();
                        }} />
                        <button className='botonEnviar' onClick={sendMessage}>{t("ENVIAR")} &#9658; </button>
                </section>
            </div> */}

            </div>
          
            
           
        </div>
    );
};



















// import './Chat.css'
// import io from 'socket.io-client'
// import axios from 'axios'
// import { useState } from 'react'
// import { useEffect } from 'react'

// //conexion para escuchar y enviar los eventos
// const socket = io('http://localhost:3000')
// const url = 'http://localhost:3000'


// export const Chat = () => {
//     const [nickname, setNickname] = useState('')
//     const [disabled, setDisabled] = useState(false)

//     const [message, setMessage] = useState('')
//     const [messages, setMessages] = useState([])

//     const [storedMessages, setStoredMessages] = useState([])
//     const [firstTime, setFirstTime] = useState(false)

//     useEffect(() => {
//         const receivedMessage = (message) => {
//             setMessages([message, ...messages])
//         }
//         socket.on('message', receivedMessage)
//         return () => {
//             socket.off('message', receivedMessage)
//         }
//     }, [])

//     if (!firstTime) {
//         axios.get('http://localhost:3000/getMessage').then(res => {
//             setStoredMessages(res.data.messages)
//         })
//         setFirstTime(true)    //que carge los mensajes guardados en nuestra BD la primera vez que renderizamos la aplicacion
//     }

//     const handlerSubmit = (e) => {
//         e.preventDefault()
//         console.log(message);
//         //Enviamos el mensaje al servidor
//         if (nickname !== '') {
//             socket.emit('message', message, nickname)

//             //Nuestro mensaje
//             const newMessage = {
//                 body: message,
//                 from: 'Yo'
//             }
//             //Añadimos el mensaje y el resto de mensajes enviados
//             setMessages([newMessage, ...messages])
//             setMessage('')

//             //peticion HTTP por POST para guardar el mensaje
//             axios.post('http://localhost:3000/createMessage', {
//                 message: message,
//                 from: nickname
//             })
//         } else {
//             alert('para enviar un mensaje debes establecer un nickname')
//         }
//     }

//     const nicknameSubmit = (e) => {
//         e.preventDefault()
//         setNickname(nickname)
//         setDisabled(true)
//     }

//     return (
//         <div className='contChat'>
//             <div className='continer mt-3'>
//                 <div className='card shadow border-0'>
//                     <div className='card-body'>
//                         <h5 className='text-center mb-3' >CHAT</h5>

//                         {/* nickname */}
//                         <form onSubmit={nicknameSubmit} >
//                             <div className='d-flex mb-3'>
//                                 <input type="text" className='form-control' placeholder='Nickname...' disabled={disabled} id='nickname' onChange={e => setNickname(e.target.value)} value={nickname} required />
//                                 <button className='btn btn-success mx-3' type='submit' id='btn-nickname' disabled={disabled} >Establecer</button>
//                             </div>
//                         </form>

//                         {/* chat form */}
//                         <form onSubmit={handlerSubmit} >
//                             <div className='d-flex'>
//                                 <input type="text" className='form-control' placeholder='Mensaje...' onChange={e => setMessage(e.target.value)} value={message} />
//                                 <button className='btn btn-success mx-3' type='submit' >Enviar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>

//                 {/* chat message*/}
//                 <div className='card mt-3 mb-3 shadow-order-0' id='constent chat' >
//                     <div className='card-body' >
//                         {messages?.map((message, index) => {
//                             <div key={index} className={`d-flex p-3 ${message.from === 'Yo' ? "justify-content-end" : "justify-content-start"}`}>
//                                 <div className={`card mb-3 shadow border-1 ${message.from === "Yo" ? "bg-success bg-opacity-25" : "bg-light"}`} >
//                                     <div className='card-body'>
//                                         <small className=''>{message.from}:{message.body}</small>
//                                     </div>
//                                 </div>
//                             </div>
//                         })}

//                         {/* chat stored message*/}
//                         <small className='text-center text-muted' >... Mensajes guardados ...</small>
//                         {storedMessages?.map((message, index) => {
//                             <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}>
//                                 <div className={`card mb-3 shadow border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-light"}`} >
//                                     <div className='card-body'>
//                                         <small className='text-muted'>{message.from}:{message.message}</small>
//                                     </div>
//                                 </div>
//                             </div>
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }






// import './Chat.css'
// import io from 'socket.io-client'
// import axios from 'axios'
// import { useState, useEffect } from 'react'

// const socket = io('http://localhost:3000')

// export const Chat = () => {
//     const [nickname, setNickname] = useState('')
//     const [disabled, setDisabled] = useState(false)
//     const [message, setMessage] = useState('')
//     const [messages, setMessages] = useState([])
//     const [storedMessages, setStoredMessages] = useState([])

//     useEffect(() => {
//         const receivedMessage = (message) => {
//             setMessages(prevMessages => [message, ...prevMessages])
//         }
//         socket.on('message', receivedMessage)
//         return () => {
//             socket.off('message', receivedMessage)
//         }
//     }, [])

//     useEffect(() => {
//         if (!nickname) return
//         axios.get('http://localhost:3000/getMessage').then(res => {
//             setStoredMessages(res.data.messages)
//         })
//     }, [nickname])

//     const handlerSubmit = (e) => {
//         e.preventDefault()
//         if (!nickname) {
//             alert('Para enviar un mensaje debes establecer un nickname')
//             return
//         }
//         socket.emit('message', message, nickname)
//         const newMessage = { body: message, from: 'Yo' }
//         setMessages(prevMessages => [newMessage, ...prevMessages])
//         setMessage('')
//         axios.post('http://localhost:3000/createMessage', {
//             message: message,
//             from: nickname
//         })
//     }

//     const handleNicknameSubmit = (e) => {
//         e.preventDefault()
//         if (!nickname) return
//         setDisabled(true)
//     }

//     return (
//         <div className='contChat'>
//             <div className='container mt-3'>
//                 <div className='card shadow border-0'>
//                     <div className='card-body'>
//                         <h5 className='text-center mb-3'>CHAT</h5>
//                         <form onSubmit={handleNicknameSubmit}>
//                             <div className='d-flex mb-3'>
//                                 <input type="text" className='form-control' placeholder='Nickname...' disabled={disabled} onChange={e => setNickname(e.target.value)} value={nickname} required />
//                                 <button className='btn btn-success mx-3' type='submit' disabled={disabled}>Establecer</button>
//                             </div>
//                         </form>
//                         <form onSubmit={handlerSubmit}>
//                             <div className='d-flex'>
//                                 <input type="text" className='form-control' placeholder='Mensaje...' onChange={e => setMessage(e.target.value)} value={message} />
//                                 <button className='btn btn-success mx-3' type='submit'>Enviar</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//                 <div className='card mt-3 mb-3 shadow-order-0' id='content chat'>
//                     <div className='card-body'>
//                         {messages.map((message, index) => (
//                             <div key={index} className={`d-flex p-3 ${message.from === 'Yo' ? "justify-content-end" : "justify-content-start"}`}>
//                                 <div className={`card mb-3 shadow border-1 ${message.from === "Yo" ? "bg-success bg-opacity-25" : "bg-light"}`}>
//                                     <div className='card-body'>
//                                         <small className=''>{message.from}:{message.body}</small>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                         <small className='text-center text-muted'>... Mensajes guardados ...</small>
//                         {storedMessages.map((message, index) => (
//                             <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}>
//                                 <div className={`card mb-3 shadow border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-light"}`}>
//                                     <div className='card-body'>
//                                         <small className='text-muted'>{message.from}:{message.message}</small>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

