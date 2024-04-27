import { useState } from 'react'
import './App.css'
import mockConversations from '../src/assets/messages.json'
import { IConversation, Sender } from './models/conversation';
import UserDetailsModal from './components/userDetailsModal';
import NewConversationModal from './components/newConversationModal';
import { IUser } from './models/user';

const App = () => {
  const [conversations, setConversations] = useState<IConversation[]>(mockConversations);
  const [activeConversationIndex, setActiveConversationIndex] = useState<number>(0);
  const [conversationSelected, setConversationSelected] = useState<IConversation>(mockConversations[0]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [isModalOpen, setIsModalopen] = useState<boolean>(false)
  const [isModalNewChatOpen, setIsModalNewChatopen] = useState<boolean>(false)


   function onOpenNewConversationModal() {
    setIsModalNewChatopen(!isModalNewChatOpen)
   }

   function onStartConversation(user: IUser){
    setIsModalNewChatopen(!isModalNewChatOpen)
    const newChat = {
      id: user.id,
      name: user.name,
      picture: user?.picture,
      chatlog: []
    }
    const updatedConversations = conversations;
    updatedConversations.push(newChat)
    setConversations(updatedConversations)
    setActiveConversationIndex(conversations.length - 1);
    setConversationSelected(newChat)
  }

   const onChangeSelectedConversation = (index: number, userId: number) => {
    setActiveConversationIndex(index);
    setConversationSelected(conversations.filter((conversation => conversation.id === userId))[0])
  }

  function onOpenUserDetailsDialog(){
    setIsModalopen(!isModalOpen)
  }

  function onDeleteConversation(){
    conversations.splice(activeConversationIndex,1)
    const newIndex = activeConversationIndex - 1 < 0 ? 0 : activeConversationIndex - 1
    setActiveConversationIndex(newIndex);
    setConversationSelected(conversations[newIndex]);
  }

  function onSubmitNewMessage(event: any){
    event.preventDefault()
    const newMessage = {
      text: messageInput,
      timestamp: "10:15 AM",
      sender: Sender.SENDER,
      message_id: conversationSelected.chatlog.length
    };
    const activeChat = conversationSelected
    activeChat.chatlog.push(newMessage)
    setConversationSelected(activeChat)
    setMessageInput('')
    scrollChatToBottom("content")
  }

  function scrollChatToBottom(elementId: string): void{
    const element  = document.getElementById(elementId) as HTMLElement
    setTimeout(function() {
      if(element){
        element.scrollTop = element?.scrollHeight;
      }
    }, 50);
  }

  return <>
    <div className="page">
      <div className="chat">
        <div>
          <button onClick={onOpenNewConversationModal}>
          New chat
          </button>
        </div>
        {conversations.map((conversation,index) => (
        <div key={'chat-element-'+ index}  className={ 'chat-element ' + (index === activeConversationIndex ? 'active-conversation' : '') } onClick={() => onChangeSelectedConversation(index, conversation.id)}>
     <img src={conversation?.picture}/>
     <div className="contact">
       <div className="contact-name">{conversation.name}
       </div>
       <div className="contact-message">
        {conversation.chatlog[conversation.chatlog.length -1]?.sender === Sender.SENDER ? <span>You: </span> : <span></span>}
        {conversation.chatlog[conversation.chatlog.length -1]?.text}
       </div>
      </div>
     </div>
        ))}
        <div className="empty-chat">
        {conversations.length === 0 ? <p>You have no chat yet</p> : <span></span>}
      </div>
      </div>
      <div className="conversation">
        {conversationSelected ? 
      <div className="conversation-header">
      <img src={conversationSelected?.picture} onClick={onOpenUserDetailsDialog}/>
      <span>{conversationSelected?.name}</span>
      <button onClick={() =>onDeleteConversation()}>Delete</button>
      </div> : <div></div>  
      }
      {conversationSelected ? 
        <div id="content" className="conversation-content">
      {conversationSelected?.chatlog.map((message, index) => (
        <div key={'message-element-'+ index} className={'message-element ' + (message?.sender === Sender.RECEIVER ? 'message-received' : 'message-sent') }>
        <p className={'message-content ' + (message?.sender === Sender.RECEIVER ? 'message-content-received' : 'message-content-sent') }>{message.text}</p>
        <p className="message-timestamp">{message?.timestamp}</p>
       </div>
    ))}
        </div>
      : 
      <div className="empty-chat">
        <p> No chat selected</p>
      </div>
      }
      {conversationSelected ? 
        <div className="conversation-footer">
          <form onSubmit={(event) => onSubmitNewMessage(event)}>
          <input type="text" placeholder="Type your message" required value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}></input>
          <button type="submit">Submit</button>
          </form>
        </div>
      : <div></div>}
      
      </div>
      {isModalOpen ? <UserDetailsModal userId={conversationSelected.id} /> : null}
      {isModalNewChatOpen ? <NewConversationModal handleNewConversation={onStartConversation}/> : null}

    </div>
  </>
}

export default App 